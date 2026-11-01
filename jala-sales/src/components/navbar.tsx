import Link from "next/link";
import { AccountPopover } from "./account-popover";
import { CartPopover } from "./cart-popover";
import { DynamicSearchBar } from "./dynamic-search-bar";
import { Icons } from "./icons";
import { NavigationMenu } from "./navigation-menu";

export function Navbar() {
  return (
    <header className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="size-8" />
          <h3 className="text-xl font-bold font-mono tracking-tighter">
            JSales
          </h3>
        </Link>
        <NavigationMenu />
        <div className="flex items-center gap-2">
          <DynamicSearchBar />
          <CartPopover />
          <AccountPopover />
        </div>
      </div>
    </header>
  );
}
