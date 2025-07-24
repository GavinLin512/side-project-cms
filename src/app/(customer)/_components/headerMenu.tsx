import React, { useState } from "react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Menu, X } from "lucide-react"
import Link from 'next/link';


export default function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuItems = [
    [
      { text: "All Products", href: "/products", shortcut: "⌘A" },
      { text: "New Arrivals", href: "/products/new", shortcut: "⌘N" },
    ],
    [
      { text: "On Sale", href: "/products/sale", shortcut: "⌘S" },
    ],
  ]
  return (
    <Menubar onValueChange={(value) => setIsMenuOpen(!!value)}>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MenubarTrigger>
        <MenubarContent sideOffset={36}>
          {menuItems.map((items, idx) => {
            return (
              <React.Fragment key={idx}>
                {idx !== 0 ? <MenubarSeparator key={idx} /> : ''}
                {
                  items.map((item, idy) => {
                    return (
                      <MenubarItem key={idy}>
                        <Link href={item.href}>{item.text}</Link>
                        {item.shortcut
                          ?
                          <MenubarShortcut>
                            {item.shortcut}
                          </MenubarShortcut>
                          :
                          ''
                        }
                      </MenubarItem>
                    )
                  })
                }
              </React.Fragment>
            )
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}