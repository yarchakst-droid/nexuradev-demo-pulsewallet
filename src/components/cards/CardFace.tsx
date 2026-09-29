"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { LogoMark } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { CardTier } from "@/data/cards";

function Contactless({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 32" className="size-5" fill="none">
      <g stroke={color} strokeOpacity={0.6} strokeWidth={2} strokeLinecap="round">
        <path d="M11 8a11 11 0 0 1 0 16" />
        <path d="M15 4a16.5 16.5 0 0 1 0 24" />
        <path d="M19 1a20.5 20.5 0 0 1 0 30" />
      </g>
    </svg>
  );
}

export default function CardFace({ tier }: { tier: CardTier }) {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 200, damping: 20 });
  const springY = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const sheenX = useTransform(springX, [0, 1], ["10%", "90%"]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, backgroundColor: tier.bg, color: tier.fg }}
      className="relative flex aspect-[1.586/1] w-full flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 shadow-[0_30px_60px_-30px_rgba(15,16,20,0.35)]"
    >
      <motion.div
        aria-hidden
        style={{ left: sheenX as MotionValue<string> }}
        className="pointer-events-none absolute top-0 h-full w-1/3 -translate-x-1/2 bg-white/5 blur-2xl"
      />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <LogoMark className="size-4" />
          PulseWallet
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
          style={{ backgroundColor: `color-mix(in srgb, ${tier.fg} 12%, transparent)` }}
        >
          {tier.name[lang]}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="h-[26px] w-9 rounded-[6px]" style={{ backgroundColor: tier.chip }} />
        <Contactless color={tier.fg} />
      </div>

      <div>
        <p className="font-mono text-lg tracking-wider">•••• •••• •••• {tier.last4}</p>
        <div className="mt-3 flex items-end justify-between">
          <p className="text-xs font-medium tracking-wide opacity-70">{tier.holder}</p>
          <div className="flex">
            <span className="size-4 rounded-full" style={{ backgroundColor: "var(--color-mint)", opacity: 0.85 }} />
            <span className="-ml-1.5 size-4 rounded-full" style={{ backgroundColor: "var(--color-pink)", opacity: 0.85 }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
