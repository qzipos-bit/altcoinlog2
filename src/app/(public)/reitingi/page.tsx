import type { Metadata } from "next";
import Link from "next/link";
import { ratingLandings, ratingSlugs } from "@/content/ratings";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Рейтинги криптосервисов — биржи, кошельки, обменники",
  description:
    "Хаб SEO-посадочных: биржи, кошельки, обменники, staking. Внутренняя перелинковка с курсами, сравнением и новостями.",
  alternates: { canonical: `${getSiteUrl()}/reitingi` },
};

export default function RatingsHubPage() {
  return (
    <article>
      <header className="border-b border-zinc-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Приоритет №2
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Рейтинги топ-сервисов
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Каждый подраздел — отдельная SEO-ветка с возможностью наращивать
          микроразметку, обзоры и партнёрские блоки (аккуратно и прозрачно для
          читателя).
        </p>
      </header>

      <ul className="mt-10 space-y-4">
        {ratingSlugs.map((slug) => {
          const r = ratingLandings[slug];
          return (
            <li key={slug}>
              <Link
                href={`/reitingi/${slug}`}
                className="block rounded-sm border border-zinc-200 bg-white p-5 shadow-sm hover:border-brand"
                data-motion="lift"
              >
                <h2 className="text-lg font-semibold text-zinc-900">{r.title}</h2>
                <p className="mt-2 text-sm text-zinc-500">{r.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
