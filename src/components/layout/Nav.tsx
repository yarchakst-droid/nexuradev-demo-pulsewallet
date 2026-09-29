"use client";

import Link from "next/link";
import { LogoMark } from "@/components/shared/icons";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useLang } from "@/i18n/LangContext";
import { useActiveSection } from "@/lib/useActiveSection";

const SECTION_IDS = ["features", "cards", "preview", "audience"];

export default function Nav() {
  const { t } = useLang();
  const active = useActiveSection(SECTION_IDS);

  const items: { id: string; label: string }[] = [
    { id: "features", label: t.nav.features },
    { id: "cards", label: t.nav.cards },
    { id: "preview", label: t.nav.preview },
    { id: "audience", label: t.nav.audience },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-text">
          <LogoMark className="size-5 text-accent" />
          <span className="hidden md:inline">PulseWallet</span>
        </Link>

        <nav className="hidden items-center gap-0.5 rounded-full border border-border-soft bg-bg-panel p-1 text-sm md:flex">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={
                active === item.id
                  ? "rounded-full bg-accent px-4 py-2 font-medium text-bg transition-colors"
                  : "rounded-full px-4 py-2 text-text-soft transition-colors hover:text-text"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="#waitlist"
            className="rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {t.nav.join}
          </Link>
        </div>
      </div>
    </header>
  );
}
