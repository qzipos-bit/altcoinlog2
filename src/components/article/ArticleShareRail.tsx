"use client";

import { useState } from "react";

function encode(text: string) {
  return encodeURIComponent(text);
}

export function ArticleShareRail({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const share = [
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encode(url)}&text=${encode(title)}`,
      icon: IconTelegram,
    },
    {
      label: "ВКонтакте",
      href: `https://vk.com/share.php?url=${encode(url)}&title=${encode(title)}`,
      icon: IconVk,
    },
    {
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?url=${encode(url)}&text=${encode(title)}`,
      icon: IconX,
    },
  ] as const;

  return (
    <div className="flex flex-row items-center justify-center gap-2 lg:flex-col lg:items-stretch">
      {share.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
          aria-label={s.label}
        >
          <s.icon className="h-5 w-5" />
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
            /* ignore */
          }
        }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
        aria-label="Копировать ссылку"
        title={copied ? "Скопировано" : "Копировать ссылку"}
      >
        {copied ? <IconCheck className="h-5 w-5 text-emerald-600" /> : <IconLink className="h-5 w-5" />}
      </button>
    </div>
  );
}

function IconTelegram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.924 2.28a1.32 1.32 0 00-1.38-.297L2.34 9.75c-.855.35-.841.56.024 1.89l4.58 1.77 1.77 5.52c.21.66.99.86 1.47.39l2.46-2.37 4.35 3.18c.8.59 1.95.05 2.13-.93l3.09-14.7c.18-.87-.48-1.65-1.35-1.65h-.03zM17.4 5.1L9.9 12.6l-.09 3.6c0 .12-.18.15-.24.03l-1.2-3.72 7.5-6.75c.3-.27.69.15.42.45l-.09-.06z" />
    </svg>
  );
}

function IconVk({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.946 4.03 8.594c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.491 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.5421.253-1.406 2.151-3.574 2.151-3.574.17-.305.458-.491.78-.491h1.744c.525 0 .644.27.525.643-.22.813-2.354 3.27-2.354 3.27-.186.305-.254.44 0 .78.186.254.796.779 1.202 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
