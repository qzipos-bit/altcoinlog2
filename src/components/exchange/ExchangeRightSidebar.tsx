import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { displayAssetOrder, type SimplePrices } from "@/lib/coingecko";

const miniArgs = {
  include: { category: true },
} satisfies Prisma.ArticleFindManyArgs;

export type MiniArticle = Prisma.ArticleGetPayload<typeof miniArgs>;

function formatRub(n: number | undefined) {
  if (n == null || Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: n >= 100 ? 0 : 2,
  }).format(n);
}

function formatShortDate(d: Date | null) {
  if (!d) return "";
  return new Intl.DateTimeFormat("ru-RU", { dateStyle: "short", timeStyle: "short" }).format(d);
}

const tokenizedStub = [
  { sym: "AAPL", name: "Apple", rub: 18240 },
  { sym: "TSLA", name: "Tesla", rub: 19880 },
  { sym: "COIN", name: "Coinbase", rub: 21450 },
] as const;

export function ExchangeRightSidebar({
  prices,
  miniNews,
}: {
  prices: SimplePrices | null;
  miniNews: MiniArticle[];
}) {
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-zinc-900">Монеты недели</h3>
        <ul className="mt-3 space-y-2.5 text-sm">
          {displayAssetOrder.map((a) => {
            const row = prices?.[a.id];
            const rub = row?.rub;
            return (
              <li key={a.id} className="flex items-center justify-between gap-2">
                <span className="font-medium text-zinc-800">{a.sym}</span>
                <span className="tabular-nums text-zinc-600">{formatRub(rub)}</span>
              </li>
            );
          })}
        </ul>
        <Link
          href="/kursy-kriptovalut"
          className="mt-3 inline-block text-xs font-semibold text-blue-600 hover:underline"
        >
          Показать ещё
        </Link>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-zinc-900">Криптоновости</h3>
        <ul className="mt-3 space-y-3">
          {miniNews.length === 0 ? (
            <li className="text-sm text-zinc-500">Нет материалов</li>
          ) : (
            miniNews.map((a) => (
              <li key={a.id}>
                <Link href={`/news/${a.slug}`} className="group flex gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                    {a.featuredImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.featuredImageUrl} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium leading-snug text-zinc-900 group-hover:text-[color:var(--exchange-accent)]">
                      {a.title}
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-500">{formatShortDate(a.publishedAt)}</p>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
        <Link href="/novosti" className="mt-3 inline-block text-xs font-semibold text-blue-600 hover:underline">
          Показать ещё
        </Link>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-zinc-900">Токенизированные бумаги</h3>
        <p className="mt-1 text-xs text-zinc-500">Демо-виджет для макета</p>
        <ul className="mt-3 space-y-2.5 text-sm">
          {tokenizedStub.map((t) => (
            <li key={t.sym} className="flex items-center justify-between gap-2">
              <span>
                <span className="font-medium text-zinc-800">{t.sym}</span>
                <span className="ml-1 text-zinc-500">{t.name}</span>
              </span>
              <span className="tabular-nums text-emerald-600">{formatRub(t.rub)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
