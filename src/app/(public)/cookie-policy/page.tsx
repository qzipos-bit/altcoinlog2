import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("cookie-policy");

export default function Page() {
  return <LegalDocumentPage slug="cookie-policy" />;
}
