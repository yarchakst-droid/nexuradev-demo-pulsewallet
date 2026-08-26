import { BoltIcon, GlobeIcon, ReceiptIcon, ShieldIcon, UsersIcon } from "@/components/shared/icons";
import type { LocalizedText } from "@/lib/types";

const tt = (uk: string, en: string, ru: string): LocalizedText => ({ uk, en, ru });

export const features = [
  {
    icon: BoltIcon,
    eyebrow: tt("Перекази", "Transfers", "Переводы"),
    title: tt(
      "Гроші доходять за секунди, не за дні",
      "Money arrives in seconds, not days",
      "Деньги приходят за секунды, а не за дни"
    ),
    description: tt(
      "Миттєві перекази між рахунками PulseWallet і виведення на картку будь-якого банку - без вихідних, без «операційного дня банку».",
      "Instant transfers between PulseWallet accounts and payouts to any bank card - no weekends, no \"bank business days\".",
      "Мгновенные переводы между счетами PulseWallet и вывод на карту любого банка - без выходных, без «операционного дня банка»."
    ),
    visual: "transfer",
  },
  {
    icon: ReceiptIcon,
    eyebrow: tt("Податки", "Taxes", "Налоги"),
    title: tt(
      "Відрахування на податки - автоматично",
      "Tax set-asides - automatic",
      "Отчисления на налоги - автоматически"
    ),
    description: tt(
      "Вкажіть відсоток - і з кожного надходження PulseWallet відкладає суму на окремий підрахунок. Наприкінці кварталу нічого рахувати вручну.",
      "Set a percentage, and PulseWallet sets aside that amount from every incoming payment into a separate pot. Nothing to calculate by hand at quarter's end.",
      "Укажите процент - и с каждого поступления PulseWallet откладывает сумму на отдельный подсчёт. В конце квартала ничего считать вручную не придётся."
    ),
    visual: "tax",
  },
  {
    icon: UsersIcon,
    eyebrow: tt("Команда", "Team", "Команда"),
    title: tt(
      "Картки для підрядників і співробітників",
      "Cards for contractors and employees",
      "Карты для подрядчиков и сотрудников"
    ),
    description: tt(
      "Видавайте віртуальні картки з лімітами для кожного члена команди, бачте витрати в реальному часі - без спільного доступу до основного рахунку.",
      "Issue virtual cards with limits for every team member and see spending in real time - no shared access to the main account.",
      "Выдавайте виртуальные карты с лимитами для каждого члена команды, видите расходы в реальном времени - без общего доступа к основному счёту."
    ),
    visual: "team",
  },
  {
    icon: GlobeIcon,
    eyebrow: tt("Валюти", "Currencies", "Валюты"),
    title: tt("Один рахунок, 42 валюти", "One account, 42 currencies", "Один счёт, 42 валюты"),
    description: tt(
      "Отримуйте оплату від клієнтів по всьому світу в їхній валюті й конвертуйте за міжбанківським курсом - без прихованого відсотка «за спред».",
      "Get paid by clients worldwide in their currency and convert at the interbank rate - no hidden \"spread\" markup.",
      "Получайте оплату от клиентов по всему миру в их валюте и конвертируйте по межбанковскому курсу - без скрытого процента «за спред»."
    ),
    visual: "currency",
  },
  {
    icon: ShieldIcon,
    eyebrow: tt("Комісії", "Fees", "Комиссии"),
    title: tt("Жодних сюрпризів у виписці", "No surprises on your statement", "Никаких сюрпризов в выписке"),
    description: tt(
      "Одна прозора комісія за план, без плати за обслуговування картки, SMS чи «неактивність» рахунку. Що бачите на сайті - те й платите.",
      "One transparent plan fee, with no charge for card maintenance, SMS, or account \"inactivity\". What you see on the site is what you pay.",
      "Одна прозрачная комиссия за план, без платы за обслуживание карты, SMS или «неактивность» счёта. Что видите на сайте - то и платите."
    ),
    visual: "fees",
  },
] as const;

export type FeatureVisualKind = (typeof features)[number]["visual"];
