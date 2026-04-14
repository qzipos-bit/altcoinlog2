"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-zinc-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 bg-zinc-950/90">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link href="/admin" className="font-semibold text-emerald-400">
              Altcoinlog Admin
            </Link>
            <Link href="/admin/articles" className="text-zinc-300 hover:text-white">
              Статьи
            </Link>
            <Link href="/admin/moderation" className="text-zinc-300 hover:text-white">
              Модерация
            </Link>
            <Link href="/admin/sources" className="text-zinc-300 hover:text-white">
              Источники
            </Link>
            <Link href="/" className="text-zinc-500 hover:text-zinc-300">
              Сайт
            </Link>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:border-red-800 hover:text-red-300"
          >
            Выйти
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
