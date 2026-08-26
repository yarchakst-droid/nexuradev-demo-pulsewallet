import type { LocalizedText } from "@/lib/types";

const tt = (uk: string, en: string, ru: string): LocalizedText => ({ uk, en, ru });

export interface AudiencePersona {
  id: string;
  photo: string;
  tag: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  points: LocalizedText[];
}

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const audience: AudiencePersona[] = [
  {
    id: "freelancer",
    photo: photo("1521898284481-a5ec348cb555"),
    tag: tt("Фрилансери", "Freelancers", "Фрилансеры"),
    title: tt(
      "Для тих, хто виставляє рахунки самостійно",
      "For those who invoice their own clients",
      "Для тех, кто сам выставляет счета"
    ),
    description: tt(
      "Розробники, дизайнери, консультанти - клієнти в різних країнах, оплата в різних валютах, і жодного бухгалтера під рукою.",
      "Developers, designers, consultants - clients in different countries, payments in different currencies, and no accountant on call.",
      "Разработчики, дизайнеры, консультанты - клиенты в разных странах, оплата в разных валютах, и ни одного бухгалтера под рукой."
    ),
    points: [
      tt(
        "Рахунки-фактури прямо з застосунку",
        "Invoices straight from the app",
        "Счета-фактуры прямо из приложения"
      ),
      tt(
        "Автоматичне відкладення на податки",
        "Automatic tax set-asides",
        "Автоматическое отложение на налоги"
      ),
      tt(
        "Отримання оплати в 42 валютах без комісії за конвертацію",
        "Get paid in 42 currencies with no conversion fee",
        "Получение оплаты в 42 валютах без комиссии за конвертацию"
      ),
    ],
  },
  {
    id: "smallbiz",
    photo: photo("1556740738-b6a63e27c4df"),
    tag: tt("Малий бізнес", "Small business", "Малый бизнес"),
    title: tt(
      "Для власників, які роблять усе самі",
      "For owners who do it all themselves",
      "Для владельцев, которые делают всё сами"
    ),
    description: tt(
      "Кав'ярні, студії, майстерні - потрібен рахунок, що встигає за темпом бізнесу: приймати оплату, платити команді, бачити залишок будь-де.",
      "Cafés, studios, workshops - you need an account that keeps up with your pace: take payments, pay the team, see your balance anywhere.",
      "Кофейни, студии, мастерские - нужен счёт, который успевает за темпом бизнеса: принимать оплату, платить команде, видеть остаток где угодно."
    ),
    points: [
      tt(
        "Прийом оплат карткою й через QR за хвилини",
        "Accept card and QR payments in minutes",
        "Приём оплат картой и через QR за минуты"
      ),
      tt(
        "Картки для співробітників з лімітами",
        "Employee cards with spending limits",
        "Карты для сотрудников с лимитами"
      ),
      tt(
        "Баланс і виписка в реальному часі, без дзвінків у банк",
        "Real-time balance and statements, no calls to the bank",
        "Баланс и выписка в реальном времени, без звонков в банк"
      ),
    ],
  },
];
