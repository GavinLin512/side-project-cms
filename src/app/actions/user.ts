"use server";

import { createServerClient } from "@/utils/supabase/server";
import { getErrorMessage } from "@/lib/utils";

// 取得 user 資料
export async function getUser() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return null;
  }
  return data?.user;
}

// 取得 user roles
export async function getRoles() {
  const user = await getUser();

  // 如果使用者未登入，直接回傳空陣列，避免不必要的資料庫查詢
  if (!user) {
    return [];
  }

  const supabase = await createServerClient();

  // 使用設定好的 Postgres function 來查詢 (Remote Procedure Call, 簡稱 rpc)
  // 此函式應位於資料庫中，並從 rbac.user_roles 等表中提取資料
  const { data: roleRows, error } = await supabase.rpc("get_user_roles", {
    p_user_id: user.id,
  });

  if (error) {
    console.error("獲取使用者角色失敗:", error.message);
    return [];
  }

  return roleRows || [];
}

// 判斷是否為 admin
export async function isAdmin() {
  try {
    const roleRows = await getRoles();
    
    // 將回傳的角色資料列轉換為字串陣列，並移除重複值與空值
    const roles = Array.from(
      new Set(
        (roleRows ?? [])
          .map((r: { role?: string }) => r.role)
          .filter(Boolean) as string[]
      )
    );
    
    console.log("[Auth] 當前使用者角色:", roles);
    
    // 檢查是否包含管理員角色
    const isAdmin = roles.includes("admin");
    return isAdmin;
  } catch (error) {
    console.error("檢查管理員權限時發生錯誤:", error);
    // 發生錯誤時預設回傳 false，採取最嚴格的安全性限制
    return false;
  }
}

// 登入後才能查看的路由
export async function protectRoute() {
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
}
