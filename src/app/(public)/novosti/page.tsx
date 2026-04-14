import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site";
import { isDatabaseConnectionError } from "@/lib/is-db-connection-error";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Новости по категориям",
  description:
    "Хаб категорий Altcoinlog: внутренняя перелинковка, рост полезности раздела «Медиа» и поддержка SEO-кластеров.",
  alternates: { canonical: `${getSiteUrl()}/novosti` },
};

const categoryHubArgs = {
  orderBy: { name: "asc" as const },
  include: {
    _count: {
      select: { articles: { where: { status: "PUBLISHED" as const } } },
    },
  },
} satisfies Prisma.CategoryFindManyArgs;

type CategoryHub = Prisma.CategoryGetPayload<typeof categoryHubArgs>;

export default async function NewsHubPage() {
  let categories: CategoryHub[] = [];
  let dbOffline = false;

  try {
    categories = await prisma.category.findMany(categoryHubArgs);
  } catch (e) {
    if (isDatabaseConnectionError(e)) {
      dbOffline = true;
    } else {
      throw e;
    }
  }

  return (
    <article>
      <header className="border-b border-zinc-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Приоритет №5
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Новости по категориям
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Каждая категория — отдельный SEO-кластер и точка входа в ленту. Здесь
          собраны ссылки на уже заведённые рубрики в базе.
        </p>
      </header>

      {dbOffline ? (
        <p className="mt-10 rounded-sm border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          Категории загружаются из БД. Запустите PostgreSQL (см. главную или{" "}
          <code className="rounded bg-amber-100/80 px-1">README.md</code>).
        </p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/category/${c.slug}`}
                className="block rounded-sm border border-zinc-200 bg-white p-5 shadow-sm hover:border-brand"
                data-motion="lift"
              >
                <h2 className="text-lg font-semibold text-zinc-900">{c.name}</h2>
                {c.description && (
                  <p className="mt-2 text-sm text-zinc-500">{c.description}</p>
                )}
                <p className="mt-3 text-xs text-zinc-600">
                  Опубликовано: {c._count.articles}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 text-sm text-zinc-500">
        Вся лента:{" "}
        <Link href="/" className="text-brand hover:underline">
          на главную
        </Link>
      </p>
    </article>
  );
}
