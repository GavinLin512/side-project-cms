# AGENTS.md

## Project Context
This is a Next.js 16 project with Supabase Auth, Prisma ORM, and Tailwind CSS v4.
It uses a feature-driven architecture.

## Code Style
- **TypeScript**: Strict mode. No `any` or `@ts-ignore`.
- **Naming**: PascalCase for components, camelCase for functions/vars.
- **Import Order**: External → Internal → Relative.

## Folder Structure & Organization

### 1. 路由區分
- **app/(customer)/**：前台使用者介面
- **app/admin/**：後台管理介面

### 2. 元件組織

#### 2.1 shadcn/ui 基礎元件（純淨隔離）
- **位置**：`src/components/ui/`
- **安裝方式**：`pnpm dlx shadcn add button`（預設路徑）
- **規則**：
  - ✅ 僅放 shadcn CLI 安裝的基礎 UI 元件
  - ❌ 禁止放客製化元件或 blocks
- **範例**：`button.tsx`, `card.tsx`, `dialog.tsx`

#### 2.2 shadcn Blocks（跨路由共用）
- **位置**：`src/components/[功能分類]/`
- **安裝方式**：
  ```bash
  # 後台 blocks
  pnpm dlx shadcn add sidebar-07 --path src/components/admin
  
  # 前台 blocks（如需要）
  pnpm dlx shadcn add login-03 --path src/components/customer
  ```
- **規則**：
  - ✅ 僅放 shadcn blocks（預製的複雜元件組合）
  - ✅ 用子目錄區分前後台（`admin/`, `customer/`）
  - ❌ 禁止放客製化元件
- **範例**：
  ```
  src/components/admin/
    ├── app-sidebar.tsx      ← sidebar-07 block
    ├── nav-main.tsx
    └── data-table.tsx
  ```

#### 2.3 客製化元件（功能導向 Colocation）
- **位置**：各功能底下的 `_components/`
- **規則**：
  - 前台專用 → `app/(customer)/_components/`
  - 後台專用 → `app/admin/_components/`（路由專屬元件）
  - 路由專屬 → `app/(customer)/products/_components/`
- **範例**：
  ```
  app/(customer)/_components/
    ├── header.tsx
    ├── footer.tsx
    └── singleProductCard.tsx  ← 基於 shadcn Card 客製化
  
  app/admin/_components/
    ├── userManagementTable.tsx  ← 僅用於特定路由
  ```

#### 2.4 全域共用元件（謹慎使用）
- **位置**：`src/components/`（不再使用 `/shared` 子目錄）
- **判定標準**（三個條件**全部滿足**才可放這裡）：
  1. 跨前後台使用
  2. **完全相同**的實現（無業務邏輯差異）
  3. 純 UI 元件（無狀態、無業務邏輯）
- **範例**：
  ```
  src/components/
    ├── loading-spinner.tsx
    └── error-boundary.tsx
  ```
- **反例**（應各自實現）：
  - ❌ ProductCard（前後台樣式不同） → 各自在 `_components/` 實現
  - ❌ UserAvatar（前台顯示暱稱，後台顯示 ID） → 各自實現

### 3. shadcn 安裝路徑對照表

| 類型 | 安裝指令 | 安裝路徑 |
|------|---------|---------|
| 基礎 ui 元件 | `pnpm dlx shadcn add button` | `src/components/ui/button.tsx` |
| 後台 blocks | `pnpm dlx shadcn add sidebar-07 --path src/components/admin` | `src/components/admin/app-sidebar.tsx` |
| 前台 blocks | `pnpm dlx shadcn add login-03 --path src/components/customer` | `src/components/customer/login-form.tsx` |

### 4. Import 路徑規範

```typescript
// ✅ shadcn/ui 基礎元件
import { Button } from "@/components/ui/button"

// ✅ shadcn blocks（後台）
import { AppSidebar } from "@/components/admin/app-sidebar"

// ✅ 客製化元件（前台）
import { Header } from "@/app/(customer)/_components/header"

// ✅ 全域共用元件
import { LoadingSpinner } from "@/components/loading-spinner"
```

### 5. 違規檢查清單

```bash
# 檢查 ui/ 是否有非基礎元件（blocks 或客製化）
ls src/components/ui/ | wc -l  # 應該 < 50 個檔案

# 檢查 blocks 是否誤放 ui/
grep -r "app-sidebar\|nav-main\|data-table" src/components/ui/ 

# 檢查客製化元件是否誤放全域
find src/components -name "*Card.tsx" -o -name "*Section.tsx"
```

### 7. Types、Hooks、Features 組織

#### 7.1 Types 組織
- **功能專屬**：各功能底下的 `_types/`
  ```
  app/(customer)/_types/type.ts
  app/(customer)/products/_types/product.ts
  app/admin/_types/adminUser.ts
  ```
- **全域共用**：`src/types/`（真正的全域型別）
  ```
  src/types/database.ts  ← Prisma 生成的全域型別
  src/types/api.ts       ← 全域 API 型別
  ```

#### 7.2 Hooks 組織
- **功能專屬**：各功能底下的 `_hooks/`
  ```
  app/(customer)/_hooks/useProductFilter.ts
  app/admin/_hooks/useAdminAuth.ts
  ```
- **全域共用**：`src/hooks/`（真正的全域 hooks）
  ```
  src/hooks/use-mobile.ts  ← 跨前後台的響應式檢測
  ```

#### 7.3 src/features/ vs app/_components/

##### src/features/（跨路由的業務功能模組）
- **用途**：封裝**業務功能**（完整功能單元）
- **包含**：components、hooks、utils、types、API、stores
- **特性**：自包含、可跨前後台使用
- **範例**：
  ```
  src/features/cart/
    ├── components/
    │   ├── CartItem.tsx       ← Cart 專屬 UI 元件（有狀態管理）
    │   └── CartSummary.tsx
    ├── hooks/useCart.ts       ← Cart 邏輯
    ├── api/cartService.ts
    └── types/cart.ts
  ```

##### app/_components/（路由專屬的 UI 元件）
- **用途**：路由專屬的**純 UI 元件**（純展示）
- **包含**：僅 UI 元件
- **特性**：簡單、無複雜邏輯、colocation
- **範例**：
  ```
  app/(customer)/_components/
    ├── header.tsx             ← 僅前台用的 Layout UI（純展示）
    └── footer.tsx
  ```

##### 判斷流程圖
```
有這個元件 → 問自己以下問題：

1. 需要 hook 或 store 嗎？
   ├─ 是 → features/[feature]/components/
   └─ 否 → 繼續問下一題

2. 需要呼叫 API 嗎？
   ├─ 是 → features/[feature]/components/
   └─ 否 → 繼續問下一題

3. 會在多個路由使用嗎？（前台+後台、或多個前台路由）
   ├─ 是 → features/[feature]/components/
   └─ 否 → 繼續問下一題

4. 僅用於當前路由區域？（如僅前台首頁）
   └─ 是 → app/(customer)/_components/
```

##### 實際案例對比

###### 案例 A: CartItem（有業務邏輯）
```typescript
// ✅ 放 features/cart/components/CartItem.tsx
// 理由：有狀態管理、API 呼叫、複雜邏輯
"use client";

import { useCart } from "@/features/cart/hooks/useCart";
import { updateQuantity } from "@/features/cart/api/cartService";

export function CartItem({ productId }) {
  const { items, updateItem } = useCart();  // ← 使用 feature 內的 hook
  
  const handleQuantityChange = async (qty) => {
    await updateQuantity(productId, qty);   // ← 呼叫 feature 內的 API
    updateItem(productId, qty);
  };
  
  return (
    <div>
      <button onClick={() => handleQuantityChange(qty + 1)}>+</button>
      {/* ... */}
    </div>
  );
}

