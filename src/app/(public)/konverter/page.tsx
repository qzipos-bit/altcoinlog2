import type { Metadata } from "next";
import Link from "next/link";
import { CryptoConverter } from "@/components/crypto-converter";
import { fetchSimpleSpotPrices } from "@/lib/coingecko";
import { getSiteUrl } from "@/lib/site";
import { faqJsonLd } from "@/lib/jsonld-faq";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Конвертер криптовалют — пересчёт по USD",
  description:
    "Быстрый калькулятор пересчёта между популярными активами на базе USD-цены (CoinGecko). Удобно для SEO-трафика «конвертер BTC в ETH».",
  alternates: { canonical: `${getSiteUrl()}/konverter` },
};

export default async function ConverterPage() {
  const base = getSiteUrl();
  const prices = await fetchSimpleSpotPrices().catch(() => ({}));

  const faqs = [
    {
      question: "Насколько точен пересчёт?",
      answer:
        "Калькулятор использует USD как общую базу: amount * (priceA_usd / priceB_usd). Это ориентир, не котировка конкретной биржи.",
    },
    {
      question: "Можно ли добавить фиатные пары?",
      answer:
        "Да: расширяем список vs_currencies и UI. Для SEO создаются отдельные посадочные под «обменник BTC RUB» и т.п.",
    },
  ];

  const jsonLd = faqJsonLd(faqs, `${base}/konverter`);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-zinc-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Приоритет №3
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Конвертер и калькулятор
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Инструмент для удержания пользователя и длинного хвоста запросов. Ниже —
          клиентский пересчёт на базе серверных котировок.
        </p>
      </header>

      <div className="mt-10">
        <CryptoConverter prices={prices} />
      </div>

      <p className="mt-8 text-sm text-zinc-500">
        Нужны курсы в таблице?{" "}
        <Link href="/kursy-kriptovalut" className="text-brand hover:underline">
          Курсы криптовалют
        </Link>
      </p>
    </article>
  );
}
