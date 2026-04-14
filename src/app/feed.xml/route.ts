import RSS from "rss";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = getSiteUrl();
  const feed = new RSS({
    title: "Altcoinlog",
    description: "Крипто-новости и редакционные материалы",
    site_url: base,
    feed_url: `${base}/feed.xml`,
    language: "ru",
    pubDate: new Date(),
  });

  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 50,
    include: { author: true },
  });

  for (const a of articles) {
    feed.item({
      title: a.title,
      description: a.excerpt ?? a.title,
      url: `${base}/news/${a.slug}`,
      guid: `${base}/news/${a.slug}`,
      date: a.publishedAt ?? a.updatedAt,
      author: a.author?.displayName ?? "Altcoinlog",
    });
  }

  const xml = feed.xml({ indent: true });
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
    },
  });
}