// 使用場景：前台購物車、後台訂單管理
// 理由：跨路由使用 + 有業務邏輯
```

###### 案例 B: Header（純 UI）
```typescript
// ✅ 放 app/(customer)/_components/header.tsx
// 理由：純 UI，無業務邏輯，僅前台用
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Button>Login</Button>
      </nav>
    </header>
  );
}

// 使用場景：僅在前台 layout
// 理由：無業務邏輯、不跨路由重用、無需 hooks/api
```

###### 案例 C: ProductCard 場景 A（有業務邏輯）
```typescript
// ✅ 放 features/products/components/ProductCard.tsx
"use client";

import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { addToCart } from "@/features/cart/api/cartService";

export function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();  // ← 依賴 feature hook
  
  const handleAddToCart = async () => {
    await addToCart(product.id);  // ← 依賴 feature API
  };
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={() => toggleWishlist(product.id)}>
        {isInWishlist(product.id) ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

// 使用場景：前台商品列表、後台商品管理、搜尋結果頁
// 理由：跨路由使用 + 有業務邏輯
```

###### 案例 D: ProductCard 場景 B（純展示）
```typescript
// ✅ 放 app/(customer)/_components/productCard.tsx
export function ProductCard({ product, onAddToCart, onToggleWishlist }) {
  // 純展示，邏輯由父元件注入
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={onAddToCart}>Add to Cart</button>
      <button onClick={onToggleWishlist}>Toggle Wishlist</button>
    </div>
  );
}

