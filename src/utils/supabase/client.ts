import { createBrowserClient } from "@supabase/ssr";
export function createClient() {
  return createBrowserClient(
    // biome-ignore lint/style/noNonNullAssertion: <shadcn 本身套件設定，不檢查>
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: <shadcn 本身套件設定，不檢查>
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
