import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = await prisma.tag.findUnique({
    where: { slug },
    include: {
      articles: {
        include: {
          article: true,
        },
      },
    },
  });
  if (!tag) notFound();

  const articles = tag.articles
    .map((at) => at.article)
    .filter((a) => a.status === "PUBLISHED")
    .sort(
      (a, b) =>
        (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0),
    );

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-zinc-500">Тег</p>
        <h1 className="text-3xl font-bold text-zinc-900">#{tag.name}</h1>
      </div>
      <ul className="space-y-4">
        {articles.map((a) => (
          <li key={a.id}>
            <Link
              href={`/news/${a.slug}`}
              className="text-lg font-medium text-zinc-900 hover:text-[color:var(--exchange-accent)] hover:underline"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
