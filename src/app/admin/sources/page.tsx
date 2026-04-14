import { prisma } from "@/lib/prisma";
import { createSource, toggleSourceFormAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function SourcesPage() {
  const sources = await prisma.source.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">RSS-источники</h1>
        <p className="mt-2 text-zinc-400">
          Добавьте ленту — затем запустите ingestion из панели или{" "}
          <code className="text-emerald-400">POST /api/ingestion/run</code>.
        </p>
      </div>

      <form
        action={createSource}
        className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
      >
        <h2 className="text-lg font-semibold text-white">Новый источник</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label className="text-xs text-zinc-500">Название</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="text-xs text-zinc-500">Сайт (URL)</label>
            <input
              name="url"
              required
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="text-xs text-zinc-500">RSS (feed URL)</label>
            <input
              name="feedUrl"
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Сохранить
        </button>
      </form>

      <ul className="space-y-3">
        {sources.map((s) => (
          <li
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3"
          >
            <div>
              <p className="font-medium text-white">{s.name}</p>
              <p className="text-xs text-zinc-500">{s.url}</p>
              {s.feedUrl && (
                <p className="text-xs text-zinc-500">RSS: {s.feedUrl}</p>
              )}
            </div>
            <form action={toggleSourceFormAction}>
              <input type="hidden" name="id" value={s.id} />
              <button
                type="submit"
                className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 hover:border-emerald-800"
              >
                {s.enabled ? "Выключить" : "Включить"}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
