import { ExchangeCategoryPills } from "@/components/exchange/ExchangeCategoryPills";
import { ExchangeFooter } from "@/components/exchange/ExchangeFooter";
import { ExchangeHeader } from "@/components/exchange/ExchangeHeader";

export const dynamic = "force-dynamic";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-[color:var(--exchange-shell)] text-zinc-900">
      <ExchangeHeader />
      <ExchangeCategoryPills />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6">{children}</main>
      <ExchangeFooter />
    </div>
  );
}
