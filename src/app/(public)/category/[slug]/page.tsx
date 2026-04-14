import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      articles: {
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 50,
      },
    },
  });
  if (!category) notFound();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-zinc-500">Категория</p>
        <h1 className="text-3xl font-bold text-zinc-900">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-zinc-600">{category.description}</p>
        )}
      </div>
      <ul className="space-y-4">
        {category.articles.map((a) => (
          <li key={a.id}>
            <Link
              href={`/news/${a.slug}`}
              className="text-lg font-medium text-zinc-900 hover:text-[color:var(--exchange-accent)] hover:underline"
            >
              {a.title}
            </Link>
            {a.excerpt && (
              <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{a.excerpt}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
