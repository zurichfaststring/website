"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages: Record<Locale, { name: string; flag: string }> = {
  fr: { name: "Français", flag: "🇫🇷" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  en: { name: "English", flag: "🇬🇧" },
};

export default function LanguageSwitcher() {
  const currentLang = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (locale: Locale) => {
    // Same page, different locale prefix (e.g. /booking -> /de/booking).
    router.replace(pathname, { locale });
  };

  const current = languages[currentLang];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2" aria-label="Language">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{current.flag} {current.name}</span>
          <span className="sm:hidden">{current.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className={currentLang === code ? "bg-brand-pale font-semibold" : ""}
          >
            <span className="mr-2">{languages[code].flag}</span>
            {languages[code].name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
