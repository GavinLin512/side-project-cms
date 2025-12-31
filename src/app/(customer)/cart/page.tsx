"use client"

import { useUser } from "@/store/userStore"
import { useEffect } from "react"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Cart() {
  // const user = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/account");
  //     toast.info("請先登入");
  //   }
  // },[user, router])
  return (
    <h1>Cart</h1>
  )
}
