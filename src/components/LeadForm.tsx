"use client";

import { useActionState } from "react";

type Props = {
  action: (
    prev: { ok: boolean; error?: string } | undefined,
    formData: FormData,
  ) => Promise<{ ok: boolean; error?: string }>;
  submitLabel: string;
};

export function LeadForm({ action, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, { ok: false });

  if (state.ok) {
    return (
      <p className="rounded-sm border border-brand/40 bg-brand/10 px-4 py-3 text-sm text-zinc-900">
        Заявка принята. Мы свяжемся по email.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-zinc-600">
          Имя
          <input
            name="name"
            className="mt-1 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-brand"
          />
        </label>
        <label className="text-sm text-zinc-600">
          Email *
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-brand"
          />
        </label>
      </div>
      <label className="text-sm text-zinc-600">
        Телефон (необязательно)
        <input
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-brand"
        />
      </label>
      <label className="text-sm text-zinc-600">
        Сообщение
        <textarea
          name="message"
          rows={4}
          className="mt-1 w-full rounded-sm border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-brand"
        />
      </label>
      {state.error && (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-sm bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
      >
        {pending ? "Отправка…" : submitLabel}
      </button>
    </form>
  );
}
