"use client";

import { Heart, LogOut, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { logOutAction } from "@/app/actions/auth";
import { useAuth } from "@/providers/auth-provider";

export default function HeaderRight() {
  const { user, isAuthenticated } = useAuth();

  const router = useRouter();

  // 取得 server action state 用
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isPending) {
      toast.info("登出中...");
    }
  }, [isPending]);

  const handleLogout = async () => {
    startTransition(async () => {
      // 呼叫 Server Action 清除後端 Session Cookie
      const { success, message } = await logOutAction();

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        // 強制刷新頁面，確保 Server Components 重新渲染
        router.refresh();
        router.push("/");
      }
    });
  };

  const metadata = user?.user_metadata;

  return (
    <div className="flex items-center space-x-6">
      <Link
        href="/search"
        className="hidden lg:flex items-center space-x-1 hover:text-secondary"
      >
        <Search size={20} />
        <span>Search</span>
      </Link>
      <Link
        href="/account"
        className="hidden lg:flex items-center space-x-1 hover:text-secondary"
      >
        <User size={20} />
        <span>
          {isAuthenticated
            ? metadata?.name && `【${metadata.name}】`
            : `Account`}
        </span>
      </Link>

      <Link
        href="/wishlist"
        className="hidden lg:flex items-center space-x-1 hover:text-secondary"
      >
        <Heart size={20} />
        <span>Wishlist</span>
      </Link>
      <Link
        href="/cart"
        className="flex items-center space-x-1 hover:text-secondary"
      >
        <ShoppingCart size={20} />
        <span>Cart</span>
      </Link>
      {isAuthenticated && (
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center space-x-1 hover:text-secondary"
        >
          <LogOut size={20} />
        </button>
      )}
    </div>
  );
}
