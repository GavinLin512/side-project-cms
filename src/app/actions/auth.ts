"use server";

import { createServerClient } from "@/utils/supabase/server";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/app/actions/user";

export async function loginAction(formData: FormData) {
  try {
    const supabase = await createServerClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      throw error;
    }
    // 重新快取頁面
    revalidatePath('/', 'layout');

    const isAdminUser = await isAdmin();
    const redirectTo = isAdminUser ? "/admin/dashboard" : "/";

    return {
      success: true,
      message: 'Logged in successfully',
      redirectTo,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function signUpAction(formData: FormData) {
  try {
    const supabase = await createServerClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      options: {
        data: {
          name: formData.get("name") as string,
        },
      },
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      throw error;
    }

    revalidatePath("/", "layout");

    return {
      success: true,
      message: 'Signed up successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function logOutAction() {
  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    revalidatePath("/", "layout");

    return {
      success: true,
      message: 'Logged out successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}
