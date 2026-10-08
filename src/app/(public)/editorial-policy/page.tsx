import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("editorial-policy");

export default function Page() {
  return <LegalDocumentPage slug="editorial-policy" />;
}
