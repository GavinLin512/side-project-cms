import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

interface UserState {
  user: User | null;
  isInitialized: boolean;
  initialize: () => void;
}

export const useUserStore = create<UserState>((set, _get) => ({
  user: null,
  isInitialized: false,
  getUser: async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    const user = data?.user ?? null;
    if (error || !data?.user) {
      redirect("/account");
    }
    set({ user, isInitialized: true });
    return user;
  },
  initialize: async () => {
    const supabase = createClient();
    const user = (await supabase.auth.getUser()).data?.user ?? null;
    set({ user, isInitialized: true });
    // 監聽狀態變化
    const authListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        // console.log("Auth 事件觸發:", {
        //   event,
        //   session,
        //   currentUser,
        //   timestamp: new Date().toISOString(),
        // });

        set({ user: currentUser, isInitialized: true });

        if (event === "SIGNED_IN" && currentUser) {
          console.log("登入成功事件觸發", currentUser);
          // toast.success("登入成功！");
        } else if (event === "SIGNED_OUT") {
          console.log("登出成功事件觸發", currentUser);
          // toast.success("登出成功！");
        }
      }
    );

    return () => {
      // 資源清理機制
      authListener.subscription.unsubscribe();
    };
  },
}));

// 便利的 hooks
export const useUser = () => useUserStore((state) => state.user);
export const useUserIsInitialized = () =>
  useUserStore((state) => state.isInitialized);
export const userInitialize = () => useUserStore((state) => state.initialize);
