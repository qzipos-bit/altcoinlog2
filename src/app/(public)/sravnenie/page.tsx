import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site";
import { faqJsonLd } from "@/lib/jsonld-faq";

export const metadata: Metadata = {
  title: "Сравнение курсов и криптоплатформ",
  description:
    "Каркас сравнительных таблиц: комиссии, KYC, фиат, поддержка сетей. Высокий монетизационный потенциал при прозрачной методологии.",
  alternates: { canonical: `${getSiteUrl()}/sravnenie` },
};

const rows = [
  {
    name: "Платформа A",
    fee: "0.10% / 0.10%",
    kyc: "от $1k вывод",
    fiat: "SEPA, карты",
    networks: "BTC, ETH, 20+",
  },
  {
    name: "Платформа B",
    fee: "0.08% / 0.10%",
    kyc: "базовый порог ниже",
    fiat: "карты, локальные банки",
    networks: "BTC, ETH, 40+",
  },
  {
    name: "Платформа C",
    fee: "фикс + %",
    kyc: "зависит от региона",
    fiat: "P2P, кэш-пункты",
    networks: "BTC, USDT, 10+",
  },
];

export default function ComparisonPage() {
  const base = getSiteUrl();
  const faqs = [
    {
      question: "Почему в таблице вымышленные названия?",
      answer:
        "Это демонстрационный каркас вёрстки и структуры. Реальные данные подтягиваются из редакционной базы и партнёрских фидов с датой обновления.",
    },
    {
      question: "Как избежать «скрытого спреда» в сравнении?",
      answer:
        "Фиксируем методику: одинаковый объём сделки, одинаковое направление (market/limit), одинаковый способ ввода фиата.",
    },
  ];
  const jsonLd = faqJsonLd(faqs, `${base}/sravnenie`);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-zinc-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Приоритет №4 · высокая сложность
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Сравнение курсов и платформ
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Здесь удобно размещать таблицы, фильтры и «обновлено …» для E-E-A-T.
          Ниже — шаблон таблицы с понятной шапкой и мобильным скроллом.
        </p>
      </header>

      <div className="mt-10 overflow-x-auto rounded-sm border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-[640px] text-left text-sm">
          <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Платформа</th>
              <th className="px-4 py-3">Комиссии (maker/taker)</th>
              <th className="px-4 py-3">KYC / лимиты</th>
              <th className="px-4 py-3">Фиат</th>
              <th className="px-4 py-3">Сети</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {rows.map((r) => (
              <tr key={r.name} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium text-zinc-900">{r.name}</td>
                <td className="px-4 py-3 text-zinc-600">{r.fee}</td>
                <td className="px-4 py-3 text-zinc-600">{r.kyc}</td>
                <td className="px-4 py-3 text-zinc-600">{r.fiat}</td>
                <td className="px-4 py-3 text-zinc-600">{r.networks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-12" aria-labelledby="faq">
        <h2 id="faq" className="text-xl font-semibold text-zinc-900">
          Вопросы читателей
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

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/reitingi"
          className="rounded-sm border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:border-brand"
          data-motion="lift"
        >
          Рейтинги сервисов
        </Link>
        <Link
          href="/kursy-kriptovalut"
          className="rounded-sm border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:border-brand"
          data-motion="lift"
        >
          Курсы
        </Link>
      </div>
    </article>
  );
}
