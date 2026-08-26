"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LangContext";

export default function AppPreviewSection() {
  const { t } = useLang();
  const bullets = [t.preview.bullet1, t.preview.bullet2, t.preview.bullet3];

  return (
    <section id="preview" className="scroll-mt-16 border-t border-border-soft bg-bg-panel/40 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{t.preview.eyebrow}</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-text sm:text-4xl">
            {t.preview.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text-soft lg:mx-0">{t.preview.subhead}</p>
          <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2.5 text-left lg:mx-0">
            {bullets.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-text-soft">
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[320px]"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 scale-90 blur-[90px]"
            style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 40%, transparent), transparent 70%)" }}
          />
          <Image
            src="/images/phone-preview.jpg"
            alt={t.preview.heading}
            width={880}
            height={1213}
            className="w-full rounded-[2.5rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.65)]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
