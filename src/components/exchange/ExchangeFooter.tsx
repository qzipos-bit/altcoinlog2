import Link from "next/link";
import { FooterNewsletterBar } from "@/components/exchange/FooterNewsletterBar";

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
      <polygon points="16,5 5,27 16,21" fill="white" />
      <polygon points="16,5 27,27 16,21" fill="var(--color-brand)" />
    </svg>
  );
}

function FooterLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--exchange-accent)]">
      <LogoMark />
      <span className="flex items-baseline font-black tracking-tight">
        <span className="text-base text-[color:var(--color-brand)]">ALTCOIN</span>
        <span className="text-sm font-semibold lowercase text-white">log</span>
      </span>
    </Link>
  );
}

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5 3h14a2 2 0 012 2v10a2 2 0 01-2 2h-4.5L12 22l-2.5-5H5a2 2 0 01-2-2V5a2 2 0 012-2zm3.5 7.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    </svg>
  );
}

function SmallCircleAccentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="5" />
    </svg>
  );
}

function FooterSection({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-bold text-white">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-zinc-400">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="transition hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const col1About = [
  { href: "#", label: "О нас" },
  { href: "#", label: "Выходные данные" },
  { href: "#", label: "Карьера" },
  { href: "/otzyvy", label: "Блог" },
  { href: "#", label: "Отношения с инвесторами" },
] as const;

const col1Contacts = [
  { href: "/registratsiya", label: "Свяжитесь с нами" },
  { href: "#", label: "Доступность" },
  { href: "#", label: "Рекламировать" },
  { href: "/sitemap.xml", label: "Карта сайта" },
  { href: "#", label: "Состояние системы" },
] as const;

const col2News = [
  { href: "/category/rynok", label: "Рынки" },
  { href: "#", label: "Финансы" },
  { href: "#", label: "Технологии" },
  { href: "/category/regulirovanie", label: "Политика" },
  { href: "#", label: "Фокус" },
] as const;

const col2Video = [
  { href: "#", label: "Ежедневник" },
  { href: "#", label: "Выбор редакции" },
  { href: "#", label: "Shorts" },
  { href: "#", label: "В центре внимания" },
] as const;

const col2Podcasts = [
  { href: "#", label: "Сеть подкастов" },
  { href: "#", label: "Прогноз по рынкам" },
  { href: "#", label: "Gen C" },
] as const;

const col3Crypto = [
  { href: "/kursy-kriptovalut", label: "Цены" },
  { href: "/tags/bitcoin", label: "Bitcoin (BTC)" },
  { href: "#", label: "Ethereum (ETH)" },
  { href: "#", label: "XRP" },
  { href: "#", label: "Solana (SOL)" },
] as const;

const col3Research = [{ href: "#", label: "Исследования/Отчеты" }] as const;

const col3Data = [
  { href: "#", label: "Рыночные данные" },
  { href: "#", label: "Индексные продукты" },
  { href: "#", label: "API" },
  { href: "#", label: "Аналитика и исследования" },
  { href: "#", label: "Документация и управление" },
] as const;

const col4Events = [
  { href: "#", label: "Консенсус Гонконг" },
  { href: "#", label: "Консенсус Майами" },
  { href: "#", label: "Вебинары" },
] as const;

const col4Sponsored = [
  { href: "#", label: "Лидерство в области идей" },
  { href: "#", label: "Пресс-релиз" },
  { href: "#", label: "MEXC" },
  { href: "#", label: "Phemex" },
  { href: "#", label: "Stellar" },
] as const;

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/90 text-zinc-200 ring-1 ring-white/10 transition hover:bg-zinc-700 hover:text-white"
      aria-label={label}
    >
      {children}
    </Link>
  );
}

