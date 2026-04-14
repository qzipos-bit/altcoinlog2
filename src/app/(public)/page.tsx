import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { ExchangeArticleCard } from "@/components/exchange/ExchangeArticleCard";
import { ExchangeRightSidebar } from "@/components/exchange/ExchangeRightSidebar";
import { ExchangeSidebar } from "@/components/exchange/ExchangeSidebar";
import { fetchSimpleSpotPrices, type SimplePrices } from "@/lib/coingecko";
import { isDatabaseConnectionError } from "@/lib/is-db-connection-error";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const homeArticleArgs = {
  where: { status: "PUBLISHED" as const },
  orderBy: { publishedAt: "desc" as const },
  take: 30,
  include: {
    category: true,
    author: true,
    tags: { include: { tag: true } },
  },
} satisfies Prisma.ArticleFindManyArgs;

type HomeArticle = Prisma.ArticleGetPayload<typeof homeArticleArgs>;

export default async function HomePage() {
  let dbOffline = false;
  let articles: HomeArticle[] = [];
  let prices: SimplePrices | null = null;

  prices = await fetchSimpleSpotPrices().catch(() => null);

  try {
    articles = await prisma.article.findMany(homeArticleArgs);
  } catch (e) {
    if (isDatabaseConnectionError(e)) {
      dbOffline = true;
    } else {
      throw e;
    }
  }

  const miniNews = articles.slice(0, 5);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_300px] lg:items-start">
      <div className="hidden lg:block">
        <ExchangeSidebar />
      </div>

      <div className="min-w-0 space-y-5">
        {dbOffline && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <p className="font-medium">База данных недоступна</p>
            <p className="mt-2 text-amber-900/90">
              Лента новостей не загрузится, пока не запущен PostgreSQL. Разделы без БД уже можно
              смотреть:{" "}
              <Link href="/kursy-kriptovalut" className="font-medium underline">
                курсы
              </Link>
              ,{" "}
              <Link href="/reitingi" className="font-medium underline">
                рейтинги
              </Link>
              ,{" "}
              <Link href="/konverter" className="font-medium underline">
                конвертер
              </Link>
              . Локально:{" "}
              <code className="rounded bg-amber-100/80 px-1">docker compose up -d</code> →{" "}
              <code className="rounded bg-amber-100/80 px-1">npx prisma migrate deploy</code> →{" "}
              <code className="rounded bg-amber-100/80 px-1">npm run db:seed</code>.
            </p>
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
            Лента новостей
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Опубликованные материалы редакции и проверенные источники после модерации.
          </p>
        </div>

        {!dbOffline && articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-500">
            Пока нет опубликованных статей. Запустите БД, миграции и сид: см.{" "}
            <code className="text-[color:var(--exchange-accent)]">README.md</code>.
          </div>
        ) : dbOffline ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-500">
            Подключите PostgreSQL, чтобы увидеть статьи.
          </div>
        ) : (
          <div className="space-y-5">
            {articles.map((a) => (
              <ExchangeArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-4">
          <ExchangeRightSidebar prices={prices} miniNews={miniNews} />
        </div>
      </div>

      <div className="lg:hidden">
        <ExchangeRightSidebar prices={prices} miniNews={miniNews} />
      </div>
    </div>
  );
}
