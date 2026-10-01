"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LangContext";
import { scrollToHash } from "@/lib/hashLink";

const CardScenePlaceholder = () => (
  <div className="aspect-[1.586/1] w-full max-w-md animate-pulse rounded-[2rem] bg-bg-elevated" />
);

const CardScene = dynamic(() => import("@/components/hero/CardScene"), {
  ssr: false,
  loading: CardScenePlaceholder,
});

export default function Hero() {
  const { t } = useLang();
  // Fetching + parsing + first-compiling the hero's three.js bundle is a
  // single ~700ms-under-throttling main-thread task — right when a new
  // visitor is most likely to scroll for the first time. Hold off starting
  // it until the browser reports it has spare idle time, so it doesn't
  // compete with that first scroll input.
  const [mountScene, setMountScene] = useState(false);
  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => setTimeout(() => cb({} as IdleDeadline), 400));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = ric(() => setMountScene(true), { timeout: 1500 } as IdleRequestOptions);
    return () => cancel(id as number);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-[0.08]"
        style={{
          background:
            "linear-gradient(120deg, var(--color-mint) 0%, var(--color-sky) 45%, var(--color-pink) 100%)",
          maskImage: "radial-gradient(60% 60% at 70% 25%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(60% 60% at 70% 25%, black, transparent 75%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:pt-20">
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance font-display text-5xl font-bold leading-[0.98] tracking-tight text-text sm:text-6xl lg:text-[4rem]"
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
              onClick={scrollToHash("waitlist")}
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              {t.hero.joinWaitlist}
            </Link>
            <Link
              href="#preview"
              onClick={scrollToHash("preview")}
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-text transition-colors hover:border-text-soft sm:w-auto"
            >
              {t.hero.viewApp}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto h-[340px] w-full max-w-lg sm:h-[420px] lg:h-[480px]"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: "linear-gradient(135deg, var(--color-mint), var(--color-sky))" }}
          />
          {mountScene ? <CardScene /> : <CardScenePlaceholder />}
          <div className="pointer-events-none absolute inset-x-10 bottom-2 h-8 rounded-full bg-text/10 blur-xl" />
        </motion.div>
      </div>
    </section>
  );
}
