"use client";

import Link from "next/link";
import { LogoMark } from "@/components/shared/icons";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useLang } from "@/i18n/LangContext";

export default function Nav() {
  const { t } = useLang();

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-text">
          <LogoMark className="size-5 text-accent" />
          PulseWallet
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-text-soft sm:flex">
          <Link href="#features" className="transition-colors hover:text-text">
            {t.nav.features}
          </Link>
          <Link href="#preview" className="transition-colors hover:text-text">
            {t.nav.preview}
          </Link>
          <Link href="#audience" className="transition-colors hover:text-text">
            {t.nav.audience}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="#waitlist"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {t.nav.join}
          </Link>
        </div>
      </div>
    </header>
  );
}
