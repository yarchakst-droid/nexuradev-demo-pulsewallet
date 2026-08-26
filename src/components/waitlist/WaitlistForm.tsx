"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { WaitlistRole } from "@/lib/types";

export default function WaitlistForm() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WaitlistRole>("freelancer");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const ROLES: { value: WaitlistRole; label: string }[] = [
    { value: "freelancer", label: t.waitlist.roleFreelancer },
    { value: "smallbiz", label: t.waitlist.roleSmallbiz },
    { value: "other", label: t.waitlist.roleOther },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t.waitlist.genericJoinError);
      setStatus("success");
      setMessage(data.message ?? t.waitlist.defaultSuccess);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : t.waitlist.genericError);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 py-2 text-center"
      >
        <motion.span
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 16 }}
          className="flex size-12 items-center justify-center rounded-full bg-mint/15 text-mint"
        >
          <CheckIcon className="size-6" />
        </motion.span>
        <p className="font-medium text-text">{message}</p>
        <p className="text-sm text-text-muted">{t.waitlist.successNote}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.waitlist.emailPlaceholder}
          className="w-full rounded-full border border-border bg-bg-panel px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
        >
          {status === "loading" ? t.waitlist.joining : t.waitlist.join}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        {ROLES.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => setRole(r.value)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              role === r.value
                ? "border-accent/40 bg-accent-soft text-accent"
                : "border-border text-text-soft hover:border-text-soft"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {status === "error" && message && <p className="text-center text-xs text-red-400 sm:text-left">{message}</p>}
    </form>
  );
}
