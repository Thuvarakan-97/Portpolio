"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle"; 
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language";
import { LanguageSelector } from "@/components/language-selector";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { key: "About", href: "#about" },
  { key: "Projects", href: "#projects" },
  { key: "Experience", href: "#experience" },
  { key: "Education", href: "#education" },
  { key: "Testimonials", href: "#testimonials" },
  { key: "Blog", href: "#blog" },
  { key: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navigation.map(item => item.href.replace('#', ''));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl shadow-lg' 
          : 'bg-background/60 backdrop-blur-sm'
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-2 px-3 sm:px-4 md:px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary group-hover:rotate-180 transition-transform duration-500" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ponraj Thuvarakan
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={`relative px-3 py-2 rounded-md transition-all duration-300 hover:text-primary ${
                activeSection === item.href 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              {t(item.key)}
              {activeSection === item.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          <ThemeToggle />
          <Button asChild size="sm" variant="outline" className="border-2 shadow-md hover:shadow-lg transition-all duration-300">
            <Link href="/project-request">
              {t("Start Project")}
            </Link>
          </Button>
          <Button asChild size="sm" className="shadow-md hover:shadow-lg transition-all duration-300">
            <Link href="#contact">
              {t("Get in Touch")}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:hidden">
          <LanguageSelector />
          <ThemeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t("Toggle menu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,400px)]">
              <SheetHeader>
                <SheetTitle className="text-center">
                  <span className="gradient-text">{t("Navigation")}</span>
                </SheetTitle>
                <SheetDescription className="text-center">
                  {t("Explore my portfolio sections")}
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-1 mt-6">
                {navigation.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`group relative flex items-center justify-center px-4 py-3 rounded-lg text-center transition-all duration-300 ${
                      activeSection === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-base font-medium">{t(item.key)}</span>
                    {activeSection === item.href && (
                      <Sparkles className="absolute right-4 h-4 w-4 animate-pulse" />
                    )}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href="/project-request">
                    {t("Start a Project")}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-2" size="lg">
                  <Link 
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#contact');
                    }}
                  >
                    {t("Get in Touch")}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}