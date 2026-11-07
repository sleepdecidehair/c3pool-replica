export interface LegalSection {
  heading: string;
  paragraphs: readonly string[];
  list?: readonly string[];
  subsections?: readonly LegalSection[];
}

export interface LegalDocument {
  title: string;
  updated: string;
  articleUpdated: string;
  intro: readonly string[];
  sections: readonly LegalSection[];
}
