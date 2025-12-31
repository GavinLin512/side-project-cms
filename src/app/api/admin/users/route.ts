import { type NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  console.log(req.method);
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    // const { data, error } = await supabaseAdmin.auth.admin.deleteUser(
    //   "5dbd26fd-fdc3-4f57-97d5-7c7ea2fd367f"
    // );
    // 獲取所有用戶 (使用 Admin Client)
    // const { data: users, error } = await supabaseAdmin.auth.admin.listUsers();
    // console.log(data, error);

    return NextResponse.json({ response: "Delete Success" }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
