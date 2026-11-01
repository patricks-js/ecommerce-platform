"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { CreditCard, Heart, MapPin, Package, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    title: "Personal Information",
    href: "/account/profile",
    icon: User,
  },
  {
    title: "My Orders",
    href: "/orders",
    icon: Package,
  },
  {
    title: "My Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    title: "Manage Address",
    href: "/account/address",
    icon: MapPin,
  },
  {
    title: "Saved Cards",
    href: "/account/payment",
    icon: CreditCard,
  },
];

export function ProfileSidebarNav() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav>
      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Button
              variant="ghost"
              size="lg"
              asChild
              className={cn(
                "rounded-none w-full justify-start py-8",
                pathname === link.href && "bg-accent text-accent-foreground",
              )}
            >
              <Link href={link.href}>
                <link.icon className="size-5" />
                {link.title}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
