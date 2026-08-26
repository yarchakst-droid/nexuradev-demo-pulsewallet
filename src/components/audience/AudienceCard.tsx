"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { AudiencePersona } from "@/data/audience";

export default function AudienceCard({ persona, index }: { persona: AudiencePersona; index: number }) {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="panel overflow-hidden rounded-2xl border border-border"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image src={persona.photo} alt={persona.title[lang]} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-text backdrop-blur-sm">
          {persona.tag[lang]}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-balance font-display text-xl font-semibold text-text">{persona.title[lang]}</h3>
        <p className="mt-2 text-sm text-text-soft">{persona.description[lang]}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {persona.points.map((point) => (
            <li key={point.uk} className="flex items-start gap-2.5 text-sm text-text-soft">
              <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-accent" />
              {point[lang]}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
