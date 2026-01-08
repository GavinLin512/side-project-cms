import * as fs from "node:fs";
import * as readline from "node:readline";
import { createId } from "@paralleldrive/cuid2";
import { PrismaPg } from "@prisma/adapter-pg";
import { Gender, PrismaClient, Season } from "@prisma/client";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  console.error(
    "❌ 錯誤：找不到 DATABASE_URL 環境變數。請確認 .env.local 檔案存在且已正確載入。",
  );
  process.exit(1);
}

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const FILE_PATH = "/Users/linjiamin/Downloads/archive(2)/styles.csv";
const ERROR_LOG_PATH = "./import-errors.log";

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuote = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuote = !inQuote;
    } else if (char === "," && !inQuote) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

const genderMap: Record<string, Gender> = {
  Men: Gender.Men,
  Women: Gender.Women,
  Boys: Gender.Boys,
  Girls: Gender.Girls,
  Unisex: Gender.Unisex,
};

const seasonMap: Record<string, Season> = {
  Summer: Season.Summer,
  Fall: Season.Fall,
  Winter: Season.Winter,
  Spring: Season.Spring,
};

interface CsvRow {
  id: string;
  gender: string;
  masterCat: string;
  subCat: string;
  articleType: string;
  baseColour: string;
  season: string;
  year: string;
  usage: string;
  productName: string;
}

interface VariantData {
  variantKey: string;
  gender: string;
  season: string;
  year: string;
  usage: string;
  baseColour: string;
  imageIds: string[];
}

interface ProductData {
  productName: string;
  masterCat: string;
  subCat: string;
  articleType: string;
  variants: Map<string, VariantData>;
  firstRow: CsvRow;
}

