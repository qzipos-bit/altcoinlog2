import Link from "next/link";
import { auth } from "@/auth";
import { RunIngestionButton } from "@/components/RunIngestionButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const session = await auth();
  const [articles, openTasks, sources] = await Promise.all([
    prisma.article.count(),
    prisma.moderationTask.count({ where: { status: "OPEN" } }),
    prisma.source.count(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Панель</h1>
        <p className="mt-2 text-zinc-400">
          Здравствуйте{session?.user?.email ? `, ${session.user.email}` : ""}.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Статьи" value={articles} href="/admin/articles" />
        <StatCard title="Открытые задачи" value={openTasks} href="/admin/moderation" />
        <StatCard title="Источники RSS" value={sources} href="/admin/sources" />
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Быстрые действия</h2>
        <ul className="mt-4 space-y-2 text-sm text-emerald-300">
          <li>
            <Link href="/admin/articles/new" className="hover:underline">
              + Новая статья
            </Link>
          </li>
          <li>
            <Link href="/admin/moderation" className="hover:underline">
              Очередь модерации
            </Link>
          </li>
        </ul>
        <div className="mt-6 space-y-2">
          <p className="text-sm text-zinc-400">Ingestion (RSS → очередь)</p>
          <RunIngestionButton />
          <p className="text-xs text-zinc-600">
            CRON: <code className="text-zinc-400">POST /api/ingestion/run</code> с
            заголовком <code className="text-zinc-400">x-ingestion-secret</code> если
            задан <code className="text-zinc-400">INGESTION_CRON_SECRET</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  href,
}: {
  title: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-emerald-900/60"
    >
      <p className="text-sm text-zinc-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </Link>
  );
}
