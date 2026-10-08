import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("contact");

export default function Page() {
  return <LegalDocumentPage slug="contact" />;
}
