import { Alert, Spin } from "@arco-design/web-react";
import { IconLeft } from "@arco-design/web-react/icon";
import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { PageShell } from "../../components/PageShell";
import {
  formatAnnouncementDate,
  getCategoryLabel,
  sanitizeAnnouncementHtml,
  useAnnouncements,
} from "./data";

export function AnnouncementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const announcements = useAnnouncements();
  const announcement = announcements.data?.find((item) => item.id === id);

  const html = useMemo(
    () => sanitizeAnnouncementHtml(announcement?.content_en ?? ""),
    [announcement?.content_en],
  );

  if (announcements.isLoading) {
    return (
      <PageShell title="Announcement">
        <div className="ann-detail__status">
          <Spin />
        </div>
      </PageShell>
    );
  }

  if (announcements.isError) {
    return (
      <PageShell title="Announcement">
        <Alert type="error" content="Unable to load this announcement. Please try again later." />
        <Link to="/announcements" className="ann-detail__back">
          <IconLeft />
          Back to announcements
        </Link>
      </PageShell>
    );
  }

  if (!announcement) {
    return (
      <PageShell title="Announcement not found">
        <p className="ann-detail__empty">
          We could not find an announcement with the id <code>{id ?? ""}</code>.
        </p>
        <Link to="/announcements" className="ann-detail__back">
          <IconLeft />
          Back to announcements
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={announcement.title_en ?? announcement.id}
      subtitle={
        <span className="ann-detail__meta">
          <span
            className={`ann-page__badge ann-page__badge--${announcement.category ?? "general"}`}
          >
            {getCategoryLabel(announcement.category)}
          </span>
          <time dateTime={announcement.created_at}>
            {formatAnnouncementDate(announcement.created_at)}
          </time>
        </span>
      }
    >
      <article className="ann-detail">
        <div className="ann-detail__content" dangerouslySetInnerHTML={{ __html: html }} />
        <footer className="ann-detail__footer">
          <Link to="/announcements" className="ann-detail__back">
            <IconLeft />
            Back to announcements
          </Link>
        </footer>
      </article>
    </PageShell>
  );
}
