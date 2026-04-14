import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import {
  submitNewsletterLead,
  submitRegistrationInterestLead,
} from "@/app/(public)/lead-actions";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Регистрация и рассылка Altcoinlog",
  description:
    "Оставьте email: уведомления о материалах и ранний доступ к закрытым разборам. Отдельная форма — интерес к полноценной регистрации аккаунта.",
  alternates: { canonical: `${getSiteUrl()}/registratsiya` },
};

export default function RegistrationNewsletterPage() {
  return (
    <article>
      <header className="border-b border-zinc-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Приоритет №7
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Регистрация / база / рассылки
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          MVP: собираем лиды в таблицу `MarketingLead` с разными источниками.
          Позже — double opt-in, сегменты, интеграция с почтовым сервисом.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section className="rounded-sm border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Рассылка</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Короткая форма — только контакт и опционально имя.
          </p>
          <div className="mt-6">
            <LeadForm action={submitNewsletterLead} submitLabel="Подписаться" />
          </div>
        </section>

        <section className="rounded-sm border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            Интерес к аккаунту
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Отдельный source в базе — удобно для приоритизации продукта.
          </p>
          <div className="mt-6">
            <LeadForm
              action={submitRegistrationInterestLead}
              submitLabel="Сообщить об интересе"
            />
          </div>
        </section>
      </div>

      <p className="mt-10 text-sm text-zinc-500">
        Юридические тексты (оферта, политика) добавьте отдельными страницами и
        линкуйте из футера. Сейчас:{" "}
        <Link href="/" className="text-brand hover:underline">
          на главную
        </Link>
        .
      </p>
    </article>
  );
}
