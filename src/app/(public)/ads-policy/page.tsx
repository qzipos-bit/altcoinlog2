import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("ads-policy");

export default function Page() {
  return <LegalDocumentPage slug="ads-policy" />;
}
