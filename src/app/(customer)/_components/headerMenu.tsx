import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuGroups = [
    {
      id: "general",
      items: [
        { text: "All Products", href: "/products", shortcut: "⌘A" },
        { text: "New Arrivals", href: "/products/new", shortcut: "⌘N" },
      ],
    },
    {
      id: "sale",
      items: [{ text: "On Sale", href: "/products/sale", shortcut: "⌘S" }],
    },
  ];

  return (
    <Menubar onValueChange={(value) => setIsMenuOpen(!!value)}>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MenubarTrigger>
        <MenubarContent sideOffset={36}>
          {menuGroups.map((group, idx) => (
            <React.Fragment key={group.id}>
              {idx !== 0 && <MenubarSeparator />}
              {group.items.map((item) => (
                <MenubarItem key={item.href}>
                  <Link href={item.href}>{item.text}</Link>
                  {item.shortcut && (
                    <MenubarShortcut>{item.shortcut}</MenubarShortcut>
                  )}
                </MenubarItem>
              ))}
            </React.Fragment>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
