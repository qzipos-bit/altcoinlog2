import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("user-agreement");

export default function Page() {
  return <LegalDocumentPage slug="user-agreement" />;
}
