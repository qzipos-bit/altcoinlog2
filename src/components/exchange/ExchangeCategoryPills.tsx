import Link from "next/link";

const pills = [
  { href: "/", label: "Все" },
  { href: "/novosti", label: "Популярное" },
  { href: "/category/rynok", label: "Инвестиции" },
  { href: "/tags/bitcoin", label: "Bitcoin" },
  { href: "/category/regulirovanie", label: "Регулирование" },
  { href: "/reitingi", label: "Рейтинги" },
  { href: "/antiskam-audit", label: "Безопасность" },
  { href: "/kursy-kriptovalut", label: "Курсы" },
] as const;

export function ExchangeCategoryPills() {
  return (
    <div className="border-b border-zinc-200/80 bg-[color:var(--exchange-pill-bar)]">
      <div className="mx-auto max-w-[1440px] px-4 py-2.5">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {pills.map((p) => (
            <Link
              key={p.href + p.label}
              href={p.href}
              className="shrink-0 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-sm text-zinc-700 shadow-sm transition hover:border-[color:var(--exchange-accent)] hover:text-zinc-900"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
