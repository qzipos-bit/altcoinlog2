import { LegalDocumentPage, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("soglasie-na-obrabotku-personalnyh-dannyh");

export default function Page() {
  return <LegalDocumentPage slug="soglasie-na-obrabotku-personalnyh-dannyh" />;
}
