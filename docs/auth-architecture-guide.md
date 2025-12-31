# 認證架構開發指南 (Supabase Auth + Next.js App Router)

本專案採用 Next.js App Router 推薦的標準模式進行認證管理，結合了伺服器端渲染 (SSR) 的安全性與客戶端 Context 的便利性。

## 架構核心理念

1.  **單一真相來源**：認證狀態（User）由伺服器端透過 Cookie 獲取，並作為 Initial Data 注入前端。
2.  **避免水合錯誤 (No Hydration Mismatch)**：透過 Props 傳遞狀態，確保伺服器渲染與客戶端首幀渲染內容完全一致。
3.  **效能極大化**：移除不必要的狀態管理庫（如 Zustand），減少 JavaScript Bundle Size 並簡化邏輯。

## 核心檔案結構

```text
src/
├── providers/
│   └── auth-provider.tsx     # 認證 Context 與 useAuth Hook
├── app/
│   ├── (customer)/layout.tsx # 伺服器端獲取 Session 並注入 Context
│   └── actions/
│       └── auth.ts           # 處理登入、註冊、登出的 Server Actions
└── utils/supabase/
    ├── server.ts             # 伺服器端 Supabase Client (處理 Cookies)
    └── auth.ts                # 伺服器端 Auth 工具函式
```

## 使用方法

### 1. 在 Server Components 中獲取使用者
在 Server Component 中，應直接呼叫 `getServerSession()` 或使用 `createServerClient`。

```tsx
// src/app/page.tsx (Server Component)
import { getServerSession } from "@/utils/supabase/auth";

export default async function Page() {
  const { user } = await getServerSession();
  
  return <div>{user ? `你好, ${user.email}` : "請登入"}</div>;
}
```

### 2. 在 Client Components 中獲取使用者
在 Client Component 中，應使用 `useAuth` Hook。

```tsx
'use client'

import { useAuth } from "@/providers/auth-provider";

export default function HeaderProfile() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <LoginLink />;
  
  return <div>歡迎, {user?.user_metadata.name}</div>;
}
```

## 認證流程說明

### 登入 (Login)
1. 前端表單提交資料至 `loginAction` (Server Action)。
2. `loginAction` 呼叫 Supabase 進行驗證，驗證成功後 Supabase 會在 Response Set-Cookie。
3. `loginAction` 回傳成功訊息與導向路徑。
4. 前端執行 `router.push(redirectTo)`。

### 登出 (Logout)
1. 呼叫 `logOutAction` (Server Action)。
2. 伺服器端清除 Auth Cookie 並執行 `revalidatePath`。
3. 前端接收到成功後執行 `router.refresh()`，這會強制重新拉取當前頁面的 Server Components 資料，進而更新 `AuthProvider` 中的 `user` 狀態為 `null`。

## 優點總結

- **安全性**：Session 管理完全基於 HttpOnly Cookies，避免 XSS 攻擊。
- **一致性**：不再有「畫面閃爍」或「登入狀態延遲顯示」的問題。
- **簡潔性**：移除了複雜的狀態同步邏輯，程式碼更易於維護。

## 常見問題

### 為什麼不使用 Zustand/Redux 管理 User？
在 App Router 架構下，User 狀態本質上是伺服器端的資料。透過 Context 傳遞 Server 取得的資料已經能滿足 99% 的 Client UI 需求，且能完美支援 SSR。

### 如何更新 User Metadata？
當 User 在個人資料頁面更新姓名後，請呼叫對應的 Server Action 並執行 `revalidatePath("/")`，接著在前端呼叫 `router.refresh()`，UI 就會自動同步最新資訊。
