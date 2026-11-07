import { Link } from "react-router";
import { PageShell } from "../../components/PageShell";
import type { LegalSection } from "./types";
import "./legal.css";

interface LegalArticleProps {
  title: string;
  updated: string;
  articleUpdated: string;
  intro: readonly string[];
  sections: readonly LegalSection[];
  backTo?: string;
  backLabel?: string;
}

interface SectionListProps {
  sections: readonly LegalSection[];
  level: 2 | 3;
}

function SectionList({ sections, level }: SectionListProps) {
  return (
    <>
      {sections.map((section) => (
        <section
          key={section.heading}
          className={`legal-article__section legal-article__section--h${level}`}
        >
          {level === 2 ? (
            <h2 className="legal-article__heading">{section.heading}</h2>
          ) : (
            <h3 className="legal-article__heading">{section.heading}</h3>
          )}
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="legal-article__paragraph">
              {paragraph}
            </p>
          ))}
          {section.list ? (
            <ul className="legal-article__list">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.subsections ? <SectionList sections={section.subsections} level={3} /> : null}
        </section>
      ))}
    </>
  );
}

export function LegalArticle({
  title,
  updated,
  articleUpdated,
  intro,
  sections,
  backTo = "/",
  backLabel = "Back to Home",
}: LegalArticleProps) {
  return (
    <PageShell
      title={title}
      subtitle={
        <span>
          Last updated · <span className="legal-article__date">{updated}</span>
        </span>
      }
    >
      <div className="legal-page">
        <article className="card card--padded legal-article">
          <p className="legal-article__update-time">{articleUpdated}</p>
          {intro.map((paragraph) => (
            <p key={paragraph} className="legal-article__paragraph">
              {paragraph}
            </p>
          ))}
          <SectionList sections={sections} level={2} />
          <footer className="legal-article__footer">
            <Link className="legal-article__back" to={backTo}>
              <span aria-hidden="true">←</span>
              {backLabel}
            </Link>
          </footer>
        </article>
      </div>
    </PageShell>
  );
}

export type { LegalArticleProps };
