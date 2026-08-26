"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import StatsRow from "@/components/hero/StatsRow";
import { useLang } from "@/i18n/LangContext";

const CardScene = dynamic(() => import("@/components/hero/CardScene"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[1.586/1] w-full max-w-md animate-pulse rounded-[2rem] bg-bg-elevated" />
  ),
});

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
        style={{
          background:
            "radial-gradient(60% 60% at 78% 20%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-8 pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-24">
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-bg-panel px-3.5 py-1.5 text-xs text-text-soft lg:mx-0"
          >
            <span className="pulse-dot size-1.5 rounded-full bg-mint" />
            {t.hero.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] text-text sm:text-5xl lg:text-[3.4rem]"
          >
            {t.hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-5 max-w-lg text-balance text-lg text-text-soft lg:mx-0"
          >
            {t.hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link
              href="#waitlist"
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              {t.hero.joinWaitlist}
            </Link>
            <Link
              href="#preview"
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-6 py-3.5 text-sm text-text transition-colors hover:border-text-soft sm:w-auto"
            >
              {t.hero.viewApp}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto h-[300px] w-full max-w-md sm:h-[360px] lg:h-[420px]"
        >
          <CardScene />
        </motion.div>
      </div>

      <div className="relative border-t border-border-soft py-10">
        <StatsRow />
      </div>
    </section>
  );
}
