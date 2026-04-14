import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

const links = [
  { href: "/kursy-kriptovalut", label: "Курсы" },
  { href: "/reitingi", label: "Рейтинги" },
  { href: "/konverter", label: "Конвертер" },
  { href: "/sravnenie", label: "Сравнение" },
  { href: "/novosti", label: "Новости" },
  { href: "/antiskam-audit", label: "Антискам" },
  { href: "/registratsiya", label: "Регистрация" },
  { href: "/otzyvy", label: "Отзывы" },
];

export function PublicNav() {
  return (
    <header className="border-b border-zinc-800 bg-black/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <BrandLogo />
        <nav
          className="-mx-1 flex flex-wrap items-center gap-x-4 gap-y-2 overflow-x-auto px-1 text-sm text-zinc-400"
          aria-label="Основное меню"
        >
          <Link href="/" className="whitespace-nowrap hover:text-brand">
            Лента
          </Link>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap hover:text-brand"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/feed.xml" className="whitespace-nowrap hover:text-brand">
            RSS
          </Link>
          <Link
            href="/admin"
            className="whitespace-nowrap rounded-sm border border-zinc-700 px-2 py-1 text-zinc-200 hover:border-brand hover:text-brand"
          >
            Админка
          </Link>
        </nav>
      </div>
    </header>
  );
}
