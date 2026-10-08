import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("copyright-policy");

export default function Page() {
  return <LegalDocumentPage slug="copyright-policy" />;
}
