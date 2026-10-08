import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("affiliate-disclosure");

export default function Page() {
  return <LegalDocumentPage slug="affiliate-disclosure" />;
}
