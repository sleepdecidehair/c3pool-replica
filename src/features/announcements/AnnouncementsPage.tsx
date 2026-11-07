import { Alert, Spin, Tabs } from "@arco-design/web-react";
import { IconSearch } from "@arco-design/web-react/icon";
import { useState } from "react";
import { Link } from "react-router";
import { PageShell } from "../../components/PageShell";
import {
  buildAnnouncementFilters,
  formatAnnouncementDate,
  getCategoryLabel,
  getExcerpt,
  sortAnnouncements,
  useAnnouncements,
  type Announcement,
} from "./data";

function AnnouncementList({ items }: { items: readonly Announcement[] }) {
  if (items.length === 0) {
    return <p className="ann-page__empty">No announcements match your search.</p>;
  }

  return (
    <ul className="ann-page__list">
      {items.map((item) => (
        <li key={item.id} className="ann-page__item">
          <Link to={`/announcements/${item.id}`} className="ann-page__link">
            <div className="ann-page__meta">
              <span className={`ann-page__badge ann-page__badge--${item.category ?? "general"}`}>
                {getCategoryLabel(item.category)}
              </span>
              <time className="ann-page__date" dateTime={item.created_at}>
                {formatAnnouncementDate(item.created_at)}
              </time>
            </div>
            <h2 className="ann-page__item-title">{item.title_en ?? item.id}</h2>
            <p className="ann-page__excerpt">{getExcerpt(item)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function AnnouncementsPage() {
  const announcements = useAnnouncements();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const sorted = sortAnnouncements(announcements.data ?? []);
  const filters = buildAnnouncementFilters(sorted);
  const query = search.trim().toLowerCase();

  const visibleFor = (category: string): Announcement[] =>
    sorted.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        query.length === 0 || (item.title_en ?? "").toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

  return (
    <PageShell
      title="Announcements"
      subtitle="Every announcement the pool has published — new coins, feature changes, maintenance notices — newest first."
    >
      <div className="ann-page">
        <div className="ann-page__toolbar">
          <label className="ann-page__search">
            <IconSearch />
            <input
              type="search"
              className="ann-page__search-input"
              placeholder="Search announcement titles"
              aria-label="Search announcement titles"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        {announcements.isLoading ? (
          <div className="ann-page__status">
            <Spin />
          </div>
        ) : announcements.isError ? (
          <Alert type="error" content="Unable to load announcements. Please try again later." />
        ) : (
          <Tabs
            className="ann-page__tabs"
            activeTab={activeCategory}
            onChange={(key) => setActiveCategory(key)}
          >
            {filters.map((filter) => (
              <Tabs.TabPane
                key={filter.key}
                title={
                  <span className="ann-page__tab">
                    <span>{filter.label}</span>
                    <em>{filter.count}</em>
                  </span>
                }
              >
                <AnnouncementList items={visibleFor(filter.key)} />
              </Tabs.TabPane>
            ))}
          </Tabs>
        )}
      </div>
    </PageShell>
  );
}
