"use client";

import CountUpOnView from "@/components/hero/CountUpOnView";
import { useLang } from "@/i18n/LangContext";

export default function StatsRow() {
  const { t } = useLang();

  const STATS = [
    { value: 2, suffix: t.stats.minutesSuffix, label: t.stats.accountMinutes },
    { value: 12400, suffix: "+", label: t.stats.onWaitlist },
    { value: 0, suffix: "%", label: t.stats.hiddenFees },
    { value: 42, suffix: "", label: t.stats.currencies },
  ];

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
      {STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="font-mono text-3xl font-medium text-text sm:text-4xl">
            <CountUpOnView value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="mt-1.5 text-xs text-text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
