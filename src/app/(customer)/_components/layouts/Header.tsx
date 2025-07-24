"use client"

import Link from 'next/link';
import { ShoppingCart, Heart, Search, User, Sprout } from 'lucide-react';
import type { HeaderNavigationMenuLinkProps, HeaderNavigationMenuProps } from '../../_types/type';
import { HeaderNavigationMenu } from '@/customer/_components/headerNavigationMenu';
import HeaderMenu from '@/customer/_components/headerMenu';

const Header = () => {
  // Menu
  const menuLinks: HeaderNavigationMenuLinkProps[] = [
    { text: "All Products", href: "/products", description: "Browse all products" },
    { text: "New Arrivals", href: "/products/new", description: "Discover new arrivals" },
    { text: "On Sale", href: "/products/sale", description: "Explore on sale products" },
  ];

  const menuProps: HeaderNavigationMenuProps = {
    menuText: 'Catalog',
    menuLinks: menuLinks
  };

  return (
    <header className="bg-background text-primary px-8 py-1 border-b-2 fixed w-full">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <div className="text-primary">
            <HeaderMenu />
          </div>
          <nav>
            <HeaderNavigationMenu {...menuProps} />
          </nav>
          <div className="text-lg font-semibold text-primary">+38057 000 00 00</div>
        </div>

        {/* Center Section - Absolutely Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <Sprout size={32} />
          <span className="text-sm font-bold text-primary mt-1">GREEN CITY</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <Link href="/search" className="flex items-center space-x-1 hover:text-secondary">
            <Search size={20} />
            <span>Search</span>
          </Link>
          <Link href="/account" className="flex items-center space-x-1 hover:text-secondary">
            <User size={20} />
            <span>Account</span>
          </Link>
          <Link href="/wishlist" className="flex items-center space-x-1 hover:text-secondary">
            <Heart size={20} />
            <span>Wishlist</span>
          </Link>
          <Link href="/cart" className="flex items-center space-x-1 hover:text-secondary">
            <ShoppingCart size={20} />
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
