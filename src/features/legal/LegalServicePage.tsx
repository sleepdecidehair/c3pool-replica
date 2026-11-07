import { LegalArticle } from "./LegalArticle";
import { serviceDocument } from "./data";

export function LegalServicePage() {
  return <LegalArticle {...serviceDocument} />;
}
