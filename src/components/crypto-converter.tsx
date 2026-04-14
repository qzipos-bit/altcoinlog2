"use client";

import { useMemo, useState } from "react";
import type { SimplePrices } from "@/lib/coingecko";
import { displayAssetOrder } from "@/lib/coingecko";

type Props = { prices: SimplePrices };

export function CryptoConverter({ prices }: Props) {
  const [fromId, setFromId] = useState<string>("bitcoin");
  const [toId, setToId] = useState<string>("tether");
  const [amount, setAmount] = useState<string>("1");

  const rate = useMemo(() => {
    const a = prices[fromId]?.usd;
    const b = prices[toId]?.usd;
    if (a === undefined || b === undefined || b === 0) return null;
    return a / b;
  }, [fromId, toId, prices]);

  const parsedAmount = Number(amount.replace(",", "."));
  const out =
    rate !== null && Number.isFinite(parsedAmount)
      ? parsedAmount * rate
      : null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm text-zinc-600">
          Сумма
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-brand"
          />
        </label>
        <label className="text-sm text-zinc-600">
          Из актива
          <select
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
            className="mt-1 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-brand"
          >
            {displayAssetOrder.map((a) => (
              <option key={a.id} value={a.id}>
                {a.sym} — {a.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-zinc-600">
          В актив
          <select
            value={toId}
            onChange={(e) => setToId(e.target.value)}
            className="mt-1 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-brand"
          >
            {displayAssetOrder.map((a) => (
              <option key={a.id} value={a.id}>
                {a.sym} — {a.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-6 border-t border-zinc-200 pt-6">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Ориентир по USD (CoinGecko)
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
          {out === null ? "—" : `${out.toFixed(6)} ${displayAssetOrder.find((x) => x.id === toId)?.sym ?? ""}`}
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          Курс пересчёта: 1 {displayAssetOrder.find((x) => x.id === fromId)?.sym}{" "}
          <span aria-hidden>{"\u2248"}</span>{" "}
          {rate === null ? "—" : rate.toFixed(6)}{" "}
          {displayAssetOrder.find((x) => x.id === toId)?.sym}
        </p>
      </div>
    </div>
  );
}
