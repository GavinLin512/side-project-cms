import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// 使用 Service Role Key （僅在服務端使用）
const supabaseAdmin: SupabaseClient = createClient(
  // biome-ignore lint/style/noNonNullAssertion: <shadcn 本身套件設定，不檢查>
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // biome-ignore lint/style/noNonNullAssertion: <shadcn 本身套件設定，不檢查>
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // 使用 service_role key，不是 anon key
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

export { supabaseAdmin };
