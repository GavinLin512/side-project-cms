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


export type {
  HeaderMenuItemsProps,
  HeroCardProps,
  HeaderNavigationMenuProps,
  HeaderNavigationMenuLinkProps,
  SectionContainerProps,
};


