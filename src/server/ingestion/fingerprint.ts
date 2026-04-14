import { createHash } from "node:crypto";

export function normalizeSourceUrl(raw: string): string {
  try {
    const u = new URL(raw.trim());
    u.hash = "";
    u.pathname = u.pathname.replace(/\/+$/, "") || "/";
    return `${u.protocol}//${u.host.toLowerCase()}${u.pathname}${u.search}`.toLowerCase();
  } catch {
    return raw.trim().toLowerCase();
  }
}

export function ingestionFingerprint(url: string): string {
  const normalized = normalizeSourceUrl(url);
  return createHash("sha256").update(normalized).digest("hex");
}
