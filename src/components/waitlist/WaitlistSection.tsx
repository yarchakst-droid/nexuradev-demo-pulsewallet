"use client";

import WaitlistForm from "@/components/waitlist/WaitlistForm";
import { useLang } from "@/i18n/LangContext";

export default function WaitlistSection() {
  const { t } = useLang();

  return (
    <section id="waitlist" className="mx-auto max-w-4xl scroll-mt-16 px-6 py-24">
      <div className="panel flex flex-col items-center gap-6 rounded-3xl border border-border px-6 py-16 text-center sm:px-16">
        <span className="rounded-full border border-border bg-bg-panel px-3 py-1 text-xs text-text-soft">
          {t.waitlist.badge}
        </span>
        <h2 className="text-balance font-display text-3xl font-semibold text-text sm:text-4xl">{t.waitlist.heading}</h2>
        <p className="max-w-md text-text-soft">{t.waitlist.subhead}</p>
        <WaitlistForm />
      </div>
    </section>
  );
}
