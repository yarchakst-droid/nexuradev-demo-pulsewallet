export type Lang = "uk" | "en" | "ru";

export type LocalizedText = Record<Lang, string>;

export type WaitlistRole = "freelancer" | "smallbiz" | "other";

export interface WaitlistEntry {
  email: string;
  role: WaitlistRole;
  joinedAt: string;
}
