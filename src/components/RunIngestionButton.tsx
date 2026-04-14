"use client";

import { useState, useTransition } from "react";
import { runIngestionAction } from "@/app/admin/ingestion-actions";

export function RunIngestionButton() {
  const [msg, setMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4">
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          setMsg(null);
          startTransition(async () => {
            try {
              const summary = await runIngestionAction();
              setMsg(JSON.stringify(summary, null, 2));
            } catch (e) {
              setMsg(e instanceof Error ? e.message : String(e));
            }
          });
        }}
        className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
      >
        {isPending ? "Загрузка RSS…" : "Запустить ingestion"}
      </button>
      {msg && (
        <pre className="mt-3 max-h-48 overflow-auto rounded-md bg-black/40 p-3 text-xs text-zinc-300">
          {msg}
        </pre>
      )}
    </div>
  );
}
