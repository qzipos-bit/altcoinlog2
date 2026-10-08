import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("preduprezhdenie-o-riskah");

export default function Page() {
  return <LegalDocumentPage slug="preduprezhdenie-o-riskah" />;
}
