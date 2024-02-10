/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YZMZGjDE7Rl
 */


import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Logo from "@/components/custom/Logo";
import LoggedIn from "./LoggedIn";

export function TopNav() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md dark:bg-gray-800">
      <Logo />
      <div className="flex items-center gap-4">
        {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
        <LoggedIn>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </LoggedIn>
      </div>
    </div>
  );
}
