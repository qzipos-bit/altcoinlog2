import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("disclaimer");

export default function Page() {
  return <LegalDocumentPage slug="disclaimer" />;
}
