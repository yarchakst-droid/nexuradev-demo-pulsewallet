import type { Lang } from "@/lib/types";

export const LANG_LABELS: Record<Lang, string> = {
  uk: "УКР",
  en: "ENG",
  ru: "РУС",
};

export const LOCALE_TAGS: Record<Lang, string> = {
  uk: "uk-UA",
  en: "en-US",
  ru: "ru-RU",
};

export interface Dictionary {
  nav: {
    features: string;
    preview: string;
    audience: string;
    join: string;
  };
  footer: {
    waitlist: string;
    tagline: string;
  };
  hero: {
    badge: string;
    headline: string;
    subhead: string;
    joinWaitlist: string;
    viewApp: string;
  };
  stats: {
    accountMinutes: string;
    onWaitlist: string;
    hiddenFees: string;
    currencies: string;
    minutesSuffix: string;
  };
  features: {
    eyebrow: string;
    heading: string;
  };
  featureVisuals: {
    transferSeconds: string;
    taxSetAside: string;
    teamPerMonth: string;
    feeCardMaintenance: string;
    feeSms: string;
    feeInactivity: string;
  };
  preview: {
    eyebrow: string;
    heading: string;
    subhead: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
  };
  audience: {
    eyebrow: string;
    heading: string;
  };
  waitlist: {
    badge: string;
    heading: string;
    subhead: string;
    emailPlaceholder: string;
    joining: string;
    join: string;
    roleFreelancer: string;
    roleSmallbiz: string;
    roleOther: string;
    genericJoinError: string;
    defaultSuccess: string;
    successNote: string;
    genericError: string;
  };
  server: {
    invalidBody: string;
    provideEmail: string;
    invalidEmail: string;
    chooseRole: string;
    alreadyJoined: string;
    joined: (position: string) => string;
  };
}

const uk: Dictionary = {
  nav: {
    features: "Можливості",
    preview: "Застосунок",
    audience: "Для кого",
    join: "Приєднатися",
  },
  footer: {
    waitlist: "Вейтлист",
    tagline: "PulseWallet готується до запуску. Демо-проєкт для портфоліо NexuraDev - не є реальним фінансовим продуктом.",
  },
  hero: {
    badge: "Готуємось до запуску - реєструйтесь у вейтлист",
    headline: "Банківський рахунок для тих, хто працює на себе",
    subhead:
      "PulseWallet - рахунок, картка та перекази для фрилансерів і засновників малого бізнесу. Відкриття за 2 хвилини, без черг і паперів.",
    joinWaitlist: "Приєднатися до вейтлиста",
    viewApp: "Переглянути застосунок",
  },
  stats: {
    accountMinutes: "на відкриття рахунку",
    onWaitlist: "у списку очікування",
    hiddenFees: "прихованих комісій",
    currencies: "валюти для переказів",
    minutesSuffix: " хв",
  },
  features: {
    eyebrow: "Можливості",
    heading: "Все необхідне, щоб гроші працювали на вас",
  },
  featureVisuals: {
    transferSeconds: "4 сек",
    taxSetAside: "Відкладено на податки · $3,120",
    teamPerMonth: "/ міс",
    feeCardMaintenance: "Обслуговування картки",
    feeSms: "SMS-сповіщення",
    feeInactivity: "Неактивність рахунку",
  },
  preview: {
    eyebrow: "Застосунок",
    heading: "Весь рахунок - в одному екрані",
    subhead:
      "Баланс, останні транзакції та швидкі дії - без зайвих меню. Те, що ви бачите в застосунку, те й реально відбувається з вашими грошима: жодних прихованих екранів.",
    bullet1: "Push-сповіщення про кожну транзакцію",
    bullet2: "Категоризація витрат у реальному часі",
    bullet3: "Заморозити картку одним дотиком",
  },
  audience: {
    eyebrow: "Для кого",
    heading: "Створено для тих, хто сам собі бухгалтерія",
  },
  waitlist: {
    badge: "Запуск найближчим часом",
    heading: "Відкрийте рахунок за 2 хвилини - щойно ми запустимось",
    subhead: "Залиште email зараз - і будете серед перших, хто отримає доступ, коли PulseWallet вийде з вейтлиста.",
    emailPlaceholder: "you@company.com",
    joining: "Надсилаємо…",
    join: "Приєднатися",
    roleFreelancer: "Фрилансер",
    roleSmallbiz: "Власник малого бізнесу",
    roleOther: "Інше",
    genericJoinError: "Не вдалося приєднатися до списку очікування.",
    defaultSuccess: "Готово - ми на зв'язку.",
    successNote: "Напишемо, щойно відкриємо доступ.",
    genericError: "Щось пішло не так.",
  },
  server: {
    invalidBody: "Некоректне тіло запиту.",
    provideEmail: "Вкажіть email.",
    invalidEmail: "Це не схоже на дійсний email.",
    chooseRole: "Оберіть, хто ви - це допоможе нам налаштувати запуск.",
    alreadyJoined: "Цей email вже у списку очікування.",
    joined: (position) => `Готово - ви #${position} у списку очікування.`,
  },
};

