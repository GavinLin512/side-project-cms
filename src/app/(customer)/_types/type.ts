import type { ReactNode } from "react";

interface HeaderNavigationMenuProps {
  menuText: string;
  menuLinks: HeaderNavigationMenuLinkProps[];
}

interface HeaderNavigationMenuLinkProps {
  text: string;
  href: string;
  description: string;
}

interface HeaderMenuItemsProps {
  text: string;
  href: string;
}

interface HeroCardProps {
  icon: ReactNode;
  description: string;
}

type SectionContainerProps = {
  children: ReactNode;
};

interface productItemsProps {
  id: number;
  image: string;
  name: string;
  price: number;
  discount?: number;
}


export type {
  HeaderMenuItemsProps,
  HeroCardProps,
  HeaderNavigationMenuProps,
  HeaderNavigationMenuLinkProps,
  SectionContainerProps,
  productItemsProps,
};


