"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle"; 
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center w-full">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Ponraj Thuvarakan</span>
          </Link>
          <nav className="ml-auto flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="ml-8 mx-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}