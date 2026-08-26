import type { ComponentType } from "react";
import { ArrowRightIcon, BoltIcon, CheckIcon, UserCircleIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { FeatureVisualKind } from "@/data/features";

function Transfer() {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-full border border-border bg-bg-elevated text-text-soft">
          <UserCircleIcon className="size-7" />
        </span>
        <div className="flex flex-col items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-1 text-xs font-medium text-mint">
            <BoltIcon className="size-3" />
            {t.featureVisuals.transferSeconds}
          </span>
          <ArrowRightIcon className="size-6 text-text-muted" />
        </div>
        <span className="flex size-14 items-center justify-center rounded-full border-2 border-accent/50 bg-accent-soft text-accent">
          <UserCircleIcon className="size-7" />
        </span>
      </div>
      <span className="font-mono text-sm font-medium text-mint">+$2,450.00</span>
    </div>
  );
}

function Tax() {
  const { t } = useLang();
  const pct = 68;
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative size-28">
        <svg viewBox="0 0 100 100" className="-rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-border)" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-lg font-semibold text-text">
          {pct}%
        </span>
      </div>
      <p className="text-xs text-text-muted">{t.featureVisuals.taxSetAside}</p>
    </div>
  );
}

function Team() {
  const { t } = useLang();
  const members = [
    { name: "Ірина", limit: `$1,200 ${t.featureVisuals.teamPerMonth}` },
    { name: "Данило", limit: `$800 ${t.featureVisuals.teamPerMonth}` },
    { name: "Марта", limit: `$500 ${t.featureVisuals.teamPerMonth}` },
  ];
  return (
    <div className="flex w-full max-w-[220px] flex-col gap-2">
      {members.map((m) => (
        <div key={m.name} className="flex items-center justify-between rounded-lg border border-border-soft bg-bg-elevated px-3 py-2">
          <span className="flex items-center gap-2 text-sm text-text">
            <span className="flex size-6 items-center justify-center rounded-full bg-accent-soft text-[10px] font-semibold text-accent">
              {m.name[0]}
            </span>
            {m.name}
          </span>
          <span className="font-mono text-xs text-text-muted">{m.limit}</span>
        </div>
      ))}
    </div>
  );
}

function Currency() {
  const currencies = ["USD", "EUR", "GBP", "PLN", "JPY"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-6">
      {currencies.map((c) => (
        <span
          key={c}
          className="rounded-full border border-border bg-bg-elevated px-3 py-1.5 font-mono text-xs text-text-soft"
        >
          {c}
        </span>
      ))}
      <span className="rounded-full bg-accent px-3 py-1.5 font-mono text-xs font-semibold text-white">+37</span>
    </div>
  );
}

function Fees() {
  const { t } = useLang();
  const rows = [
    { label: t.featureVisuals.feeCardMaintenance, value: "$0" },
    { label: t.featureVisuals.feeSms, value: "$0" },
    { label: t.featureVisuals.feeInactivity, value: "$0" },
  ];
  return (
    <div className="w-full max-w-[240px] rounded-xl border border-border-soft bg-bg-elevated p-4">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between py-1.5 text-sm">
          <span className="flex items-center gap-1.5 text-text-soft">
            <CheckIcon className="size-3.5 text-mint" />
            {r.label}
          </span>
          <span className="font-mono text-text">{r.value}</span>
        </div>
      ))}
    </div>
  );
}

const VISUALS: Record<FeatureVisualKind, ComponentType> = {
  transfer: Transfer,
  tax: Tax,
  team: Team,
  currency: Currency,
  fees: Fees,
};

export default function FeatureVisual({ kind }: { kind: FeatureVisualKind }) {
  const Visual = VISUALS[kind];
  return (
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
      <Visual />
    </div>
  );
}