export function ExchangeFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-black text-zinc-300">
      {/* Пользователи онлайн */}
      <div className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-3 gap-y-2 text-sm">
            <span className="shrink-0 font-bold text-white">Пользователи онлайн:</span>
            <span className="flex shrink-0 -space-x-2" aria-hidden>
              <span className="inline-flex h-9 w-9 rounded-full border-2 border-black bg-gradient-to-br from-amber-400 to-orange-600" />
              <span className="inline-flex h-9 w-9 rounded-full border-2 border-black bg-gradient-to-br from-sky-400 to-indigo-600" />
              <span className="inline-flex h-9 w-9 rounded-full border-2 border-black bg-gradient-to-br from-emerald-400 to-teal-700" />
            </span>
            <span className="min-w-0 text-white">
              и ещё <span className="font-semibold">687</span> зарегистрированных и{" "}
              <span className="font-semibold">2&nbsp;699</span> гостей сейчас на «Altcoinlog»
            </span>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-zinc-100"
          >
            Просмотреть всех
          </button>
        </div>
      </div>

      <FooterNewsletterBar />

      {/* Сервисные ссылки и CTA */}
      <div className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-[1440px] px-4 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-white">
              <Link
                href="/registratsiya"
                className="transition hover:text-[color:var(--exchange-accent)] hover:underline hover:underline-offset-4"
              >
                Подписка «Altcoinlog.Премиум»
              </Link>
              <Link
                href="/kursy-kriptovalut"
                className="transition hover:text-[color:var(--exchange-accent)] hover:underline hover:underline-offset-4"
              >
                Курсы повышения квалификации
              </Link>
              <span>
                Телефон{" "}
                <a href="tel:88003004545" className="whitespace-nowrap hover:underline">
                  8 (800) 300-45-45
                </a>
              </span>
            </div>
            <Link
              href="/registratsiya"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--exchange-accent)] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:brightness-105"
            >
              <span>Чат поддержки для клиентов</span>
              <ChatBubbleIcon className="shrink-0 text-zinc-950" />
            </Link>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white">
              <Link
                href="#"
                className="transition hover:text-[color:var(--exchange-accent)] hover:underline hover:underline-offset-4"
              >
                Рекламные форматы
              </Link>
              <Link
                href="#"
                className="transition hover:text-[color:var(--exchange-accent)] hover:underline hover:underline-offset-4"
              >
                Продвижение блога
              </Link>
            </div>
            <Link
              href="/registratsiya"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--exchange-accent)] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:brightness-105"
            >
              <span>Заказать рекламу</span>
              <SmallCircleAccentIcon className="shrink-0 text-zinc-950" />
            </Link>
          </div>
        </div>
      </div>

      {/* Сетка разделов (карта сайта) */}
      <div className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-[1440px] px-4 py-14">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-10">
            <div className="space-y-8">
            <FooterLogo />
            <FooterSection title="О нас" links={col1About} />
            <FooterSection title="Контакты" links={col1Contacts} />
            </div>
            <div className="space-y-8">
            <FooterSection title="Новости" links={col2News} />
            <FooterSection title="Видео" links={col2Video} />
            <FooterSection title="Подкасты" links={col2Podcasts} />
            </div>
            <div className="space-y-8">
            <FooterSection title="Криптовалюта" links={col3Crypto} />
            <FooterSection title="Исследования" links={col3Research} />
            <FooterSection title="Данные и индексы" links={col3Data} />
            </div>
            <div className="space-y-8">
            <FooterSection title="События" links={col4Events} />
            <FooterSection title="Спонсируемое" links={col4Sponsored} />
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя полоса: копирайт и соцсети */}
      <div className="border-t border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-400">
            <span>© {year} AltCoinLog</span>
            <span className="mx-2 text-zinc-600" aria-hidden>
              ·
            </span>
            <span>Все права защищены</span>
          </p>
          <div className="flex gap-2">
            <SocialIcon href="#" label="ВКонтакте">
              <span className="text-[11px] font-bold tracking-tight">VK</span>
            </SocialIcon>
            <SocialIcon href="#" label="Telegram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22.05 2.05L2.05 11.05l8.5 1.9 1.9 8.5 9.55-19.4z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#" label="Rutube">
              <span className="text-sm font-black leading-none">R</span>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}
