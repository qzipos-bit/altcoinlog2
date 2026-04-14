import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createArticle } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/admin/articles" className="text-sm text-emerald-400 hover:underline">
          ← К списку
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-white">Новая статья</h1>
      </div>

      <form action={createArticle} className="space-y-4">
        <Field label="Заголовок">
          <input
            name="title"
            required
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Slug (опционально)">
          <input
            name="slug"
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Категория">
          <select
            name="categoryId"
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
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Текст (Markdown-ish)">
          <textarea
            name="body"
            required
            rows={14}
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Статус">
          <select
            name="status"
            defaultValue="DRAFT"
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
          Создать
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
