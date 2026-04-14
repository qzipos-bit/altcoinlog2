import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { moderationFormAction } from "./form-actions";

export const dynamic = "force-dynamic";

export default async function ModerationPage() {
  const tasks = await prisma.moderationTask.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" },
    include: {
      ingestionItem: { include: { source: true } },
      article: true,
    },
  });

  const ingestionTasks = tasks.filter((t) => t.type === "INGESTION_REVIEW");
  const articleTasks = tasks.filter((t) => t.type === "ARTICLE_REVIEW");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Модерация</h1>
        <p className="mt-2 text-zinc-400">
          Ingestion попадает сюда после дедупликации. Статьи в статусе ревью —
          отдельная очередь.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Ingestion</h2>
        {ingestionTasks.length === 0 ? (
          <p className="text-sm text-zinc-500">Пусто.</p>
        ) : (
          <ul className="space-y-4">
            {ingestionTasks.map((t) => {
              const item = t.ingestionItem;
              if (!item) return null;
              return (
                <li
                  key={t.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
                >
                  <p className="text-xs text-zinc-500">
                    {item.source.name} ·{" "}
                    {new Intl.DateTimeFormat("ru-RU").format(item.fetchedAt)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p className="mt-2 line-clamp-4 text-sm text-zinc-400">
                      {item.summary}
                    </p>
                  )}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm text-emerald-400 hover:underline"
                  >
                    Открыть источник
                  </a>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <form action={moderationFormAction}>
                      <input type="hidden" name="intent" value="promote_ingestion" />
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                      >
                        В черновик
                      </button>
                    </form>
                    <form action={moderationFormAction}>
                      <input type="hidden" name="intent" value="reject_ingestion" />
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:border-red-800 hover:text-red-300"
                      >
                        Отклонить
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Ревью статей</h2>
        {articleTasks.length === 0 ? (
          <p className="text-sm text-zinc-500">Пусто.</p>
        ) : (
          <ul className="space-y-4">
            {articleTasks.map((t) => {
              const a = t.article;
              if (!a) return null;
              return (
                <li
                  key={t.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">{a.title}</h3>
                  <p className="mt-1 text-xs text-zinc-500">Статус: {a.status}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/admin/articles/${a.id}/edit`}
                      className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:border-emerald-800"
                    >
                      Редактировать
                    </Link>
                    <form action={moderationFormAction}>
                      <input
                        type="hidden"
                        name="intent"
                        value="approve_article_review"
                      />
                      <input type="hidden" name="id" value={a.id} />
                      <button
                        type="submit"
                        className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                      >
                        Опубликовать
                      </button>
                    </form>
                    <form action={moderationFormAction}>
                      <input
                        type="hidden"
                        name="intent"
                        value="reject_article_review"
                      />
                      <input type="hidden" name="id" value={a.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:border-red-800 hover:text-red-300"
                      >
                        Вернуть в черновик
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
