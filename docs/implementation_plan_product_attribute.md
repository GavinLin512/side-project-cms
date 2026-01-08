# 實作計畫：填充 ProductAttribute 資料

## 1. 問題描述

目前 `ProductAttribute` 表為空，匯入腳本 (`scripts/import-products.ts`) 只清空該表但未寫入任何資料。

## 2. 目標

在匯入流程中，為每個 `Product` 建立對應的 `ProductAttribute` 記錄，儲存**商品層級**的屬性。

## 3. 資料來源分析

### CSV 欄位與用途

| CSV 欄位 | 目前用途 | 建議新用途 |
|----------|----------|------------|
| `masterCat` | 建立 Category（level 0） | 同時存入 ProductAttribute |
| `subCat` | 建立 Category（level 1） | 同時存入 ProductAttribute |
| `articleType` | 建立 Category（level 2） | 同時存入 ProductAttribute |
| `gender` | 存入 Variant.attributes (JSON) | 維持現狀 |
| `season` | 存入 Variant.attributes (JSON) | 維持現狀 |
| `baseColour` | 存入 Variant.attributes (JSON) | 維持現狀 |
| `usage` | 存入 Variant.attributes (JSON) | 維持現狀 |
| `year` | 存入 Variant.attributes (JSON) | 維持現狀 |

### 為什麼選擇 masterCat / subCat / articleType？

1. **這些是商品層級屬性**：無論哪個變體，這三個欄位的值都相同
2. **方便篩選查詢**：雖然已有 Category 關聯，但 ProductAttribute 提供更靈活的屬性查詢方式
3. **符合 Schema 設計意圖**：正規化的 key-value 結構，可擴展性高

## 4. 預期結果

每個 Product 將新增 3 筆 ProductAttribute 記錄：

| name | value | 範例 |
|------|-------|------|
| `masterCategory` | masterCat 欄位值 | Apparel |
| `subCategory` | subCat 欄位值 | Topwear |
| `articleType` | articleType 欄位值 | Shirts |

## 5. 程式碼修改

### 修改位置

`scripts/import-products.ts` 第 337-355 行（產品建立區塊）

### 修改內容

```typescript
// 現有程式碼（第 337-355 行）
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
    // ✅ 新增：建立 ProductAttribute
    attributes: {
      create: [
        { name: "masterCategory", value: p.masterCat },
        { name: "subCategory", value: p.subCat },
        { name: "articleType", value: p.articleType },
      ],
    },
  },
});
```

## 6. 驗證方式

匯入完成後，執行以下 SQL 確認資料正確：

```sql
-- 確認 ProductAttribute 有資料
SELECT COUNT(*) FROM "ProductAttribute";

-- 預期結果：Product 數量 × 3

-- 確認資料結構正確
SELECT 
  p.name AS product_name,
  pa.name AS attr_name,
  pa.value AS attr_value
FROM "ProductAttribute" pa
JOIN "Product" p ON pa."productId" = p.id
LIMIT 10;
```

## 7. 風險評估

| 風險 | 機率 | 影響 | 緩解措施 |
|------|------|------|----------|
| 重複資料（相同 productId + name + value） | 低 | 匯入失敗 | Schema 有 `@@unique([productId, name, value])` 約束，會自動防止 |
| 空值寫入 | 中 | 資料不完整 | 加入空值檢查，跳過空白欄位 |

## 8. 備選方案

如果您希望儲存更多屬性，可以擴展為：

```typescript
attributes: {
  create: [
    { name: "masterCategory", value: p.masterCat },
    { name: "subCategory", value: p.subCat },
    { name: "articleType", value: p.articleType },
    // 可擴展：
    // { name: "brand", value: "Generic" },
    // { name: "collection", value: `${p.productName} Collection` },
  ].filter(attr => attr.value && attr.value.trim() !== ""),
},
```

---

## 確認事項

請確認以下內容後，我會開始實作：

- [ ] 同意填充 `masterCategory`、`subCategory`、`articleType` 三個屬性
- [ ] 同意修改 `scripts/import-products.ts`
- [ ] 是否需要增加其他屬性？

