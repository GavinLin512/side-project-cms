"use client";

import { ChevronUp } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[#7A8760] text-white py-12 px-4 md:px-8 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold">GREEN CITY</span>
            </div>
            <p className="text-sm opacity-90 max-w-xs leading-relaxed">
              Eco-friendly place,
              <br />
              where sustainability
              <br />
              meets style!
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-[#E8E8E8]">
              Menu
            </h3>
            <nav className="flex flex-col gap-2 text-sm opacity-90">
              <Link
                href="/catalog"
                className="hover:text-[#C49A46] transition-colors"
              >
                Catalog
              </Link>
              <Link
                href="/about"
                className="hover:text-[#C49A46] transition-colors"
              >
                About us
              </Link>
              <Link
                href="/contacts"
                className="hover:text-[#C49A46] transition-colors"
              >
                Contacts
              </Link>
            </nav>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-[#E8E8E8]">
              Catalog
            </h3>
            <nav className="flex flex-col gap-2 text-sm opacity-90">
              <Link
                href="/catalog?category=cosmetic"
                className="hover:text-[#C49A46] transition-colors"
              >
                Organic cosmetic
              </Link>
              <Link
                href="/catalog?category=hygiene"
                className="hover:text-[#C49A46] transition-colors"
              >
                Hygiene products
              </Link>
              <Link
                href="/catalog?category=dishes"
                className="hover:text-[#C49A46] transition-colors"
              >
                Eco dishes
              </Link>
              <Link
                href="/catalog?category=shoppers"
                className="hover:text-[#C49A46] transition-colors"
              >
                Shoppers
              </Link>
              <Link
                href="/catalog?category=gifts"
                className="hover:text-[#C49A46] transition-colors"
              >
                Gift sets
              </Link>
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-[#E8E8E8]">
              Contacts
            </h3>
            <div className="flex flex-col gap-2 text-sm opacity-90 mb-6">
              <p>Phone: +38057 000 00 00</p>
              <p>Email: green_city@gmail.com</p>
            </div>

            <h3 className="font-serif text-lg font-bold mb-4 text-[#E8E8E8]">
              Social media
            </h3>
            <div className="flex flex-col gap-2 text-sm opacity-90">
              <Link
                href="#"
                className="hover:text-[#C49A46] transition-colors flex items-center gap-2"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="hover:text-[#C49A46] transition-colors flex items-center gap-2"
              >
                Telegram
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-4 text-xs opacity-70 relative">
          <div className="flex flex-col gap-1">
            <p>© 2024 created by Zhanna Vasylieva. All rights reserved.</p>
            <p>
              *Pictures were taken from freepik.com for educational purposes.
            </p>
          </div>

          <button
            type="button"
            className="p-2 bg-[#C49A46] rounded-md hover:bg-[#B0893C] transition-colors text-white"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
