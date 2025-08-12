import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import type { HeaderNavigationMenuProps } from '@/customer/_types/type'
import Link from 'next/link';


export function HeaderNavigationMenu(props: HeaderNavigationMenuProps) {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='py-12 px-6 text-lg'>{props.menuText??''}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4 rounded-none">
              <li>
                {props.menuLinks.map((link, index) => {
                  return (
                    <NavigationMenuLink key={index} asChild>
                      <Link href={link.href}>
                        <div className="font-medium">{link.text??''}</div>
                        <div className="text-muted-foreground">
                          {link.description??''}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  )
                })}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
