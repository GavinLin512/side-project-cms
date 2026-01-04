"use client";

import { Sprout } from "lucide-react";
import Link from "next/link";
import HeaderLeft from "@/app/(customer)/_components/header/headerLeft";
import HeaderRight from "@/app/(customer)/_components/header/headerRight";

// import type { User } from '@supabase/supabase-js';

const Header = () => {
  return (
    <header className="bg-background text-primary px-8 py-8.5 lg:py-1 border-b-2 fixed w-full z-99">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* 左邊區域 */}
        <HeaderLeft />
        {/* 中間區域 */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <Sprout size={32} />
          <span className="text-sm font-bold text-primary mt-1">
            GREEN CITY
          </span>
        </Link>
        {/* 右邊區域 */}
        <HeaderRight />
      </div>
    </header>
  );
};

export default Header;
