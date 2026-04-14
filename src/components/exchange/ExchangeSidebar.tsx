"use client";

import Link from "next/link";
import type { JSX } from "react";
import { useState } from "react";

type BadgeKind = "new" | "soon" | "pro";

type NavItem = {
  href: string;
  label: string;
  icon: (props: { className?: string }) => JSX.Element;
  badge?: BadgeKind;
};

type NavSection = {
  id: string;
  title: string;
  items: NavItem[];
};

function IconFeed({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function IconNews({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M12 7.5h-3" />
    </svg>
  );
}

function IconGradCap({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41c.06-.18.12-.366.17-.565m0 0a57.03 57.03 0 01-.167-.79c.978.499 1.94.947 2.87 1.291.124.477 2.303.765 3.51.764a59.498 59.498 0 004.23-.732.482.482 0 00.355-.563c-.003-.091-.012-.18-.025-.267C21.36 15.723 19.93 13.74 18 12c-1.93-1.74-3.36-3.723-3.64-5.127-.022-.126-.042-.254-.06-.383-.073-.537-.112-1.08-.112-1.624 0-1.847.37-3.598 1.039-5.197m0 0A59.49 59.49 0 0012 3.493a59.49 59.49 0 00-8.039 5.81m8.039-5.81v4.87"
      />
    </svg>
  );
}

function IconChart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
}

function IconRankings({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function IconArrows({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

function IconScale({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.097 0-2.093-.391-2.864-1.035m2.864 1.035c.77-.644 1.767-1.035 2.864-1.035m0 0V6.75m0 13.5c1.097 0 2.093-.391 2.864-1.035M12 3l-8.25 4.5v9L12 21l8.25-4.5v-9L12 3z" />
    </svg>
  );
}

function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2-1.75 2H5.5c-.963 0-1.75-.906-1.75-2v-4.15m16.5 0a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25m16.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 16.309a2.25 2.25 0 01-1.07-1.916v-.243m18.75 0V9.75A2.25 2.25 0 0018.75 7.5h-13.5A2.25 2.25 0 003 9.75v4.4" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  );
}

function IconRss({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m15-6.75v.75m0 0V9a3.75 3.75 0 11-7.5 0v-.75m7.5 0v.75A3.75 3.75 0 0112 12v.75" />
    </svg>
  );
}

function IconPen({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function IconCalculator({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v-2.25M15.75 8.25V6a.75.75 0 00-.75-.75H9A.75.75 0 008.25 6v2.25M15.75 8.25H8.25M12 12h.008v.008H12V12zm0 3h.008v.008H12V15zm3 0h.008v.008H15V15zm0-3h.008v.008H15V12z" />
    </svg>
  );
}

function IconTable({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3h16.5v18H3.75V3zM3.75 9h16.5M9 3v18" />
    </svg>
  );
}

function IconClipboard({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 3h6m2.25-10.5H15a2.25 2.25 0 00-4.5 0H8.25A2.25 2.25 0 006 6.75v12a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 18.75v-12a2.25 2.25 0 00-2.25-2.25z" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.813-2.969M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function IconQuestion({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  );
}

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  );
}

function IconWallet({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12v6.75A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V12zm-9-3a.75.75 0 01.75-.75v.008a.75.75 0 01-.75.75V9z" />
    </svg>
  );
}

function IconBook({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function IconLightBulb({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.115.07-.218.18-.264l1.552-.68a4.5 4.5 0 002.622-4.103V7.5a4.5 4.5 0 00-9 0v5.928a4.5 4.5 0 002.622 4.103l1.552.68c.11.046.18.149.18.264V18" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.601-2.812a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
}

function IconCog({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.26a1.125 1.125 0 01-.26 1.431l-1.003.827c-.292.24-.437.613-.43.992a6.932 6.932 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.26a1.125 1.125 0 01-1.37.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.26a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.26a1.125 1.125 0 011.37-.491l1.217.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconShopping({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l1.25 4.688M7.5 14.25v-5.25M7.5 14.25h10.125a1.125 1.125 0 001.091-1.44l-1.846-7.5A1.125 1.125 0 0015.75 4.5H7.5m0 0H5.25A2.25 2.25 0 003 6.75v9.75A2.25 2.25 0 005.25 18.75h1.5m3-4.5a.75.75 0 100-1.5.75.75 0 000 1.5zm7.5 0a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
  );
}

function Badge({ kind }: { kind: BadgeKind }) {
  if (kind === "new") {
    return (
      <span className="shrink-0 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
        Новое
      </span>
    );
  }
  if (kind === "soon") {
    return (
      <span className="shrink-0 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
        Скоро
      </span>
    );
  }
  return (
    <span className="shrink-0 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">PRO</span>
  );
}

/** Заглушки для страниц в разработке — единый якорь */
const SOON = "#";

const sections: NavSection[] = [
  {
    id: "main",
    title: "Главное",
    items: [
      { href: "/", label: "Лента", icon: IconFeed },
      { href: "/novosti", label: "Новости", icon: IconNews },
      { href: "/kursy-kriptovalut", label: "Курсы и обучение", icon: IconGradCap },
      { href: "/category/rynok", label: "Рынок", icon: IconChart },
    ],
  },
  {
    id: "market",
    title: "Рынок",
    items: [
      { href: "/reitingi", label: "Рейтинги", icon: IconRankings },
      { href: "/konverter", label: "Конвертер", icon: IconArrows },
      { href: "/sravnenie", label: "Сравнение", icon: IconScale },
      { href: "/registratsiya", label: "Сервисы", icon: IconBriefcase },
    ],
  },
  {
    id: "info",
    title: "Информация",
    items: [
      { href: "/antiskam-audit", label: "Антискам-аудит", icon: IconShield },
      { href: "/registratsiya", label: "Рассылка", icon: IconMail },
      { href: "/otzyvy", label: "Отзывы", icon: IconChat },
      { href: "/feed.xml", label: "RSS", icon: IconRss },
      { href: "/novosti", label: "Редакция", icon: IconPen },
    ],
  },
  {
    id: "tools",
    title: "Инструменты",
    items: [
      { href: "/konverter", label: "Калькулятор прибыли", icon: IconCalculator },
      { href: SOON, label: "Учёт сделок", icon: IconTable },
      { href: SOON, label: "Налоговый калькулятор", icon: IconCalculator },
      { href: SOON, label: "Чек-листы", icon: IconClipboard },
    ],
  },
  {
    id: "jobs",
    title: "Работа и рынок",
    items: [
      { href: SOON, label: "Вакансии в крипте", icon: IconBriefcase },
      { href: SOON, label: "Найти специалиста", icon: IconUsers },
      { href: SOON, label: "Резюме", icon: IconPen },
    ],
  },
  {
    id: "community",
    title: "Комьюнити",
    items: [
      { href: SOON, label: "Чат / обсуждения", icon: IconChat },
      { href: SOON, label: "Вопросы и ответы", icon: IconQuestion },
      { href: "/otzyvy", label: "Разборы участников", icon: IconUsers },
    ],
  },
  {
    id: "companies",
    title: "Компании и сервисы",
    items: [
      { href: "/reitingi/birzhi", label: "Обзоры бирж", icon: IconBuilding },
      { href: "/reitingi/koshelki", label: "Кошельки", icon: IconWallet },
      { href: "/sravnenie", label: "Сервисы", icon: IconBriefcase },
      { href: "/reitingi", label: "Рейтинг платформ", icon: IconStar },
    ],
  },
  {
    id: "knowledge",
    title: "База знаний",
    items: [
      { href: SOON, label: "Термины крипты", icon: IconBook },
      { href: "/kursy-kriptovalut", label: "Гайды", icon: IconGradCap },
      { href: SOON, label: "Объяснение простым языком", icon: IconLightBulb },
    ],
  },
  {
    id: "calendar",
    title: "Календарь",
    items: [
      { href: SOON, label: "События рынка", icon: IconCalendar },
      { href: SOON, label: "Листинги", icon: IconChart },
      { href: SOON, label: "Разлоки токенов", icon: IconArrows },
      { href: SOON, label: "Важные даты", icon: IconCalendar },
    ],
  },
  {
    id: "ratings_hub",
    title: "Рейтинги",
    items: [
      { href: "/reitingi/birzhi", label: "Рейтинг бирж", icon: IconStar },
      { href: "/kursy-kriptovalut", label: "Рейтинг курсов", icon: IconGradCap },
      { href: SOON, label: "Рейтинг стратегий", icon: IconRankings },
    ],
  },
  {
    id: "account",
    title: "Личный кабинет",
    items: [
      { href: "/kursy-kriptovalut", label: "Моё обучение", icon: IconGradCap },
      { href: SOON, label: "Мои покупки", icon: IconShopping },
      { href: "/reitingi/obmenniki", label: "Рейтинг обменников", icon: IconArrows },
      { href: "/admin", label: "Настройки", icon: IconCog },
    ],
  },
  {
    id: "admin",
    title: "PRO",
    items: [{ href: "/admin", label: "Админка", icon: IconCog, badge: "pro" }],
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${open ? "" : "-rotate-180"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
}

export function ExchangeSidebar() {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((s) => [s.id, true])),
  );

  const toggle = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto overflow-x-hidden rounded-xl border border-zinc-200/90 bg-zinc-50 shadow-sm lg:top-24">
      <nav className="divide-y divide-zinc-200/90 text-sm" aria-label="Боковое меню">
        {sections.map((section) => {
          const isOpen = open[section.id] ?? true;
          return (
            <div key={section.id}>
              <button
                type="button"
                onClick={() => toggle(section.id)}
                className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left font-bold text-zinc-900 transition hover:bg-white/70"
                aria-expanded={isOpen}
                aria-controls={`sidebar-section-${section.id}`}
                id={`sidebar-heading-${section.id}`}
              >
                <span>{section.title}</span>
                <ChevronIcon open={isOpen} />
              </button>
              {isOpen && (
                <ul
                  id={`sidebar-section-${section.id}`}
                  role="region"
                  aria-labelledby={`sidebar-heading-${section.id}`}
                  className="border-t border-zinc-200/80 bg-white/60 px-2 pb-2 pt-1"
                >
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={`${section.id}-${item.label}`}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg py-2.5 pl-2 pr-2 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
                        >
                          <Icon className="h-[18px] w-[18px] shrink-0 text-zinc-500" />
                          <span className="min-w-0 flex-1 leading-snug">{item.label}</span>
                          {item.badge && <Badge kind={item.badge} />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
