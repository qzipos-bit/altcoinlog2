import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal/LegalDocument";
import { credentials, editorialTeam } from "@/content/legal/authors";
import { getSiteUrl } from "@/lib/site";

const UPDATED = "2026-10-05";

export const metadata: Metadata = {
  title: "Редакция Altcoinlog — авторы и редакторы",
  description:
    "Кто пишет и редактирует материалы Altcoinlog: основатель, главный редактор, журналисты. Квалификация, награды и сертификаты редакции.",
  alternates: { canonical: `${getSiteUrl()}/authors` },
};

export default function AuthorsPage() {
  const base = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: editorialTeam.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        description: m.bio,
        worksFor: { "@type": "Organization", name: "Altcoinlog", url: base },
        ...(m.links?.length ? { sameAs: m.links.map((l) => l.href) } : {}),
      },
    })),
  };

  return (
    <LegalShell
      slug="authors"
      h1="Редакция Altcoinlog"
      updated={UPDATED}
      lead="Мы пишем о практической стороне криптоэкономики: обзоры бирж и сервисов, аналитика рынка, майнинг, Web3 и регулирование. Стараемся объяснять сложное простым языком и отделять факты от шума."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ul className="grid gap-4 sm:grid-cols-2">
        {editorialTeam.map((m) => (
          <li key={m.name} className="rounded-sm border border-zinc-200 p-5">
            <h2 className="text-lg font-semibold text-zinc-900">{m.name}</h2>
            <p className="text-sm font-medium text-[color:var(--color-brand)]">{m.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">{m.bio}</p>
            {m.links && (
              <p className="mt-3 flex gap-3 text-sm">
                {m.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="text-zinc-500 underline underline-offset-2 hover:text-zinc-900"
                  >
                    {l.label}
                  </a>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>

      <section className="mt-12" aria-labelledby="credentials">
        <h2 id="credentials" className="text-2xl font-bold tracking-tight text-zinc-900">
          Награды и сертификаты
        </h2>
        <ol className="mt-6 space-y-5">
          {credentials.map((c) => (
            <li key={c.title} className="border-l-2 border-zinc-200 pl-4 text-sm text-zinc-700">
              <p className="font-medium text-zinc-900">{c.title}</p>
              <p className="mt-1">
                {c.issuer && <>{c.issuer} · </>}
                {c.date} · {c.holder}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-12 text-sm text-zinc-600">
        Как мы работаем с источниками, проверяем факты и исправляем ошибки — в{" "}
        <Link href="/editorial-policy" className="font-medium text-[color:var(--color-brand)] underline underline-offset-2">
          Редакционной политике
        </Link>
        . Хотите стать автором — пишите на{" "}
        <a href="mailto:job@altcoinlog.com" className="font-medium text-[color:var(--color-brand)] underline underline-offset-2">
          job@altcoinlog.com
        </a>
        .
      </p>
    </LegalShell>
  );
}
