import type { Metadata } from "next";
import Link from "next/link";
import { displayAssetOrder, fetchSimpleSpotPrices } from "@/lib/coingecko";
import { getSiteUrl } from "@/lib/site";
import { faqJsonLd } from "@/lib/jsonld-faq";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Курсы криптовалют онлайн — USD, RUB",
  description:
    "Актуальные курсы Bitcoin, Ethereum, USDT и других активов. Ориентир по CoinGecko + SEO-структура под посадочные и внутренние ссылки.",
  alternates: { canonical: `${getSiteUrl()}/kursy-kriptovalut` },
};

export default async function CryptoRatesPage() {
  const base = getSiteUrl();
  let prices: Awaited<ReturnType<typeof fetchSimpleSpotPrices>> | null = null;
  let error: string | null = null;
  try {
    prices = await fetchSimpleSpotPrices();
  } catch (e) {
    error = e instanceof Error ? e.message : "Не удалось загрузить курсы.";
  }

  const faqs = [
    {
      question: "Откуда берутся курсы на странице?",
      answer:
        "Мы используем публичный API CoinGecko (spot) как ориентир. У бирж и обменников итоговая цена может отличаться из-за спреда, комиссий и ликвидности.",
    },
    {
      question: "Это инвестиционная рекомендация?",
      answer:
        "Нет. Раздел носит информационный характер. Решения о покупке/продаже принимайте самостоятельно или с лицензированным советником.",
    },
    {
      question: "Как часто обновляются данные?",
      answer:
        "Страница кэшируется на стороне сервера примерно на 60 секунд, чтобы балансировать между актуальностью и нагрузкой на API.",
    },
  ];

  const jsonLd = faqJsonLd(faqs, `${base}/kursy-kriptovalut`);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-zinc-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          SEO-посадочная · приоритет №1
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Курсы криптовалют: база органического трафика
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Таблица ниже — живой ориентир по USD/RUB. Дальше сюда легко добавляются
          кластеры «курс BTC к рублю», «курс ETH на сегодня» и т.д. через шаблоны
          и перелинковку.
        </p>
      </header>

      <section className="mt-10" aria-labelledby="rates-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="rates-heading" className="text-xl font-semibold text-zinc-900">
            Спот-ориентиры
          </h2>
          <Link
            href="/konverter"
            className="text-sm font-medium text-brand hover:underline"
            data-motion="lift"
          >
            Перейти в конвертер →
          </Link>
        </div>

        {error ? (
          <p className="mt-4 rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-sm border border-zinc-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3">Актив</th>
                  <th className="px-4 py-3">USD</th>
                  <th className="px-4 py-3">RUB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {displayAssetOrder.map((a) => {
                  const row = prices?.[a.id];
                  return (
                    <tr key={a.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 font-medium text-zinc-900">
                        {a.label}{" "}
                        <span className="text-zinc-500">({a.sym})</span>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">
                        {row?.usd?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        }) ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-zinc-600">
                        {row?.rub?.toLocaleString("ru-RU", {
                          style: "currency",
                          currency: "RUB",
                        }) ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-14" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-xl font-semibold text-zinc-900">
          Частые вопросы
        </h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-medium text-zinc-900">{f.question}</dt>
              <dd className="mt-2 text-zinc-600">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 grid gap-4 border-t border-zinc-200 pt-10 sm:grid-cols-2">
        <Link
          href="/sravnenie"
          className="rounded-sm border border-zinc-200 bg-white p-5 shadow-sm hover:border-brand"
          data-motion="lift"
        >
          <h3 className="font-semibold text-zinc-900">Сравнение платформ</h3>
          <p className="mt-2 text-sm text-zinc-500">
            Таблицы и критерии — высокий коммерческий потенциал.
          </p>
        </Link>
        <Link
          href="/reitingi"
          className="rounded-sm border border-zinc-200 bg-white p-5 shadow-sm hover:border-brand"
          data-motion="lift"
        >
          <h3 className="font-semibold text-zinc-900">Рейтинги сервисов</h3>
          <p className="mt-2 text-sm text-zinc-500">
            Хаб посадочных под «топ бирж», «лучшие кошельки» и т.д.
          </p>
        </Link>
      </section>
    </article>
  );
}
