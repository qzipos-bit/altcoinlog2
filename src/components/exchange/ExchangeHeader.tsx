import Link from "next/link";

const mainNav = [
  { href: "/", label: "Начать", icon: StartIcon },
  { href: "/kursy-kriptovalut", label: "Обучение", icon: GradCapIcon },
  { href: "/reitingi", label: "Разборы", icon: LineChartIcon },
  { href: "/konverter", label: "Инструменты", icon: ToolsIcon },
  { href: "/otzyvy", label: "Блог", icon: MegaphoneIcon },
] as const;

const promoNav = [
  { href: "/registratsiya", label: "Курс в подарок!", icon: GiftIcon, iconClass: "text-zinc-100" },
  {
    href: "/sravnenie",
    label: "Криптобиржа",
    icon: ExchangeGlyphIcon,
    iconClass: "text-sky-400",
  },
] as const;

function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
      <polygon points="16,5 5,27 16,21" fill="white" />
      <polygon points="16,5 27,27 16,21" fill="var(--color-brand)" />
    </svg>
  );
}

function ExchangeHeaderLogo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--exchange-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
      aria-label="Altcoinlog — на главную"
    >
      <LogoMark />
      <span className="flex items-baseline gap-0 font-black tracking-tight">
        <span className="text-lg text-[color:var(--color-brand)] sm:text-xl">ALTCOIN</span>
        <span className="text-base font-semibold lowercase text-white sm:text-lg">log</span>
      </span>
    </Link>
  );
}

function StartIcon() {
  return (
    <svg className="mx-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3" />
    </svg>
  );
}

function GradCapIcon() {
  return (
    <svg className="mx-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41c.06-.18.12-.366.17-.565m0 0a57.03 57.03 0 01-.167-.79c.978.499 1.94.947 2.87 1.291.124.477 2.303.765 3.51.764a59.498 59.498 0 004.23-.732.482.482 0 00.355-.563c-.003-.091-.012-.18-.025-.267C21.36 15.723 19.93 13.74 18 12c-1.93-1.74-3.36-3.723-3.64-5.127-.022-.126-.042-.254-.06-.383-.073-.537-.112-1.08-.112-1.624 0-1.847.37-3.598 1.039-5.197m0 0A59.49 59.49 0 0012 3.493a59.49 59.49 0 00-8.039 5.81m8.039-5.81v4.87"
      />
    </svg>
  );
}

function LineChartIcon() {
  return (
    <svg className="mx-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg className="mx-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17L17.25 21a2.652 2.652 0 002.652 0 2.652 2.652 0 001.06-1.06l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 00-3.586 0 2.548 2.548 0 000 3.586l5.653 4.655"
      />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg className="mx-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg className="mx-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

function ExchangeGlyphIcon() {
  return (
    <svg className="mx-auto h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 4 5 8v8l7 4 7-4V8l-7-4zm-5.5 9.2V9.3l5-2.9v5.8l-5 2.9zm6.5 2.9v-5.8l5-2.9v5.8l-5 2.9z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

const iconGold = "text-[color:var(--exchange-accent)]";

export function ExchangeHeader() {
  return (
    <header className="border-b border-zinc-800/80 bg-[color:var(--exchange-header)] text-zinc-100">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-4 gap-y-3 px-4 py-2.5 sm:gap-x-5 sm:py-3">
        <ExchangeHeaderLogo />

        <nav
          className="order-2 flex min-w-0 flex-1 basis-full items-center justify-center gap-4 overflow-x-auto py-1 sm:order-none sm:basis-auto sm:justify-start sm:overflow-visible sm:py-0 md:gap-5 lg:gap-6"
          aria-label="Разделы портала"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-w-[56px] shrink-0 flex-col items-center gap-1 text-[10px] font-medium text-white sm:text-[11px]"
            >
              <span className={iconGold}>
                <item.icon />
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          ))}

          <span className="hidden h-9 w-px shrink-0 bg-zinc-600 sm:block" aria-hidden />

          <div className="flex shrink-0 items-center gap-4 md:gap-5">
            {promoNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-w-[72px] flex-col items-center gap-1 text-[10px] font-medium text-white sm:text-[11px]"
              >
                <span className={item.iconClass}>
                  <item.icon />
                </span>
                <span className="max-w-[5.5rem] text-center leading-tight sm:max-w-none">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="order-1 ml-auto flex shrink-0 items-center gap-2 sm:order-none sm:ml-0 sm:gap-3">
          <Link
            href="/novosti"
            className="rounded-lg bg-zinc-800/90 p-2 text-zinc-200 ring-1 ring-zinc-700/80 transition hover:bg-zinc-700 hover:text-white"
            aria-label="Поиск по новостям"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/registratsiya"
            className="hidden rounded-full bg-[color:var(--exchange-accent)] px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:brightness-105 sm:inline-flex"
          >
            Премиум доступ
          </Link>
          <Link
            href="/admin/login"
            className="whitespace-nowrap text-sm text-white underline-offset-4 hover:text-zinc-200 hover:underline"
          >
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}
