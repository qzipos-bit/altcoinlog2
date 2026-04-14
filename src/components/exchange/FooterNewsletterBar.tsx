"use client";

import { useState } from "react";

export function FooterNewsletterBar() {
  const [email, setEmail] = useState("dhgh@gmail.com");

  return (
    <div className="border-y border-white/10 bg-[#1a1a1a]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 lg:flex-row lg:items-center lg:gap-8">
        <p className="max-w-xl shrink-0 text-sm leading-snug text-white lg:max-w-[320px]">
          Подпишись на вечернюю рассылку с главными новостями за день
        </p>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label htmlFor="footer-newsletter-email" className="text-xs font-medium text-zinc-400">
            Email для рассылки
          </label>
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-end lg:max-w-2xl">
            <div className="flex min-w-0 flex-1 overflow-hidden rounded-full border border-zinc-400/30 bg-white shadow-sm">
              <div className="relative min-w-0 flex-1">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dhgh@gmail.com"
                  className="h-12 w-full border-0 bg-transparent pr-10 pl-4 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:ring-0"
                />
                {email.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setEmail("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                    aria-label="Очистить поле"
                  >
                    <span className="text-xl leading-none">×</span>
                  </button>
                )}
              </div>
              <div className="hidden w-px shrink-0 self-stretch bg-zinc-200 sm:block" aria-hidden />
              <button
                type="button"
                className="h-12 shrink-0 bg-white px-5 text-sm font-semibold text-blue-600 hover:bg-zinc-50 sm:border-l sm:border-zinc-200"
              >
                Подписаться +
              </button>
            </div>
          </div>
        </div>
        <p className="shrink-0 text-sm text-white lg:ml-auto lg:self-center lg:text-right">
          699&nbsp;788 уже подписаны
        </p>
      </div>
    </div>
  );
}
