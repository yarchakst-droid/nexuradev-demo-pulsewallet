"use client";

import FeatureRow from "@/components/features/FeatureRow";
import { features } from "@/data/features";
import { useLang } from "@/i18n/LangContext";

export default function FeaturesSection() {
  const { t } = useLang();

  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">{t.features.eyebrow}</p>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-text sm:text-4xl">
          {t.features.heading}
        </h2>
      </div>

      <div className="mt-4">
        {features.map((feature, i) => (
          <FeatureRow key={feature.visual} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
