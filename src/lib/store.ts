import { DICTIONARIES } from "@/i18n/dictionary";
import type { Lang, WaitlistEntry, WaitlistRole } from "@/lib/types";

const SEED_COUNT = 12400;
const VALID_ROLES: WaitlistRole[] = ["freelancer", "smallbiz", "other"];

declare global {
  var __pulsewalletWaitlist: Map<string, WaitlistEntry> | undefined;
}

function store(): Map<string, WaitlistEntry> {
  if (!globalThis.__pulsewalletWaitlist) globalThis.__pulsewalletWaitlist = new Map();
  return globalThis.__pulsewalletWaitlist;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type JoinWaitlistResult =
  | { ok: true; alreadyJoined: boolean; position: number }
  | { ok: false; error: string; status: number };

export function joinWaitlist(email: unknown, role: unknown, lang: Lang = "uk"): JoinWaitlistResult {
  const t = DICTIONARIES[lang].server;
  if (typeof email !== "string" || email.trim().length === 0) {
    return { ok: false, error: t.provideEmail, status: 400 };
  }
  const normalizedEmail = email.trim().toLowerCase();
  if (!EMAIL_RE.test(normalizedEmail)) {
    return { ok: false, error: t.invalidEmail, status: 400 };
  }
  if (typeof role !== "string" || !VALID_ROLES.includes(role as WaitlistRole)) {
    return { ok: false, error: t.chooseRole, status: 400 };
  }

  const list = store();
  const alreadyJoined = list.has(normalizedEmail);
  if (!alreadyJoined) {
    list.set(normalizedEmail, { email: normalizedEmail, role: role as WaitlistRole, joinedAt: new Date().toISOString() });
  }

  return { ok: true, alreadyJoined, position: SEED_COUNT + list.size };
}
