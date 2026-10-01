"use client";

import { motion } from "framer-motion";
import CardFace from "@/components/cards/CardFace";
import { cardTiers } from "@/data/cards";
import { useLang } from "@/i18n/LangContext";

export default function CardShowcaseSection() {
  const { t } = useLang();

  return (
    <section id="cards" className="scroll-mt-16 border-t border-border-soft py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">{t.cards.eyebrow}</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-text sm:text-4xl">
            {t.cards.heading}
          </h2>
          <p className="mt-3 max-w-md text-text-soft">{t.cards.subhead}</p>
        </div>
      </div>

      <div className="scrollbar-hidden mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:px-[max(1.5rem,calc((100vw-72rem)/2))]">
        {cardTiers.map((tier, i) => (
          <motion.div
            key={tier.id}
            data-card
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="w-[280px] shrink-0 snap-center sm:w-[320px]"
          >
            <CardFace tier={tier} />
          </motion.div>
        ))}
        <div className="w-px shrink-0" aria-hidden />
      </div>
    </section>
  );
}
