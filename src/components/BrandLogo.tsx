import Image from "next/image";
import Link from "next/link";

export function BrandLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]"
      aria-label="Altcoinlog — на главную"
    >
      <Image
        src="/brand/logo.png"
        alt="Altcoinlog"
        width={156}
        height={36}
        priority
        className="h-8 w-auto"
      />
    </Link>
  );
}
