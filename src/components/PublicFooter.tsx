import Link from "next/link";

const hubs = [
  { href: "/kursy-kriptovalut", label: "Курсы" },
  { href: "/reitingi", label: "Рейтинги" },
  { href: "/konverter", label: "Конвертер" },
  { href: "/sravnenie", label: "Сравнение" },
  { href: "/novosti", label: "Новости" },
  { href: "/antiskam-audit", label: "Антискам" },
  { href: "/registratsiya", label: "Регистрация / рассылка" },
  { href: "/otzyvy", label: "Отзывы" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Разделы
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              {hubs.map((h) => (
                <li key={h.href}>
                  <Link href={h.href} className="hover:text-white">
                    {h.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Медиа
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Лента новостей
                </Link>
              </li>
              <li>
                <Link href="/category/rynok" className="hover:text-white">
                  Категория «Рынок»
                </Link>
              </li>
              <li>
                <Link href="/feed.xml" className="hover:text-white">
                  RSS
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Редакция
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              Материалы носят информационный характер, не являются индивидуальной
              инвестиционной рекомендацией. Курсы и таблицы сравнения могут отличаться
              от котировок вашей площадки.
            </p>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Altcoinlog
        </p>
      </div>
    </footer>
  );
}
