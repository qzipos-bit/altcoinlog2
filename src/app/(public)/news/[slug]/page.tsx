import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticlePopularAside } from "@/components/article/ArticlePopularAside";
import { ArticleShareRail } from "@/components/article/ArticleShareRail";
import { SimpleArticleBody } from "@/components/article/SimpleArticleBody";
import { prisma } from "@/lib/prisma";
import { readingTimeMinutes } from "@/lib/reading-time";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  if (!article) return { title: "Не найдено" };
  const base = getSiteUrl();
  const title = article.ogTitle ?? article.title;
  const description = article.ogDescription ?? article.excerpt ?? undefined;
  return {
    title,
    description,
    alternates: { canonical: `${base}/news/${article.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      url: `${base}/news/${article.slug}`,
      images: article.featuredImageUrl ? [article.featuredImageUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.featuredImageUrl ? [article.featuredImageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      category: true,
      author: true,
      tags: { include: { tag: true } },
    },
  });
  if (!article) notFound();

  const [popular, related] = await Promise.all([
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 8,
      include: { category: true },
    }),
    prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        id: { not: article.id },
        ...(article.categoryId ? { categoryId: article.categoryId } : {}),
      },
      orderBy: { publishedAt: "desc" },
      take: 4,
      include: { category: true },
    }),
  ]);

  const relatedFallback =
    related.length >= 4
      ? related
      : await prisma.article.findMany({
          where: { status: "PUBLISHED", id: { not: article.id } },
          orderBy: { publishedAt: "desc" },
          take: 4,
          include: { category: true },
        });

  const base = getSiteUrl();
  const canonicalUrl = `${base}/news/${article.slug}`;
  const minutes = readingTimeMinutes(`${article.title} ${article.excerpt ?? ""} ${article.body}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    description: article.excerpt ?? undefined,
    image: article.featuredImageUrl ? [article.featuredImageUrl] : undefined,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author.displayName,
          url: `${base}/tags/${article.author.slug}`,
        }
      : undefined,
    mainEntityOfPage: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "Altcoinlog",
      url: base,
    },
  };

  const authorInitials = article.author?.displayName
    ? article.author.displayName
        .split(/\s+/)
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AL";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[52px_minmax(0,1fr)_280px] lg:items-start">
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <ArticleShareRail url={canonicalUrl} title={article.title} />
          </div>
        </div>

        <article className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-100 px-5 py-4 md:px-8">
              <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 md:text-sm">
                <Link href="/" className="text-zinc-600 transition hover:text-[color:var(--exchange-accent)]">
                  Главная
                </Link>
                <span className="text-zinc-300" aria-hidden>
                  /
                </span>
                {article.category ? (
                  <>
                    <Link
                      href={`/category/${article.category.slug}`}
                      className="text-zinc-600 transition hover:text-[color:var(--exchange-accent)]"
                    >
                      {article.category.name}
                    </Link>
                    <span className="text-zinc-300" aria-hidden>
                      /
                    </span>
                  </>
                ) : null}
                <span className="line-clamp-1 font-medium text-zinc-800">{article.title}</span>
              </nav>
            </div>

            <div className="px-5 pb-10 pt-6 md:px-10 md:pt-8">
              <div className="lg:hidden">
                <ArticleShareRail url={canonicalUrl} title={article.title} />
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 md:mt-2 md:text-[2.125rem] md:leading-tight">
                {article.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
                {article.publishedAt && (
                  <time dateTime={article.publishedAt.toISOString()}>
                    {new Intl.DateTimeFormat("ru-RU", {
                      dateStyle: "long",
                      timeStyle: "short",
                    }).format(article.publishedAt)}
                  </time>
                )}
                {article.author && (
                  <>
                    <span className="text-zinc-300" aria-hidden>
                      ·
                    </span>
                    <span className="font-medium text-zinc-700">{article.author.displayName}</span>
                  </>
                )}
                <span className="text-zinc-300" aria-hidden>
                  ·
                </span>
                <span>{minutes} мин чтения</span>
              </div>

              {article.featuredImageUrl && (
                <div className="mt-8 overflow-hidden rounded-xl bg-zinc-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.featuredImageUrl}
                    alt=""
                    className="aspect-[21/9] w-full object-cover md:aspect-[2.4/1]"
                  />
                </div>
              )}

              {article.excerpt && (
                <p className="mt-8 border-l-4 border-[color:var(--exchange-accent)] bg-zinc-50/80 py-3 pl-4 pr-4 text-lg font-medium leading-snug text-zinc-800">
                  {article.excerpt}
                </p>
              )}

              <div className="mt-8">
                <SimpleArticleBody body={article.body} />
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  href="/registratsiya"
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-brand)] px-8 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-95"
                >
                  Подписаться на дайджест
                </Link>
                <Link
                  href="/antiskam-audit"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[color:var(--color-brand)] bg-white px-8 py-3 text-sm font-bold text-[color:var(--color-brand)] transition hover:bg-red-50"
                >
                  Заказать антискам-аудит
                </Link>
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-zinc-700">Поделиться материалом</p>
                <ArticleShareRail url={canonicalUrl} title={article.title} />
              </div>

              {article.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {article.tags.map((at) => (
                    <Link
                      key={at.tagId}
                      href={`/tags/${at.tag.slug}`}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-[color:var(--exchange-accent)]"
                    >
                      {at.tag.name}
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 md:p-6">
                <div className="flex gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold text-zinc-700"
                    aria-hidden
                  >
                    {authorInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Автор</p>
                    <p className="mt-1 text-lg font-bold text-zinc-900">
                      {article.author?.displayName ?? "Редакция Altcoinlog"}
                    </p>
                    {article.author?.bio && (
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{article.author.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-xl font-bold text-zinc-900">Читайте также</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedFallback.slice(0, 4).map((a) => (
                    <Link
                      key={a.id}
                      href={`/news/${a.slug}`}
                      className="group overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/40 transition hover:border-zinc-300 hover:shadow-md"
                    >
                      <div className="aspect-[16/10] w-full bg-zinc-200">
                        {a.featuredImageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={a.featuredImageUrl}
                            alt=""
                            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                            Без обложки
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="line-clamp-2 text-sm font-bold leading-snug text-zinc-900 group-hover:text-[color:var(--exchange-accent)]">
                          {a.title}
                        </p>
                        {a.publishedAt && (
                          <p className="mt-2 text-xs text-zinc-500">
                            {new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium" }).format(a.publishedAt)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <section className="mt-12 rounded-2xl border border-zinc-200 bg-white px-5 py-6 md:px-8">
                <h2 className="text-lg font-bold text-zinc-900">Комментарии</h2>
                <p className="mt-2 text-sm text-zinc-600">
                  Обсуждение скоро появится. Пока вы можете поделиться мнением в соцсетях.
                </p>
                <form className="mt-6 space-y-3" noValidate>
                  <label className="block text-sm font-medium text-zinc-700" htmlFor="comment-draft">
                    Ваш комментарий
                  </label>
                  <textarea
                    id="comment-draft"
                    name="comment"
                    rows={4}
                    readOnly
                    placeholder="Напишите текст…"
                    className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                  />
                  <button
                    type="button"
                    disabled
                    className="rounded-full bg-[color:var(--color-brand)] px-6 py-2.5 text-sm font-semibold text-white opacity-60"
                  >
                    Отправить (скоро)
                  </button>
                </form>
              </section>

              <p className="mt-10">
                <Link href="/" className="text-sm font-semibold text-[color:var(--exchange-accent)] hover:underline">
                  ← Назад к ленте
                </Link>
              </p>
            </div>
          </div>
        </article>

        <div className="hidden lg:block">
          <div className="sticky top-28">
            <ArticlePopularAside articles={popular} currentId={article.id} />
          </div>
        </div>

        <div className="lg:hidden">
          <ArticlePopularAside articles={popular} currentId={article.id} />
        </div>
      </div>
    </>
  );
}
