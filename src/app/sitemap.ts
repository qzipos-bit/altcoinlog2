import type { MetadataRoute } from "next";
import { ratingSlugs } from "@/content/ratings";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const productHubs: MetadataRoute.Sitemap = [
    { url: `${base}/kursy-kriptovalut`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.95 },
    { url: `${base}/reitingi`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...ratingSlugs.map((slug) => ({
      url: `${base}/reitingi/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    { url: `${base}/konverter`, lastModified: new Date(), changeFrequency: "daily", priority: 0.88 },
    { url: `${base}/sravnenie`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.88 },
    { url: `${base}/novosti`, lastModified: new Date(), changeFrequency: "daily", priority: 0.82 },
    { url: `${base}/antiskam-audit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/registratsiya`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/otzyvy`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const [articles, categories, tags] = await Promise.all([
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
    prisma.category.findMany({ select: { slug: true } }),
    prisma.tag.findMany({ select: { slug: true } }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
  ];

  const newsRoutes = articles.map((a) => ({
    url: `${base}/news/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const tagRoutes = tags.map((t) => ({
    url: `${base}/tags/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...productHubs,
    ...newsRoutes,
    ...categoryRoutes,
    ...tagRoutes,
  ];
}
