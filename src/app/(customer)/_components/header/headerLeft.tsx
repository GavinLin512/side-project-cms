import HeaderMenu from "@/customer/_components/headerMenu";
import { HeaderNavigationMenu } from "@/customer/_components/headerNavigationMenu";
import type {
  HeaderNavigationMenuLinkProps,
  HeaderNavigationMenuProps,
} from "@/customer/_types/type";

// Menu
const menuLinks: HeaderNavigationMenuLinkProps[] = [
  {
    text: "All Products",
    href: "/products",
    description: "Browse all products",
  },
  {
    text: "New Arrivals",
    href: "/products/new",
    description: "Discover new arrivals",
  },
  {
    text: "On Sale",
    href: "/products/sale",
    description: "Explore on sale products",
  },
];

const menuProps: HeaderNavigationMenuProps = {
  menuText: "Catalog",
  menuLinks: menuLinks,
};

export default function HeaderLeft() {
  return (
    <div className="flex items-center space-x-6">
      <div className="text-primary">
        <HeaderMenu />
      </div>
      <nav>
        <HeaderNavigationMenu {...menuProps} />
      </nav>
      <div className="hidden lg:block text-md xl:text-lg font-semibold text-primary">
        +38057 000 00 00
      </div>
    </div>
  );
}
