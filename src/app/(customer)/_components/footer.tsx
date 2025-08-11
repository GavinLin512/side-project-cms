"use client";

import { Sprout, ChevronUp } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary text-white/90 rounded-t-4xl mt-20">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* --- 手機版 --- */}
          <div className="md:hidden col-span-1 grid grid-cols-2 gap-8">
            {/* 左邊欄位 */}
            <div className="space-y-8">
              <div>
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Sprout size={32} />
                  <span className="font-bold text-xl">GREEN CITY</span>
                </Link>
                <p className="text-sm">
                  Eco-friendly place, where sustainability meets style!
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Menu</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/catalog" className="hover:underline">Catalog</Link></li>
                  <li><Link href="/about" className="hover:underline">About us</Link></li>
                  <li><Link href="/contacts" className="hover:underline">Contacts</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contacts</h3>
                <ul className="space-y-2 text-sm">
                  <li>Phone: +38057 000 00 00</li>
                  <li>Email: green_city@gmail.com</li>
                </ul>
              </div>
            </div>

            {/* 右邊欄位 */}
            <div className="flex flex-col justify-between">
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-4">Social media</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
                    <li><a href="/" target="_blank" rel="noopener noreferrer" className="hover:underline">Telegram</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Catalog</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/products/organic-cosmetic" className="hover:underline">Organic cosmetic</Link></li>
                    <li><Link href="/products/hygiene" className="hover:underline">Hygiene products</Link></li>
                    <li><Link href="/products/eco-dishes" className="hover:underline">Eco dishes</Link></li>
                    <li><Link href="/products/shoppers" className="hover:underline">Shoppers</Link></li>
                    <li><Link href="/products/gift-sets" className="hover:underline">Gift sets</Link></li>
                  </ul>
                </div>
              </div>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-[#D4A373] p-2 rounded-md mt-4 hover:bg-opacity-80 transition-colors self-end"
                aria-label="Scroll to top"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>

          {/* --- 電腦版 --- */}
          <div className="hidden md:contents">
            {/* 第一欄位：Logo和口號 */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Sprout size={32} />
                <span className="font-bold text-xl">GREEN CITY</span>
              </Link>
              <p className="text-sm">
                Eco-friendly place, where sustainability meets style!
              </p>
            </div>

            {/* 第二欄位：選單 */}
            <div>
              <h3 className="font-semibold mb-4">Menu</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/catalog" className="hover:underline">Catalog</Link></li>
                <li><Link href="/about" className="hover:underline">About us</Link></li>
                <li><Link href="/contacts" className="hover:underline">Contacts</Link></li>
              </ul>
            </div>

            {/* 第三欄位：商品分類 */}
            <div>
              <h3 className="font-semibold mb-4">Catalog</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products/organic-cosmetic" className="hover:underline">Organic cosmetic</Link></li>
                <li><Link href="/products/hygiene" className="hover:underline">Hygiene products</Link></li>
                <li><Link href="/products/eco-dishes" className="hover:underline">Eco dishes</Link></li>
                <li><Link href="/products/shoppers" className="hover:underline">Shoppers</Link></li>
                <li><Link href="/products/gift-sets" className="hover:underline">Gift sets</Link></li>
              </ul>
            </div>

            {/* 第四欄位：聯絡方式 */}
            <div>
              <h3 className="font-semibold mb-4">Contacts</h3>
              <ul className="space-y-2 text-sm">
                <li>Phone: +38057 000 00 00</li>
                <li>Email: green_city@gmail.com</li>
              </ul>
            </div>

            {/* 第五欄位：社交媒體和滾動到頂部按鈕 */}
            <div className="flex flex-col justify-between items-start md:items-end">
              <div>
                <h3 className="font-semibold mb-4">Social media</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
                  <li><a href="/" target="_blank" rel="noopener noreferrer" className="hover:underline">Telegram</a></li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-secondary p-2 rounded-md mt-4 hover:bg-opacity-80 transition-colors cursor-pointer"
                aria-label="Scroll to top"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </div>

        <hr className="border-white/20 my-8" />

        <div className="flex flex-col md:flex-row justify-between text-xs text-white/60">
          <p>© {new Date().getFullYear()} created by Zhanna Vasylieva. All rights reserved.</p>
          <p>*Pictures were taken from freepik.com for personal purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
