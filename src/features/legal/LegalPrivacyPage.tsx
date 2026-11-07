import { LegalArticle } from "./LegalArticle";
import { privacyDocument } from "./data";

export function LegalPrivacyPage() {
  return <LegalArticle {...privacyDocument} />;
}
