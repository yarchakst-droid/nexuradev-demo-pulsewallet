"use client";

import Link from "next/link";
import { LogoMark } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="theme-invert border-t border-border-soft bg-bg text-text">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-12 px-6 py-16 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-text">
            <LogoMark className="size-5" />
            PulseWallet
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-soft">{t.footer.tagline}</p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-text-muted">{t.footer.disclaimer}</p>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{t.footer.colProduct}</p>
          <Link href="#features" className="nav-link w-fit">
            {t.nav.features}
          </Link>
          <Link href="#cards" className="nav-link w-fit">
            {t.nav.cards}
          </Link>
          <Link href="#preview" className="nav-link w-fit">
            {t.nav.preview}
          </Link>
          <Link href="#audience" className="nav-link w-fit">
            {t.nav.audience}
          </Link>
        </nav>

        <nav className="flex flex-col gap-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{t.footer.colJoin}</p>
          <Link href="#waitlist" className="nav-link w-fit">
            {t.footer.waitlist}
          </Link>
        </nav>

        <nav className="flex flex-col gap-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{t.footer.colProject}</p>
          <a href="https://nexuradev.com" target="_blank" rel="noreferrer" className="nav-link w-fit">
            NexuraDev.com
          </a>
          <a
            href="https://nexuradev.com/work/pulsewallet"
            target="_blank"
            rel="noreferrer"
            className="nav-link w-fit"
          >
            {t.footer.linkCase}
          </a>
        </nav>
      </div>

      <div className="border-t border-border-soft">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-text-muted">© {new Date().getFullYear()} PulseWallet</div>
      </div>
    </footer>
  );
}
