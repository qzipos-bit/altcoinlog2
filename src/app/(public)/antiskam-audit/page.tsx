import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { submitAntiskamLead } from "@/app/(public)/lead-actions";
import { getSiteUrl } from "@/lib/site";
import { faqJsonLd } from "@/lib/jsonld-faq";

export const metadata: Metadata = {
  title: "Антискам-аудит сделок и платформ",
  description:
    "Заявка на ручной разбор рисков: домены, контракты, P2P, «гарантированная доходность». Высокий чек при прозрачной методологии.",
  alternates: { canonical: `${getSiteUrl()}/antiskam-audit` },
};

export default function AntiscamPage() {
  const base = getSiteUrl();
  const faqs = [
    {
      question: "Что входит в антискам-аудит?",
      answer:
        "На этапе MVP это intake заявки: вы описываете ситуацию, мы фиксируем контакт и сценарий. Далее подключается чеклист доменов, контрактов, коммуникаций и типовых уловок.",
    },
    {
      question: "Это юридическая или финансовая консультация?",
      answer:
        "Нет. Итог — информационный разбор рисков. Для юридических действий нужен лицензированный специалист в вашей юрисдикции.",
    },
  ];
  const jsonLd = faqJsonLd(faqs, `${base}/antiskam-audit`);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-zinc-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Приоритет №6
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Антискам-аудит
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Форма ниже создаёт лид в базе редакции. Дальше можно подключить CRM,
          статусы заявок и шаблоны отчёта.
        </p>
      </header>

      <section className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Что проверяем</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-600">
            <li>домен, WHOIS, копии известных брендов;</li>
            <li>модель «гарантированной доходности» и давление по срокам;</li>
            <li>P2P / OTC / «гарант» вне биржи;</li>
            <li>подозрительные смарт-контракты (черные списки, риски approve).</li>
          </ul>
          <p className="mt-6 text-sm text-zinc-500">
            Связанные разделы:{" "}
            <Link href="/reitingi/obmenniki" className="text-brand hover:underline">
              рейтинг обменников
            </Link>
            ,{" "}
            <Link href="/otzyvy" className="text-brand hover:underline">
              отзывы
            </Link>
            .
          </p>
        </div>
        <div className="rounded-sm border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Оставить заявку</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Поля с * обязательны. Спам-ботам — honeypot.
          </p>
          <div className="mt-6">
            <LeadForm action={submitAntiskamLead} submitLabel="Отправить заявку" />
          </div>
        </div>
      </section>
    </article>
  );
}
