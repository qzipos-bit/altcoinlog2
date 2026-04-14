import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ratingLandings,
  ratingSlugs,
  type RatingSlug,
} from "@/content/ratings";
import { getSiteUrl } from "@/lib/site";
import { faqJsonLd } from "@/lib/jsonld-faq";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ratingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!ratingSlugs.includes(slug as RatingSlug)) {
    return { title: "Не найдено" };
  }
  const r = ratingLandings[slug as RatingSlug];
  const base = getSiteUrl();
  return {
    title: r.title,
    description: r.description.slice(0, 160),
    alternates: { canonical: `${base}/reitingi/${slug}` },
  };
}

export default async function RatingLandingPage({ params }: Props) {
  const { slug } = await params;
  if (!ratingSlugs.includes(slug as RatingSlug)) notFound();
  const r = ratingLandings[slug as RatingSlug];
  const base = getSiteUrl();

  const faqs = [
    {
      question: "Как формируется позиция в рейтинге?",
      answer:
        "На MVP это контентный каркас. Далее добавляются измеримые метрики, источники и дата обновления для E-E-A-T.",
    },
    {
      question: "Почему у вас нет «топа из 100 бирж»?",
      answer:
        "Качество важнее ширины: лучше меньше позиций с прозрачной методологией, чем бессмысленный список ради объёма страницы.",
    },
  ];

  const jsonLd = faqJsonLd(faqs, `${base}/reitingi/${slug}`);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-sm text-zinc-500">
        <Link href="/reitingi" className="hover:text-brand">
          Рейтинги
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-600">{r.title}</span>
      </nav>

      <header className="mt-6 border-b border-zinc-200 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          {r.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">{r.description}</p>
      </header>

      <section className="mt-10" aria-labelledby="criteria">
        <h2 id="criteria" className="text-xl font-semibold text-zinc-900">
          Критерии (каркас методологии)
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-600">
          {r.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/kursy-kriptovalut"
          className="rounded-sm border border-zinc-200 p-4 text-sm text-zinc-600 hover:border-brand"
          data-motion="lift"
        >
          ← Курсы для контекста спреда
        </Link>
        <Link
          href="/sravnenie"
          className="rounded-sm border border-zinc-200 p-4 text-sm text-zinc-600 hover:border-brand"
          data-motion="lift"
        >
          Сравнение платформ →
        </Link>
      </section>
    </article>
  );
}
