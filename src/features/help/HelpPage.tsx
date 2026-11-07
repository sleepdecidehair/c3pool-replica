import { IconBook, IconEmail, IconRight, IconSearch } from "@arco-design/web-react/icon";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { useState } from "react";
import { PageShell } from "../../components/PageShell";
import { localizedEnglish, useHelpArticles, type HelpArticle } from "./api";
import "./help.css";

const CATEGORY_LABELS: Record<string, string> = {
  account: "Account",
  earnings: "Earnings & payouts",
  security: "Security",
  start: "Getting started",
  troubleshoot: "Troubleshooting",
};

const CATEGORY_ORDER = ["account", "earnings", "security", "start", "troubleshoot"];

const CATEGORY_TABS = [
  { value: "all", label: "All" },
  { value: "start", label: "Getting started" },
  { value: "earnings", label: "Earnings & payouts" },
  { value: "troubleshoot", label: "Troubleshooting" },
  { value: "security", label: "Security" },
  { value: "account", label: "Account" },
] as const;

function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

function sortArticles(articles: HelpArticle[]): HelpArticle[] {
  return articles.toSorted((left, right) => {
    const leftCategory = CATEGORY_ORDER.indexOf(left.category);
    const rightCategory = CATEGORY_ORDER.indexOf(right.category);
    if (leftCategory !== rightCategory) {
      return (
        (leftCategory < 0 ? CATEGORY_ORDER.length : leftCategory) -
        (rightCategory < 0 ? CATEGORY_ORDER.length : rightCategory)
      );
    }
    return left.sortOrder - right.sortOrder;
  });
}

function updatedDate(updatedAt: string): string {
  return updatedAt.slice(0, 10);
}

export function HelpPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [debouncedQuery] = useDebouncedValue(query, { wait: 220 });
  const { data, isPending, isError, refetch } = useHelpArticles();

  const articles = data ? sortArticles(data) : [];
  const needle = debouncedQuery.trim().toLowerCase();
  const filtered = articles.filter((article) => {
    if (category !== "all" && article.category !== category) return false;
    if (!needle) return true;
    return [
      localizedEnglish(article.title),
      localizedEnglish(article.summary),
      categoryLabel(article.category),
    ].some((value) => value.toLowerCase().includes(needle));
  });

  return (
    <div className="help-page">
      <PageShell
        title={
          <>
            <span className="help-page__icon" aria-hidden="true">
              <IconBook />
            </span>
            <span>Help Center</span>
          </>
        }
        subtitle="Step-by-step guides for getting started, earnings, payouts and troubleshooting."
      >
        <div className="help-page__body">
          <div className="help-page__search">
            <IconSearch aria-hidden="true" />
            <input
              type="search"
              aria-label="Search guides"
              placeholder="Search guides"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="help-page__tabs" role="group" aria-label="Guide categories">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                className={category === tab.value ? "help-page__tab is-active" : "help-page__tab"}
                aria-pressed={category === tab.value}
                onClick={() => setCategory(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isPending ? <p className="help-page__status">Loading guides…</p> : null}

          {isError ? (
            <div className="help-page__status help-page__status--error" role="alert">
              <p>Unable to load the help guides.</p>
              <button type="button" onClick={() => void refetch()}>
                Retry
              </button>
            </div>
          ) : null}

          {!isPending && !isError && filtered.length === 0 ? (
            <p className="help-page__status">No guides match your search.</p>
          ) : null}

          <div className="help-page__grid">
            {filtered.map((article) => (
              <a key={article.slug} href={`#/help/${article.slug}`} className="help-card">
                <span className="help-card__cat">{categoryLabel(article.category)}</span>
                <h3 className="help-card__title">{localizedEnglish(article.title)}</h3>
                <p className="help-card__summary">{localizedEnglish(article.summary)}</p>
                <span className="help-card__foot">
                  <span>Updated {updatedDate(article.updatedAt)}</span>
                  <IconRight aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>

          <div className="help-page__stuck">
            <div>
              <h3>Still stuck?</h3>
              <p>Send us the details and we will look into it.</p>
              <p className="help-page__stuck-alt">
                Or email <a href="mailto:support@c3pool.com">support@c3pool.com</a>
              </p>
            </div>
            <div className="help-page__stuck-actions">
              <a className="help-page__stuck-link" href="#/feedback">
                <IconEmail aria-hidden="true" />
                Send feedback
              </a>
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
