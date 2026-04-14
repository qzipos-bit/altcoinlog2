"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Вход редактора</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Локальный аккаунт из сида:{" "}
            <code className="text-emerald-400">editor@altcoinlog.local</code>
          </p>
        </div>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setPending(true);
            const form = e.currentTarget;
            const fd = new FormData(form);
            const email = String(fd.get("email") ?? "");
            const password = String(fd.get("password") ?? "");
            const res = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });
            setPending(false);
            if (res?.error) {
              setError("Неверный email или пароль.");
              return;
            }
            router.push(callbackUrl);
            router.refresh();
          }}
        >
          <div>
            <label className="block text-xs font-medium text-zinc-400">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none ring-emerald-600 focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400">
              Пароль
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none ring-emerald-600 focus:ring-2"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            {pending ? "Вход…" : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
