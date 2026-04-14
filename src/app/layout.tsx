import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Altcoinlog — крипто-новости",
    template: "%s | Altcoinlog",
  },
  description:
    "Altcoinlog 2.0: криптовалютные новости, редакция, RSS и модерация контента.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Altcoinlog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[color:var(--exchange-shell)] text-zinc-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
