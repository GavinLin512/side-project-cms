"use client";

import { LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { loginAction, signUpAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type Mode = "login" | "register";

const formVariants = {
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 0 },
};

const LoginForm = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isPending) {
      toast.info("登入中...");
    }
  }, [isPending]);

  const handleLogin = async (formData: FormData) => {
    startTransition(async () => {
      const { success, message, redirectTo } = await loginAction(formData);
      if (!success) {
        toast.error(message);
      } else {
        router.push(redirectTo || "/");
        toast.success(message);
      }
    });
  };

  return (
    <motion.form
      className="space-y-4"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      action={handleLogin}
      aria-disabled={isPending}
    >
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          name="email"
          disabled={isPending}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          disabled={isPending}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" name="remember-me" />
          <label
            htmlFor="remember-me"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
      </div>
      <div>
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <LoaderCircle size={24} className="animate-spin" />
              <span>登入中...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
        <Button variant="outline" className="w-full mt-4" disabled={isPending}>
          Login with Google
        </Button>
      </div>
      <div className="text-center">
        <Link href="#" className="text-sm text-gray-600 hover:underline">
          忘記密碼?
        </Link>
      </div>
    </motion.form>
  );
};

const RegisterForm = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isPending) {
      toast.info("註冊中...");
    }
  }, [isPending]);

  const handleSignup = async (formData: FormData) => {
    startTransition(async () => {
      const { success, message } = await signUpAction(formData);
      if (!success) {
        toast.error(message);
      } else {
        router.push("/");
        toast.success("註冊成功，請到信箱收取驗證信件！");
      }
    });
  };

  return (
    <motion.form
      className="space-y-4"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      action={handleSignup}
    >
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="name">
          Name
        </label>
        <Input id="name" placeholder="Name" name="name" disabled={isPending} />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          name="email"
          disabled={isPending}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          disabled={isPending}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="repeat-password">
          Repeat the password
        </label>
        <Input
          id="repeat-password"
          type="password"
          placeholder="Password"
          name="repeat-password"
          disabled={isPending}
        />
      </div>
      <div>
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <LoaderCircle size={24} className="animate-spin" />
              <span>註冊中...</span>
            </>
          ) : (
            "Register"
          )}
        </Button>
        <Button variant="outline" className="w-full mt-4" disabled={isPending}>
          Register with Google
        </Button>
      </div>
    </motion.form>
  );
};

export default function Account() {
  const [mode, setMode] = useState<Mode>("login");

  // 切換 form 表單
  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full w-md-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">My account</h1>
      </div>
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={mode === "login" ? "default" : "outline"}
          onClick={() => handleModeChange("login")}
          className="w-32"
        >
          Login
        </Button>
        <Button
          variant={mode === "register" ? "default" : "outline"}
          onClick={() => handleModeChange("register")}
          className="w-32"
        >
          Register
        </Button>
      </div>
      <div className="grid md:grid-cols-2 items-start w-full max-w-4xl border rounded-lg shadow-sm overflow-hidden min-h-[460px]">
        <div className="p-8">
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <LoginForm key="login" />
            ) : (
              <RegisterForm key="register" />
            )}
          </AnimatePresence>
        </div>
        <div className="hidden md:block h-full">
          <Image
            src="/banner.jpg"
            alt="Account banner"
            width={800}
            height={800}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
