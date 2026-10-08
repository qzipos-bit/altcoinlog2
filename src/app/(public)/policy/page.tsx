import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("policy");

export default function Page() {
  return <LegalDocumentPage slug="policy" />;
}
