import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site";
import { faqJsonLd } from "@/lib/jsonld-faq";

export const metadata: Metadata = {
  title: "Отзывы о криптоплатформах — доверие и конверсия",
  description:
    "Каркас раздела отзывов: методология модерации, E-E-A-T, перелинковка с рейтингами и сравнением. Подходит для UGC и редакционных обзоров.",
  alternates: { canonical: `${getSiteUrl()}/otzyvy` },
};

export default function ReviewsHubPage() {
  const base = getSiteUrl();
  const faqs = [
    {
      question: "Как модерируются отзывы?",
      answer:
        "План: верификация пользователя, антифрод-сигналы, запрет на реферальные ссылки в теле отзыва, публикация только после проверки модератором.",
    },
    {
      question: "Чем отзывы отличаются от рейтинга?",
      answer:
        "Рейтинг — методология и метрики. Отзывы — качественный опыт пользователей. Вместе усиливают конверсию и GEO-цитируемость.",
    },
  ];
  const jsonLd = faqJsonLd(faqs, `${base}/otzyvy`);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-zinc-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Приоритет №8
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Отзывы о платформах
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Здесь удобно собрать шаблоны под «отзывы о бирже X», «отзывы о кошельке
          Y» и связать их с рейтингами и сравнением.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link
          href="/reitingi/birzhi"
          className="rounded-sm border border-zinc-200 p-4 text-sm text-zinc-700 hover:border-brand"
          data-motion="lift"
        >
          Отзывы + рейтинг бирж
        </Link>
        <Link
          href="/reitingi/koshelki"
          className="rounded-sm border border-zinc-200 p-4 text-sm text-zinc-700 hover:border-brand"
          data-motion="lift"
        >
          Отзывы + рейтинг кошельков
        </Link>
        <Link
          href="/sravnenie"
          className="rounded-sm border border-zinc-200 p-4 text-sm text-zinc-700 hover:border-brand"
          data-motion="lift"
        >
          Сравнение перед выбором
        </Link>
      </section>

      <section className="mt-12" aria-labelledby="faq">
        <h2 id="faq" className="text-xl font-semibold text-zinc-900">
          FAQ
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
    </article>
  );
}
