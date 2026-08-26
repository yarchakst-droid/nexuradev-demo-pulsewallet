"use client";

import AudienceCard from "@/components/audience/AudienceCard";
import { audience } from "@/data/audience";
import { useLang } from "@/i18n/LangContext";

export default function AudienceSection() {
  const { t } = useLang();

  return (
    <section id="audience" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">{t.audience.eyebrow}</p>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-text sm:text-4xl">
          {t.audience.heading}
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {audience.map((persona, i) => (
          <AudienceCard key={persona.id} persona={persona} index={i} />
        ))}
      </div>
    </section>
  );
}
