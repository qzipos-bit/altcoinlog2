import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    take: 100,
    include: { category: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Статьи</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Черновик → ревью → опубликовано.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Новая статья
        </Link>
      </div>

      <ul className="divide-y divide-zinc-800 rounded-xl border border-zinc-800">
        {articles.map((a) => (
          <li
            key={a.id}
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
          >
            <div>
              <p className="font-medium text-white">{a.title}</p>
              <p className="text-xs text-zinc-500">
                {a.status}
                {a.category ? ` · ${a.category.name}` : ""} · /news/{a.slug}
              </p>
            </div>
            <Link
              href={`/admin/articles/${a.id}/edit`}
              className="text-sm text-emerald-400 hover:underline"
            >
              Редактировать
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
