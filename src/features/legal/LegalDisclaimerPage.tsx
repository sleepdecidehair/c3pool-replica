import { LegalArticle } from "./LegalArticle";
import { disclaimerDocument } from "./data";

export function LegalDisclaimerPage() {
  return <LegalArticle {...disclaimerDocument} />;
}
