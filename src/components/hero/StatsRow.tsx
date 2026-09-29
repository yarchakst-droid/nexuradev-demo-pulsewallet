"use client";

import CountUpOnView from "@/components/hero/CountUpOnView";
import { useLang } from "@/i18n/LangContext";

export default function StatsRow() {
  const { t } = useLang();

  const STATS = [
    { value: 2, suffix: t.stats.minutesSuffix, label: t.stats.accountMinutes, color: "var(--color-mint)" },
    { value: 12400, suffix: "+", label: t.stats.onWaitlist, color: "var(--color-pink)" },
    { value: 0, suffix: "%", label: t.stats.hiddenFees, color: "var(--color-sky)" },
    { value: 42, suffix: "", label: t.stats.currencies, color: "#ffffff" },
  ];

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl bg-text px-4 py-5 transition-transform duration-300 ease-out hover:-translate-y-1 sm:px-5 sm:py-6"
        >
          <p className="font-mono text-2xl font-medium sm:text-3xl" style={{ color: stat.color }}>
            <CountUpOnView value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="mt-2 text-xs text-bg/55">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
