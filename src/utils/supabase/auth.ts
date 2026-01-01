import type { Session, User } from "@supabase/supabase-js";
import { createServerClient } from "@/utils/supabase/server";

/**
 * 在伺服器端獲取當前用戶的 session（先驗證 user，再讀 session）
 * 用於 SSR 和 API 路由
 */
export async function getServerSession(): Promise<{
  user: User | null;
  session: Session | null;
}> {
  try {
    const supabase = await createServerClient();

    // 先向 Auth 伺服器驗證 user（避免直接信任 cookie/local 的未驗證資料）
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { user: null, session: null };
    }

    // 再讀取 session 資訊（token、過期時間等）
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return {
      user,
      session: session || null,
    };
  } catch (error) {
    console.error("Error getting server session:", error);
    return { user: null, session: null };
  }
}

/**
 * 在伺服器端獲取當前用戶
 * 用於 SSR 和 API 路由
 */
export async function getServerUser(): Promise<User | null> {
  const { user } = await getServerSession();
  return user;
}

/**
 * 檢查用戶是否已認證
 * 用於 SSR 和 API 路由
 */
export async function isAuthenticated(): Promise<boolean> {
  const { user } = await getServerSession();
  return user !== null;
}
