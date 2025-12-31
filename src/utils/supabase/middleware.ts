import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/app/actions/user";

// 定義用戶角色類型
type UserRole = "admin" | "customer" | null;

// 路由配置
const ROUTE_CONFIG = {
  // 公共路由（無需認證）
  public: [
    "/account",
    "/search",
    "/forgot-password",
    "/reset-password",
    "/products",
    "/catalog",
  ],

  // 認證路由（登入後不應該訪問）
  auth: ["/account"],

  // 管理員專用路由
  admin: ["/admin"],

  // 客戶專用路由
  customer: [
    "/user-profile",
    "/orders",
    "/wishlist",
    "/cart",
    "/products",
    "/catalog",
  ],

  // 共享受保護路由（兩種角色都可訪問）
  protected: ["/user-profile", "/orders", "/wishlist", "/cart"],
} as const;

// 檢查路徑是否匹配路由規則
function matchesRoute(pathname: string, routes: readonly string[]): boolean {
  return routes.some((route) => pathname.startsWith(route));
}

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("[MW] Incoming request", { path: path });
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("[MW] supabase.auth.getUser()", user ? { id: user.id } : null);

  const isProtectedRoute: boolean = matchesRoute(path, ROUTE_CONFIG.protected);
  const isAuthRoute: boolean = matchesRoute(path, ROUTE_CONFIG.auth);
  const isAdminRoute: boolean = matchesRoute(path, ROUTE_CONFIG.admin);

  if (isProtectedRoute || isAuthRoute) {
    // 未登入就跳轉登入頁
    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  if (user) {
      // customer 不可進入 /admin/*
      const isAdminRole = await isAdmin();
      const isCustomerRole = !isAdminRole;
      if (isAdminRoute && isCustomerRole) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      // admin 跳轉 (已經到 /admin 就不跳轉，否則會 too many redirect)
      if (isAdminRole && !isAdminRoute) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      // 已經登入就跳轉首頁，不可再進入登入頁
      if (isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  console.log("[MW] Pass through", { path: request.nextUrl.pathname });
  return supabaseResponse;
}