const en: Dictionary = {
  nav: {
    features: "Features",
    preview: "App",
    audience: "Who it's for",
    join: "Join waitlist",
  },
  footer: {
    waitlist: "Waitlist",
    tagline: "PulseWallet is getting ready to launch. A portfolio demo project for NexuraDev - not a real financial product.",
  },
  hero: {
    badge: "Getting ready to launch - join the waitlist",
    headline: "A bank account for people who work for themselves",
    subhead:
      "PulseWallet is an account, a card, and transfers built for freelancers and small business owners. Open in 2 minutes, no lines, no paperwork.",
    joinWaitlist: "Join the waitlist",
    viewApp: "View the app",
  },
  stats: {
    accountMinutes: "to open an account",
    onWaitlist: "on the waitlist",
    hiddenFees: "hidden fees",
    currencies: "currencies for transfers",
    minutesSuffix: " min",
  },
  features: {
    eyebrow: "Features",
    heading: "Everything you need to make your money work for you",
  },
  featureVisuals: {
    transferSeconds: "4 sec",
    taxSetAside: "Set aside for taxes · $3,120",
    teamPerMonth: "/ mo",
    feeCardMaintenance: "Card maintenance",
    feeSms: "SMS notifications",
    feeInactivity: "Account inactivity",
  },
  preview: {
    eyebrow: "App",
    heading: "Your whole account, on one screen",
    subhead:
      "Balance, recent transactions, and quick actions - without the extra menus. What you see in the app is what's really happening with your money: no hidden screens.",
    bullet1: "Push notifications for every transaction",
    bullet2: "Real-time spending categorization",
    bullet3: "Freeze your card with one tap",
  },
  audience: {
    eyebrow: "Who it's for",
    heading: "Built for people who are their own accounting department",
  },
  waitlist: {
    badge: "Launching soon",
    heading: "Open an account in 2 minutes - as soon as we launch",
    subhead: "Leave your email now, and you'll be among the first to get access when PulseWallet leaves the waitlist.",
    emailPlaceholder: "you@company.com",
    joining: "Sending…",
    join: "Join waitlist",
    roleFreelancer: "Freelancer",
    roleSmallbiz: "Small business owner",
    roleOther: "Other",
    genericJoinError: "Couldn't join the waitlist.",
    defaultSuccess: "You're in - we'll be in touch.",
    successNote: "We'll write as soon as we open access.",
    genericError: "Something went wrong.",
  },
  server: {
    invalidBody: "Invalid request body.",
    provideEmail: "Please provide an email.",
    invalidEmail: "That doesn't look like a valid email.",
    chooseRole: "Tell us who you are - it helps us tailor the launch.",
    alreadyJoined: "This email is already on the waitlist.",
    joined: (position) => `Done - you're #${position} on the waitlist.`,
  },
};

const ru: Dictionary = {
  nav: {
    features: "Возможности",
    preview: "Приложение",
    audience: "Для кого",
    join: "Присоединиться",
  },
  footer: {
    waitlist: "Вейтлист",
    tagline: "PulseWallet готовится к запуску. Демо-проект для портфолио NexuraDev - не является реальным финансовым продуктом.",
  },
  hero: {
    badge: "Готовимся к запуску - регистрируйтесь в вейтлист",
    headline: "Банковский счёт для тех, кто работает на себя",
    subhead:
      "PulseWallet - счёт, карта и переводы для фрилансеров и основателей малого бизнеса. Открытие за 2 минуты, без очередей и бумаг.",
    joinWaitlist: "Присоединиться к вейтлисту",
    viewApp: "Посмотреть приложение",
  },
  stats: {
    accountMinutes: "на открытие счёта",
    onWaitlist: "в списке ожидания",
    hiddenFees: "скрытых комиссий",
    currencies: "валюты для переводов",
    minutesSuffix: " мин",
  },
  features: {
    eyebrow: "Возможности",
    heading: "Всё необходимое, чтобы деньги работали на вас",
  },
  featureVisuals: {
    transferSeconds: "4 сек",
    taxSetAside: "Отложено на налоги · $3,120",
    teamPerMonth: "/ мес",
    feeCardMaintenance: "Обслуживание карты",
    feeSms: "SMS-уведомления",
    feeInactivity: "Неактивность счёта",
  },
  preview: {
    eyebrow: "Приложение",
    heading: "Весь счёт - на одном экране",
    subhead:
      "Баланс, последние транзакции и быстрые действия - без лишних меню. То, что вы видите в приложении, то и реально происходит с вашими деньгами: никаких скрытых экранов.",
    bullet1: "Push-уведомления о каждой транзакции",
    bullet2: "Категоризация расходов в реальном времени",
    bullet3: "Заморозить карту одним касанием",
  },
  audience: {
    eyebrow: "Для кого",
    heading: "Создано для тех, кто сам себе бухгалтерия",
  },
  waitlist: {
    badge: "Запуск в ближайшее время",
    heading: "Откройте счёт за 2 минуты - как только мы запустимся",
    subhead: "Оставьте email сейчас - и будете среди первых, кто получит доступ, когда PulseWallet выйдет из вейтлиста.",
    emailPlaceholder: "you@company.com",
    joining: "Отправляем…",
    join: "Присоединиться",
    roleFreelancer: "Фрилансер",
    roleSmallbiz: "Владелец малого бизнеса",
    roleOther: "Другое",
    genericJoinError: "Не удалось присоединиться к списку ожидания.",
    defaultSuccess: "Готово - мы на связи.",
    successNote: "Напишем, как только откроем доступ.",
    genericError: "Что-то пошло не так.",
  },
  server: {
    invalidBody: "Некорректное тело запроса.",
    provideEmail: "Укажите email.",
    invalidEmail: "Это не похоже на настоящий email.",
    chooseRole: "Выберите, кто вы - это поможет нам настроить запуск.",
    alreadyJoined: "Этот email уже в списке ожидания.",
    joined: (position) => `Готово - вы #${position} в списке ожидания.`,
  },
};

export const DICTIONARIES: Record<Lang, Dictionary> = { uk, en, ru };
