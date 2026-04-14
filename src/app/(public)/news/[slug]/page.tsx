import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
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

  const base = getSiteUrl();
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
    mainEntityOfPage: `${base}/news/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Altcoinlog",
      url: base,
    },
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-6 flex flex-wrap gap-2 text-sm text-zinc-500">
        {article.category && (
          <Link
            href={`/category/${article.category.slug}`}
            className="text-[color:var(--exchange-accent)] hover:underline"
          >
            {article.category.name}
          </Link>
        )}
        {article.publishedAt && (
          <time dateTime={article.publishedAt.toISOString()}>
            {new Intl.DateTimeFormat("ru-RU", {
              dateStyle: "long",
              timeStyle: "short",
            }).format(article.publishedAt)}
          </time>
        )}
        {article.author && (
          <span className="text-zinc-600">· {article.author.displayName}</span>
        )}
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
        {article.title}
      </h1>
      {article.excerpt && (
        <p className="mt-4 text-lg text-zinc-600">{article.excerpt}</p>
      )}
      <div className="mt-10 max-w-none space-y-4 whitespace-pre-wrap text-base leading-relaxed text-zinc-800">
        {article.body}
      </div>
      {article.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-zinc-200 pt-8">
          {article.tags.map((at) => (
            <Link
              key={at.tagId}
              href={`/tags/${at.tag.slug}`}
              className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:border-[color:var(--exchange-accent)]"
            >
              #{at.tag.name}
            </Link>
          ))}
        </div>
      )}
      <p className="mt-10">
        <Link href="/" className="text-[color:var(--exchange-accent)] hover:underline">
          ← К ленте
        </Link>
      </p>
    </article>
  );
}
