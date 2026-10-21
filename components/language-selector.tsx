"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/language";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label={t("Language")}
          className="h-9 gap-1.5 rounded-full border-primary/20 bg-background/70 px-2 shadow-sm backdrop-blur transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md sm:gap-2 sm:px-3"
        >
          <Languages className="h-4 w-4 text-primary" />
          <span className="font-semibold tracking-wide">
            <span className="md:hidden">{language.toUpperCase()}</span>
            <span className="hidden md:inline">
              {language === "en" ? "English" : "Deutsch"}
            </span>
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuLabel>{t("Select language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(["en", "de"] as const).map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={() => setLanguage(option)}
            className="cursor-pointer gap-2"
            aria-current={language === option ? "true" : undefined}
          >
            <span className="flex-1">{option === "en" ? "English" : "Deutsch"}</span>
            {language === option && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
