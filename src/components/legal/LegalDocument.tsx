import type { Metadata } from "next";
import Link from "next/link";
import { SimpleArticleBody } from "@/components/article/SimpleArticleBody";
import { legalDocs, legalNav, type LegalSlug } from "@/content/legal/documents";
import { operator } from "@/content/legal/operator";
import { getSiteUrl } from "@/lib/site";

const dateFormat = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function legalMetadata(slug: Exclude<LegalSlug, "authors">): Metadata {
  const doc = legalDocs[slug];
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `${getSiteUrl()}/${slug}` },
    openGraph: { title: doc.title, description: doc.description, type: "article" },
  };
}

function LegalNav({ current }: { current: LegalSlug }) {
  const groups = [
    { key: "trust", title: "О редакции" },
    { key: "legal", title: "Документы" },
  ] as const;
  return (
    <nav aria-label="Документы Altcoinlog" className="space-y-6 text-sm">
      {groups.map((g) => (
        <div key={g.key}>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">{g.title}</p>
          <ul className="mt-3 space-y-1.5">
            {legalNav
              .filter((item) => item.group === g.key)
              .map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    aria-current={item.slug === current ? "page" : undefined}
                    className={
                      item.slug === current
                        ? "block border-l-2 border-[color:var(--color-brand)] pl-3 font-semibold text-zinc-900"
                        : "block border-l-2 border-transparent pl-3 text-zinc-600 hover:text-zinc-900"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/** Каркас страницы документа: заголовок, дата редакции, текст и навигация по остальным документам. */
export function LegalShell({
  slug,
  h1,
  updated,
  lead,
  children,
}: {
  slug: LegalSlug;
  h1: string;
  updated: string;
  lead?: string;
  children: React.ReactNode;
}) {
  const base = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: h1,
    url: `${base}/${slug}`,
    inLanguage: "ru",
    dateModified: updated,
    publisher: {
      "@type": "Organization",
      name: operator.brand,
      url: base,
      email: operator.emails.support,
      foundingDate: String(operator.foundedYear),
      sameAs: Object.values(operator.social),
    },
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <article className="min-w-0 rounded-sm border border-zinc-200 bg-white p-6 md:p-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <header className="border-b border-zinc-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">{h1}</h1>
          {lead && <p className="mt-3 max-w-3xl text-lg text-zinc-600">{lead}</p>}
          <p className="mt-3 text-sm text-zinc-500">
            Редакция от <time dateTime={updated}>{dateFormat.format(new Date(updated))}</time>
          </p>
        </header>
        <div className="mt-8 max-w-3xl">{children}</div>
      </article>
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-sm border border-zinc-200 bg-white p-6">
          <LegalNav current={slug} />
        </div>
      </aside>
    </div>
  );
}

export function LegalDocumentPage({ slug }: { slug: Exclude<LegalSlug, "authors"> }) {
  const doc = legalDocs[slug];
  return (
    <LegalShell slug={slug} h1={doc.h1} updated={doc.updated}>
      <SimpleArticleBody body={doc.body} />
    </LegalShell>
  );
}
