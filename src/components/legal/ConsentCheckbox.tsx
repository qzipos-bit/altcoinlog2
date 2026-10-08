import Link from "next/link";

/** Отдельное согласие на обработку ПД (152-ФЗ, ст. 9 — оформляется отдельно от других документов, галочка не проставлена заранее). */
export function ConsentCheckbox({ tone = "light" }: { tone?: "light" | "dark" }) {
  const text = tone === "dark" ? "text-zinc-400" : "text-zinc-600";
  const link = tone === "dark" ? "text-zinc-200 underline" : "text-zinc-900 underline";
  return (
    <label className={`flex items-start gap-2 text-xs leading-snug ${text}`}>
      <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--color-brand)]" />
      <span>
        Я даю{" "}
        <Link href="/soglasie-na-obrabotku-personalnyh-dannyh" target="_blank" className={link}>
          согласие на обработку персональных данных
        </Link>{" "}
        и подтверждаю, что ознакомлен с{" "}
        <Link href="/policy" target="_blank" className={link}>
          Политикой обработки персональных данных
        </Link>
        .
      </span>
    </label>
  );
}
