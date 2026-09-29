import type { LocalizedText } from "@/lib/types";

const tt = (uk: string, en: string, ru: string): LocalizedText => ({ uk, en, ru });

export interface CardTier {
  id: string;
  bg: string;
  fg: string;
  chip: string;
  name: LocalizedText;
  tag: LocalizedText;
  holder: string;
  last4: string;
}

export const cardTiers: CardTier[] = [
  {
    id: "standard",
    bg: "#0b0c0f",
    fg: "#f5f6f8",
    chip: "#d8a13f",
    name: tt("Стандарт", "Standard", "Стандарт"),
    tag: tt("Безкоштовно назавжди", "Free forever", "Бесплатно навсегда"),
    holder: "ALEX MORGAN",
    last4: "4821",
  },
  {
    id: "business",
    bg: "#13241d",
    fg: "#f5f6f8",
    chip: "#d8a13f",
    name: tt("Бізнес", "Business", "Бизнес"),
    tag: tt("Картки для команди", "Cards for your team", "Карты для команды"),
    holder: "PULSEWALLET LLC",
    last4: "1076",
  },
  {
    id: "founder",
    bg: "#eee9dd",
    fg: "#14130f",
    chip: "#8a7a52",
    name: tt("Founder", "Founder", "Founder"),
    tag: tt("Для перших 500 користувачів", "For the first 500 users", "Для первых 500 пользователей"),
    holder: "ALEX MORGAN",
    last4: "0007",
  },
];
