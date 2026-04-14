export type SimplePrices = Record<string, Partial<Record<"usd" | "rub", number>>>;

const DEFAULT_IDS =
  "bitcoin,ethereum,tether,solana,binancecoin,ripple,cardano,dogecoin";

export async function fetchSimpleSpotPrices(
  ids: string = DEFAULT_IDS,
): Promise<SimplePrices> {
  const url = new URL("https://api.coingecko.com/api/v3/simple/price");
  url.searchParams.set("ids", ids);
  url.searchParams.set("vs_currencies", "usd,rub");
  url.searchParams.set("precision", "2");

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`CoinGecko HTTP ${res.status}`);
  }

  return (await res.json()) as SimplePrices;
}

export const displayAssetOrder = [
  { id: "bitcoin", label: "Bitcoin", sym: "BTC" },
  { id: "ethereum", label: "Ethereum", sym: "ETH" },
  { id: "tether", label: "Tether", sym: "USDT" },
  { id: "binancecoin", label: "BNB", sym: "BNB" },
  { id: "solana", label: "Solana", sym: "SOL" },
  { id: "ripple", label: "XRP", sym: "XRP" },
  { id: "cardano", label: "Cardano", sym: "ADA" },
  { id: "dogecoin", label: "Dogecoin", sym: "DOGE" },
] as const;
