"use client";

import { motion } from "framer-motion";
import FeatureVisual from "@/components/features/FeatureVisual";
import { useLang } from "@/i18n/LangContext";
import type { features } from "@/data/features";

type Feature = (typeof features)[number];

const FEATURE_ICON_COLORS = [
  "var(--color-mint)",
  "var(--color-pink)",
  "var(--color-sky)",
  "var(--color-gold)",
  "#ffffff",
];

// Each card is `sticky` at an offset that increases with `index`, so as the
// page scrolls, card N reaches its resting position a little lower than
// card N-1 and (thanks to the higher z-index) slides down over it instead
// of the page just scrolling both out of view - the "stacked steps" effect.
// This is pure CSS: a sticky element keeps its own flow height, so the next
// card only catches up to cover the previous one once roughly a card's
// worth of scrolling has happened, no extra spacer wrapper needed.
export default function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const { lang } = useLang();
  const accent = FEATURE_ICON_COLORS[index % FEATURE_ICON_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ top: `${88 + index * 18}px`, zIndex: index + 1 }}
      className="sticky mb-6"
    >
      <div
        style={{ backgroundColor: `color-mix(in srgb, ${accent} 5%, var(--color-bg))` }}
        className="grid grid-cols-1 items-center gap-8 rounded-[1.75rem] border border-border p-7 shadow-[0_30px_60px_-30px_rgba(15,16,20,0.22)] sm:p-10 md:grid-cols-2 md:gap-12"
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-text text-bg" style={{ color: accent }}>
              <feature.icon className="size-5.5" />
            </span>
            <span className="font-mono text-sm text-text-muted">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-text-muted">{feature.eyebrow[lang]}</p>
          <h3 className="mt-2 text-balance font-display text-2xl font-semibold text-text sm:text-3xl">
            {feature.title[lang]}
          </h3>
          <p className="mt-3 max-w-md text-text-soft">{feature.description[lang]}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-bg">
          <FeatureVisual kind={feature.visual} />
        </div>
      </div>
    </motion.div>
  );
}
