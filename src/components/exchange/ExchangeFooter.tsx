import Link from "next/link";
import { FooterNewsletterBar } from "@/components/exchange/FooterNewsletterBar";
import { operator } from "@/content/legal/operator";
import { ratingLandings, ratingSlugs } from "@/content/ratings";

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

type FooterLink = { href: string; label: string };

function FooterLinks({ links }: { links: readonly FooterLink[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {links.map((l) => (
        <li key={l.href}>
          {l.href.startsWith("/") ? (
            <Link href={l.href} className="text-zinc-200 transition hover:text-white">
              {l.label}
            </Link>
          ) : (
            <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-zinc-200 transition hover:text-white">
              {l.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

function FooterSection({ title, links }: { title: string; links: readonly FooterLink[] }) {
  return (
    <div>
      <p className="mb-3 text-sm text-zinc-500">{title}</p>
      <FooterLinks links={links} />
    </div>
  );
}

const aboutLinks = [
  { href: "/contact", label: "О проекте" },
  { href: "/authors", label: "Редакция" },
] as const;

const keyLegalLinks = [
  { href: "/preduprezhdenie-o-riskah", label: "Предупреждение о рисках" },
  { href: "/user-agreement", label: "Пользовательское соглашение" },
  { href: "/policy", label: "Политика обработки персональных данных" },
] as const;

const cooperationLinks = [
  { href: "/ads-policy", label: "Размещение рекламы" },
  { href: operator.mediaKitUrl, label: "MediaKit" },
  { href: "/affiliate-disclosure", label: "Партнёрские ссылки" },
] as const;

const editorialLinks = [
  { href: "/editorial-policy", label: "Редакционная политика" },
  { href: "/metodologiya-reitingov", label: "Методология рейтингов" },
  { href: "/copyright-policy", label: "Авторское право" },
] as const;

const documentLinks = [
  { href: "/soglasie-na-obrabotku-personalnyh-dannyh", label: "Согласие на обработку персональных данных" },
  { href: "/cookie-policy", label: "Политика файлов cookie" },
  { href: "/disclaimer", label: "Отказ от ответственности" },
] as const;

const ratingLinks = ratingSlugs.map((slug) => ({ href: `/reitingi/${slug}`, label: ratingLandings[slug].title }));

const sectionLinks = [
  { href: "/", label: "Главная" },
  { href: "/novosti", label: "Новости" },
  { href: "/kursy-kriptovalut", label: "Курсы криптовалют" },
  { href: "/konverter", label: "Конвертер" },
  { href: "/sravnenie", label: "Сравнение" },
  { href: "/reitingi", label: "Рейтинги" },
  { href: "/otzyvy", label: "Отзывы" },
  { href: "/antiskam-audit", label: "Антискам-аудит" },
] as const;

const socials = [
  { href: operator.social.twitter, label: "X (Twitter)", short: "X" },
  { href: operator.social.youtube, label: "YouTube", short: "YT" },
  { href: operator.social.telegram, label: "Telegram", short: "TG" },
  { href: operator.social.vk, label: "ВКонтакте", short: "VK" },
] as const;

const emails = [
  { label: "Контакты", email: operator.emails.support },
  { label: "Реклама", email: operator.emails.sales },
  { label: "Работа", email: operator.emails.job },
] as const;

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

      <div className="border-t border-white/10 bg-black">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          <div className="space-y-6">
            <FooterLogo />
            <p className="text-sm leading-relaxed text-zinc-400">
              Altcoinlog — независимый информационный ресурс о криптовалютах, блокчейне и цифровых активах. Работаем с{" "}
              {operator.foundedYear} года.
            </p>
            <FooterLinks links={aboutLinks} />
            <ul className="space-y-2 text-sm">
              {emails.map((e) => (
                <li key={e.email} className="text-zinc-500">
                  {e.label}:{" "}
                  <a href={`mailto:${e.email}`} className="text-zinc-200 transition hover:text-white">
                    {e.email}
                  </a>
                </li>
              ))}
            </ul>
            <FooterLinks links={keyLegalLinks} />
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-bold text-zinc-200 ring-1 ring-white/20 transition hover:bg-zinc-800 hover:text-white"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <FooterSection title="Сотрудничество" links={cooperationLinks} />
            <FooterSection title="Редакция" links={editorialLinks} />
            <FooterSection title="Документы" links={documentLinks} />
            <FooterLinks links={[{ href: operator.englishSiteUrl, label: "Altcoinlog English" }]} />
          </div>

          <FooterSection title="Полезные рейтинги" links={ratingLinks} />
          <FooterSection title="Разделы сайта" links={sectionLinks} />
        </div>
      </div>

      <div className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-[1440px] space-y-4 px-4 py-8 text-center text-sm text-zinc-500">
          <p>
            © {operator.foundedYear}–{year} AltCoinLog. Все права защищены.{" "}
            <span className="ml-1 inline-flex items-center rounded border border-zinc-600 px-1.5 text-xs font-semibold text-zinc-300" aria-label="Возрастное ограничение 18+">
              18+
            </span>
          </p>
          <p className="mx-auto max-w-5xl text-xs leading-relaxed">
            Информация на сайте не является индивидуальной инвестиционной рекомендацией. Операции с цифровыми активами связаны с высоким
            риском потери средств — пользователь самостоятельно принимает решения и несёт за них ответственность. Ссылки на сторонние сайты
            могут быть партнёрскими. Altcoinlog не несёт ответственности за содержание внешних ресурсов.
          </p>
        </div>
      </div>
    </footer>
  );
}
