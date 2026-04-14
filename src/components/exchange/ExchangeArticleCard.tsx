import type { Prisma } from "@prisma/client";
import Link from "next/link";

const cardArticleArgs = {
  include: {
    category: true,
    author: true,
    tags: { include: { tag: true } },
  },
} satisfies Prisma.ArticleFindManyArgs;

export type ExchangeCardArticle = Prisma.ArticleGetPayload<typeof cardArticleArgs>;

function formatDate(d: Date | null) {
  if (!d) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ExchangeArticleCard({ article }: { article: ExchangeCardArticle }) {
  const authorName = article.author?.displayName ?? "Редакция";
  const badgeTags = article.tags.slice(0, 3).map((t) => t.tag);

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3 border-b border-zinc-100 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-700"
            aria-hidden
          >
            {initials(authorName)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900">{authorName}</p>
            <p className="text-xs text-zinc-500">
              <time dateTime={article.publishedAt?.toISOString() ?? ""}>
                {formatDate(article.publishedAt)}
              </time>
            </p>
          </div>
        </div>
        <button
          type="button"
          className="shrink-0 text-xs font-medium text-[color:var(--exchange-accent)] hover:underline"
        >
          Подписаться
        </button>
      </div>

      <div className="px-4 pb-4 pt-3">
        <h2 className="text-lg font-bold leading-snug text-zinc-900 md:text-xl">
          <Link href={`/news/${article.slug}`} className="hover:text-[color:var(--exchange-accent)]">
            {article.title}
          </Link>
        </h2>
        {article.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">{article.excerpt}</p>
        )}

        <Link href={`/news/${article.slug}`} className="relative mt-4 block overflow-hidden rounded-xl bg-zinc-100">
          {article.featuredImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.featuredImageUrl}
              alt=""
              className="aspect-[16/9] w-full object-cover"
            />
          ) : (
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300" />
          )}
          {(article.category || badgeTags.length > 0) && (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {article.category && (
                <span className="rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                  {article.category.name}
                </span>
              )}
              {badgeTags.map((t) => (
                <span
                  key={t.id}
                  className="rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm"
                >
                  {t.name}
                </span>
              ))}
            </div>
          )}
        </Link>

        <div className="mt-3 flex items-center gap-6 text-xs text-zinc-500">
          <span className="inline-flex items-center gap-1">
            <HeartIcon />0
          </span>
          <span className="inline-flex items-center gap-1">
            <StarIcon /> 0
          </span>
          <span className="inline-flex items-center gap-1">
            <ChatIcon /> 0
          </span>
        </div>
      </div>
    </article>
  );
}

function HeartIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.601-2.812a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337L5.05 21l1.475-4.5A8.965 8.965 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  );
}