async function main() {
  console.log("🚀 開始匯入流程 (Schema v3 - 正確分組)...");

  if (!fs.existsSync(FILE_PATH)) {
    console.error(`❌ 找不到檔案：${FILE_PATH}`);
    process.exit(1);
  }

  fs.writeFileSync(
    ERROR_LOG_PATH,
    `Import Log - ${new Date().toISOString()}\n\n`,
  );
  function logError(row: string, reason: string) {
    fs.appendFileSync(ERROR_LOG_PATH, `[ERROR] ${reason} | Row: ${row}\n`);
  }

  const fileStream = fs.createReadStream(FILE_PATH);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const categories = new Map<
    string,
    { level: number; parentKey: string | null; name: string }
  >();

  // 以 productDisplayName 為 key 分組
  const productMap = new Map<string, ProductData>();

  let isHeader = true;
  let totalLines = 0;
  let skippedCount = 0;

  console.log("📖 正在讀取並分組 CSV 檔案...");

  for await (const line of rl) {
    totalLines++;
    if (isHeader) {
      isHeader = false;
      continue;
    }

    if (!line || line.trim() === "") continue;

    const cols = parseCSVLine(line);
    if (cols.length < 10) {
      logError(line, "欄位數量不足 10 個");
      skippedCount++;
      continue;
    }

    const [
      id,
      gender,
      masterCat,
      subCat,
      articleType,
      baseColour,
      season,
      year,
      usage,
      productName,
    ] = cols;

    if (!id || !productName || !masterCat || !subCat || !articleType) {
      logError(line, "缺少關鍵欄位 (ID/Name/Category)");
      skippedCount++;
      continue;
    }

    const row: CsvRow = {
      id,
      gender,
      masterCat,
      subCat,
      articleType,
      baseColour,
      season,
      year,
      usage,
      productName,
    };

    // 收集分類
    const masterKey = masterCat;
    const subKey = `${masterCat}|${subCat}`;
    const articleKey = `${masterCat}|${subCat}|${articleType}`;

    if (!categories.has(masterKey))
      categories.set(masterKey, { level: 0, parentKey: null, name: masterCat });
    if (!categories.has(subKey))
      categories.set(subKey, { level: 1, parentKey: masterKey, name: subCat });
    if (!categories.has(articleKey))
      categories.set(articleKey, {
        level: 2,
        parentKey: subKey,
        name: articleType,
      });

    // 以 productDisplayName 分組建立 Product
    if (!productMap.has(productName)) {
      productMap.set(productName, {
        productName,
        masterCat,
        subCat,
        articleType,
        variants: new Map(),
        firstRow: row,
      });
    }

    const product = productMap.get(productName);
    if (!product) continue;

    // 以 gender + season + year + usage + baseColour 分組建立 Variant
    const variantKey = `${gender}|${season}|${year}|${usage}|${baseColour}`;

    if (!product.variants.has(variantKey)) {
      product.variants.set(variantKey, {
        variantKey,
        gender,
        season,
        year,
        usage,
        baseColour,
        imageIds: [],
      });
    }

    // 收集同 Variant 的多個 id 組成 images 陣列
    product.variants.get(variantKey)?.imageIds.push(id);

    if (totalLines % 10000 === 0) console.log(`   已掃描 ${totalLines} 行...`);
  }

  const productCount = productMap.size;
  let variantCount = 0;
  for (const p of productMap.values()) {
    variantCount += p.variants.size;
  }

  console.log(
    `✅ 分組完成。Products: ${productCount}，Variants: ${variantCount}，略過: ${skippedCount}`,
  );
  console.log(`📝 詳細錯誤請查看 ${ERROR_LOG_PATH}`);

  // --- 0. 清空現有資料 ---
  console.log("🗑️  正在清空現有資料...");
  await prisma.productAttribute.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  console.log("✅ 資料清空完畢。");

  // --- 1. 建立分類 ---
  console.log("📂 正在建立分類...");
  const categoryIdMap = new Map<string, string>();

  async function ensureCategory(
    key: string,
    data: { level: number; parentKey: string | null; name: string },
  ) {
    if (categoryIdMap.has(key)) return categoryIdMap.get(key);

    const parentId = data.parentKey ? categoryIdMap.get(data.parentKey) : null;
    const slug =
      slugify(data.name) + (parentId ? `-${parentId.slice(-4)}` : "");

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      categoryIdMap.set(key, existing.id);
      return existing.id;
    }

    const created = await prisma.category.create({
      data: { name: data.name, slug, level: data.level, parentId },
    });
    categoryIdMap.set(key, created.id);
    return created.id;
  }

  for (const [key, data] of categories) {
    if (data.level === 0) await ensureCategory(key, data);
  }
  for (const [key, data] of categories) {
    if (data.level === 1) await ensureCategory(key, data);
  }
  for (const [key, data] of categories) {
    if (data.level === 2) await ensureCategory(key, data);
  }

  console.log("✅ 分類處理完畢。");

  // --- 2. 匯入產品 ---
  console.log("📦 正在寫入產品資料...");

  const products = Array.from(productMap.values());
  const BATCH_SIZE = 1000;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);

    const promises = batch.map(async (p) => {
      try {
        const articleKey = `${p.masterCat}|${p.subCat}|${p.articleType}`;
        const categoryId = categoryIdMap.get(articleKey);
        const firstVariant = Array.from(p.variants.values())[0];
        const productId = createId();

        const variantsData = Array.from(p.variants.values()).map((v, idx) => {
          const price = Math.floor(Math.random() * 5000) + 500;
          const stock = Math.floor(Math.random() * 100);
          return {
            sku: `${productId}-${idx}`,
            price,
            stock,
            images: v.imageIds.map((id) => `/products/${id}.jpg`),
            attributes: {
              gender: v.gender || null,
              season: v.season || null,
              year: v.year || null,
              usage: v.usage || null,
              baseColour: v.baseColour || null,
            },
          };
        });

        const totalStock = variantsData.reduce((sum, v) => sum + v.stock, 0);
        const minPrice = Math.min(...variantsData.map((v) => v.price));

        // 建立商品層級屬性（masterCategory、subCategory、articleType）
        const attributesData = [
          { name: "masterCategory", value: p.masterCat },
          { name: "subCategory", value: p.subCat },
          { name: "articleType", value: p.articleType },
        ].filter((attr) => attr.value && attr.value.trim() !== "");

        await prisma.product.create({
          data: {
            id: productId,
            name: p.productName,
            slug: `${slugify(p.productName)}-${productId.slice(-6)}`,
            description: `${p.productName} Collection`,
            price: minPrice,
            stock: totalStock,
            brand: "Generic",
            featured: false,
            published: true,
            gender: genderMap[firstVariant.gender] || null,
            season: seasonMap[firstVariant.season] || null,
            categoryId,
            variants: {
              create: variantsData,
            },
            attributes: {
              create: attributesData,
            },
          },
        });

        successCount++;
      } catch (e) {
        logError(p.productName, `資料庫寫入失敗: ${e}`);
        errorCount++;
      }
    });

    await Promise.all(promises);
    process.stdout.write(
      `\r   已處理 ${Math.min(i + batch.length, products.length)}/${products.length} (成功: ${successCount}, 失敗: ${errorCount})...`,
    );
  }

  console.log(`\n\n🎉 匯入結束！`);
  console.log(`   Products: ${successCount}`);
  console.log(`   失敗: ${errorCount} (請檢查 log)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
