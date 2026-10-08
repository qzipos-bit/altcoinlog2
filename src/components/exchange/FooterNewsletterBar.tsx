"use client";

import { useActionState } from "react";
import { submitNewsletterLead } from "@/app/(public)/lead-actions";
import { ConsentCheckbox } from "@/components/legal/ConsentCheckbox";

export function FooterNewsletterBar() {
  const [state, formAction, pending] = useActionState(submitNewsletterLead, { ok: false });

  return (
    <div className="border-y border-white/10 bg-[#1a1a1a]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 lg:flex-row lg:items-center lg:gap-8">
        <p className="max-w-xl shrink-0 text-sm leading-snug text-white lg:max-w-[320px]">
          Подпишись на вечернюю рассылку с главными новостями за день
        </p>
        {state.ok ? (
          <p className="text-sm text-white">Готово, вы подписаны на рассылку.</p>
        ) : (
          <form action={formAction} className="flex min-w-0 flex-1 flex-col gap-2 lg:max-w-2xl">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <label htmlFor="footer-newsletter-email" className="text-xs font-medium text-zinc-400">
              Email для рассылки
            </label>
            <div className="flex min-w-0 overflow-hidden rounded-full border border-zinc-400/30 bg-white shadow-sm">
              <input
                id="footer-newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-12 min-w-0 flex-1 border-0 bg-transparent px-4 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:ring-0"
              />
              <button
                type="submit"
                disabled={pending}
                className="h-12 shrink-0 border-l border-zinc-200 bg-white px-5 text-sm font-semibold text-blue-600 hover:bg-zinc-50 disabled:opacity-50"
              >
                {pending ? "Отправка…" : "Подписаться +"}
              </button>
            </div>
            <ConsentCheckbox tone="dark" />
            {state.error && (
              <p className="text-xs text-red-400" role="alert">
                {state.error}
              </p>
            )}
          </form>
        )}
        <p className="shrink-0 text-sm text-white lg:ml-auto lg:self-center lg:text-right">
          699&nbsp;788 уже подписаны
        </p>
      </div>
    </div>
  );
}