// 使用場景：僅在前台首頁/商品列表
// 理由：純 UI，邏輯在父元件（page.tsx）處理
```

### 8. _components/ 層級深度規範

#### 推薦：最多兩層，用子目錄分類

```
app/(customer)/products/_components/
├── ProductGrid.tsx              ← 列表頁元件
├── ProductFilters.tsx
└── productDetail/               ← 子目錄分類詳情頁元件
    ├── ProductGallery.tsx
    ├── ProductInfo.tsx
    └── ReviewsSection.tsx
```

**原則**：
- ✅ `_components/` 放在「功能路由」層級（`products/`）
- ✅ 用子目錄區分「子功能」（`productDetail`、`productList`）
- ❌ 避免 `[slug]/_components/`（過深）
- ❌ 避免上層 `_components/products/`（違反 colocation）

**理由**：
1. 符合 Next.js colocation 原則
2. 利於 code splitting 和性能優化
3. 清晰的檔案組織，易於查找

### 9. 快速決策表

| 元件特徵 | 放哪裡 | 範例 |
|---------|--------|------|
| 使用 feature hooks/stores | `features/[feature]/components/` | CartItem, ProductCard（場景 A） |
| 呼叫 API | `features/[feature]/components/` | ProductSearch, LoginForm |
| 複雜狀態管理 | `features/[feature]/components/` | ProductFilters, WishlistToggle |
| 跨路由重用（前+後台） | `features/[feature]/components/` | UserAvatar, NotificationBell |
| 純 UI（無邏輯） | `app/(customer)/_components/` | Header, Footer, HeroSection |
| 僅單一路由使用 | `app/(customer)/_components/` | SectionTitle, ProductGrid |
| Layout 相關 | `app/(customer)/_components/` | Sidebar, Navigation |
| shadcn/ui 基礎元件 | `src/components/ui/` | Button, Card, Dialog |
| shadcn blocks（後台） | `src/components/admin/` | AppSidebar, DataTable |
| 全域共用（完全相同實現） | `src/components/` | LoadingSpinner, ErrorBoundary |

### 10. 違規檢查工具

```bash
# 檢查 ui/ 是否有非基礎元件（blocks 或客製化）
ls src/components/ui/ | wc -l  # 應該 < 50 個檔案

# 檢查 blocks 是否誤放 ui/
grep -r "app-sidebar\|nav-main\|data-table" src/components/ui/ 

# 檢查客製化元件是否誤放全域
find src/components -name "*Card.tsx" -o -name "*Section.tsx"

# 檢查是否有三層以上的 _components/
find app -type d -name "_components" -exec bash -c 'depth=$(echo "{}" | grep -o "_components" | wc -l); [ $depth -gt 2 ] && echo "⚠️ 過深: {}"' \;
```
