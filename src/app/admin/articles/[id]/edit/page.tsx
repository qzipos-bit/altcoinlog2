import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { applyAiDraftToArticleAction } from "@/app/admin/moderation/actions";
import { updateArticle } from "../../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: { ingestionSource: true },
  });
  if (!article) notFound();

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  const updateWithId = updateArticle.bind(null, article.id);
  const aiAction = applyAiDraftToArticleAction.bind(null, article.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/admin/articles" className="text-sm text-emerald-400 hover:underline">
          ← К списку
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-white">Редактирование</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Публичный URL:{" "}
          <Link className="text-emerald-400 hover:underline" href={`/news/${article.slug}`}>
            /news/{article.slug}
          </Link>
        </p>
      </div>

      {article.ingestionSource && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
          <p className="text-sm text-zinc-300">
            Связано с ingestion. Можно сгенерировать черновик текста (OpenAI при наличии ключа,
            иначе — безопасный stub).
          </p>
          <form action={aiAction} className="mt-3">
            <button
              type="submit"
              className="rounded-md border border-emerald-800 px-3 py-2 text-sm text-emerald-300 hover:bg-emerald-950/40"
            >
              AI / stub → в тело статьи
            </button>
          </form>
        </div>
      )}

      <form action={updateWithId} className="space-y-4">
        <Field label="Заголовок">
          <input
            name="title"
            required
            defaultValue={article.title}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Slug">
          <input
            name="slug"
            defaultValue={article.slug}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Категория">
          <select
            name="categoryId"
            defaultValue={article.categoryId ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          >
            <option value="">—</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Лид / excerpt">
          <textarea
            name="excerpt"
            rows={3}
            defaultValue={article.excerpt ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Текст">
          <textarea
            name="body"
            required
            rows={16}
            defaultValue={article.body}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="OG title">
          <input
            name="ogTitle"
            defaultValue={article.ogTitle ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="OG description">
          <textarea
            name="ogDescription"
            rows={2}
            defaultValue={article.ogDescription ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Статус">
          <select
            name="status"
            defaultValue={article.status}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          >
            <option value="DRAFT">Черновик</option>
            <option value="REVIEW">На ревью</option>
            <option value="PUBLISHED">Опубликовано</option>
            <option value="ARCHIVED">Архив</option>
          </select>
        </Field>
        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-zinc-400">{label}</label>
      {children}
    </div>
  );
}
