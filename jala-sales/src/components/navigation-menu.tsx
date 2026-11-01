import { cn } from "@/lib/cn";
import type { Children } from "@/types/children";
import Link from "next/link";
import React from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenu as ReactNavigationMenu,
} from "./ui/navigation-menu";

const categories: { title: string; href: string; description: string }[] = [
  {
    title: "Smartphones",
    href: "/catalog?category=smartphones",
    description: "Android, iPhone, Xiaomi, Mobile accessories",
  },
  {
    title: "Computers",
    href: "/catalog?category=computers",
    description: "Notebooks, Desktops, Accessories (keyboards, mice, etc.)",
  },
  {
    title: "Tablets and E-book readers",
    href: "/catalog?category=tablets",
    description: "Tablets, E-book readers and other tablet accessories",
  },
  {
    title: "TV and Video",
    href: "/catalog?category=tv",
    description: "TVs, Projectors, TV accessories",
  },
  {
    title: "Audio and Headphones",
    href: "/catalog?category=audio",
    description: "Headphones, Speakers, Audio accessories",
  },
  {
    title: "Gaming",
    href: "/catalog?category=gaming",
    description: "Consoles, Games, Game accessories",
  },
  {
    title: "Wearables",
    href: "/catalog?category=wearables",
    description: "Smartwatches, Wearable accessories",
  },
];

export function NavigationMenu() {
  return (
    <ReactNavigationMenu>
      <NavigationMenuList>
        <MenuLink href="/products">Products</MenuLink>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {categories.map((category) => (
                <ListItem
                  key={category.title}
                  title={category.title}
                  href={category.href}
                >
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Brands</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-3 gap-3 p-6 md:w-[300px] lg:w-[400px]">
              <li>
                <MenuLink href="/catalog?brand=Samsung">Samsung</MenuLink>
              </li>
              <li>
                <MenuLink href="/catalog?brand=Apple">Apple</MenuLink>
              </li>
              <li>
                <MenuLink href="/catalog?brand=Sony">Sony</MenuLink>
              </li>
              <li>
                <MenuLink href="/catalog?brand=Xiaomi">Xiaomi</MenuLink>
              </li>
              <li>
                <MenuLink href="/catalog?brand=LG">LG</MenuLink>
              </li>
              <li>
                <MenuLink href="/catalog?brand=Motorola">Motorola</MenuLink>
              </li>
              <li>
                <MenuLink href="/catalog?brand=Edifier">Edifier</MenuLink>
              </li>
              <li>
                <MenuLink href="/catalog?brand=BassOne">BassOne</MenuLink>
              </li>
              <li>
                <MenuLink href="/catalog?brand=QCY">QCY</MenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Support</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[300px] lg:w-[400px]">
              <ListItem title="Frequently asked questions" href="/faq">
                See our FAQ page for answers to common questions and issues.
              </ListItem>
              <ListItem title="Contact us via chat" href="/contact/chat">
                Contact our support team via chat and get help with any
                questions or issues.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </ReactNavigationMenu>
  );
}

function MenuLink({ href, children }: { href: string } & Children) {
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {children}
      </NavigationMenuLink>
    </Link>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
