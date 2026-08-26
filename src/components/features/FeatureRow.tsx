"use client";

import { motion } from "framer-motion";
import FeatureVisual from "@/components/features/FeatureVisual";
import { useLang } from "@/i18n/LangContext";
import type { features } from "@/data/features";

type Feature = (typeof features)[number];

export default function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const { lang } = useLang();
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 items-center gap-8 border-t border-border-soft py-14 first:border-0 md:grid-cols-2 md:gap-16 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        <span className="relative flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 via-accent/10 to-mint/15 text-accent shadow-[0_8px_20px_-10px_var(--color-accent)] ring-1 ring-inset ring-accent/25">
          <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
          <feature.icon className="relative size-5.5" />
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-accent">{feature.eyebrow[lang]}</p>
        <h3 className="mt-2 text-balance font-display text-2xl font-semibold text-text sm:text-3xl">
          {feature.title[lang]}
        </h3>
        <p className="mt-3 max-w-md text-text-soft">{feature.description[lang]}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="panel overflow-hidden rounded-2xl border border-border"
      >
        <FeatureVisual kind={feature.visual} />
      </motion.div>
    </motion.div>
  );
}
