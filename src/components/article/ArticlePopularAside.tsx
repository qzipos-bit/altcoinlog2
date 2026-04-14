import type { Prisma } from "@prisma/client";
import Link from "next/link";

const args = {
  include: { category: true },
} satisfies Prisma.ArticleFindManyArgs;

export type PopularArticle = Prisma.ArticleGetPayload<typeof args>;

function formatShort(d: Date | null) {
  if (!d) return "";
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(d);
}

export function ArticlePopularAside({
  articles,
  currentId,
}: {
  articles: PopularArticle[];
  currentId: string;
}) {
  const list = articles.filter((a) => a.id !== currentId).slice(0, 6);

  return (
    <aside className="space-y-4">
      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-bold text-zinc-900">Популярное</h2>
        <p className="mt-1 text-xs text-zinc-500">Свежие материалы редакции</p>
        <ul className="mt-4 space-y-4">
          {list.length === 0 ? (
            <li className="text-sm text-zinc-500">Пока нет других статей</li>
          ) : (
            list.map((a) => (
              <li key={a.id}>
                <Link href={`/news/${a.slug}`} className="group flex gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                    {a.featuredImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.featuredImageUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-zinc-400">
                        AL
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-3 text-sm font-semibold leading-snug text-zinc-900 group-hover:text-[color:var(--exchange-accent)]">
                      {a.title}
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-500">{formatShort(a.publishedAt)}</p>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
        <Link
          href="/"
          className="mt-4 inline-block text-xs font-semibold text-blue-600 hover:underline"
        >
          Все материалы
        </Link>
      </section>
    </aside>
  );
}
