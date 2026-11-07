import { Button, Checkbox, Modal } from "@arco-design/web-react";
import { IconClose } from "@arco-design/web-react/icon";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import type { Announcement } from "../../../lib/api/schemas";
import { formatAnnouncementDate } from "../../../lib/format";

const DISMISS_KEY = "c3.notice.dismissed";
const ANNOUNCEMENT_IMAGE =
  "https://iconc3.oss-cn-hongkong.aliyuncs.com/help/img/202610/c3miner-dashboard-en-d32082836044.jpg";

function toSafeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .replace(/javascript:/gi, "")
    .replaceAll(ANNOUNCEMENT_IMAGE, "/replica-assets/c3miner-dashboard.jpg");
}

export function AnnouncementModal({ announcement }: { announcement: Announcement | undefined }) {
  const [remember, setRemember] = useState(false);
  const [dismissedId, setDismissedId] = useState<string | null>(() =>
    window.localStorage.getItem(DISMISS_KEY),
  );
  const [closed, setClosed] = useState(false);

  const contentEn = announcement?.content_en;
  const html = useMemo(() => (contentEn ? toSafeHtml(contentEn) : ""), [contentEn]);
  const visible = Boolean(announcement) && !closed && dismissedId !== announcement?.id;

  const close = () => {
    if (announcement && remember) {
      window.localStorage.setItem(DISMISS_KEY, announcement.id);
      setDismissedId(announcement.id);
    }
    setClosed(true);
  };

  return (
    <Modal
      className="announcement-modal"
      visible={visible}
      onCancel={close}
      footer={null}
      closable={false}
      maskClosable
      autoFocus={false}
    >
      <div className="announcement-modal__hero">
        <span className="announcement-modal__badge">Announcement</span>
        <span className="announcement-modal__date">
          {formatAnnouncementDate(announcement?.created_at)}
        </span>
        <button
          type="button"
          className="announcement-modal__close"
          onClick={close}
          aria-label="Close announcement"
        >
          <IconClose />
        </button>
        <h2 className="announcement-modal__title">{announcement?.title_en ?? "Announcement"}</h2>
      </div>

      <div className="announcement-modal__body" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="announcement-modal__footer">
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <Checkbox checked={remember} onChange={(checked) => setRemember(checked)}>
            Don&apos;t show again
          </Checkbox>
          <Link className="announcement-modal__archive" to="/announcements" onClick={close}>
            View archive
          </Link>
        </div>
        <Button type="primary" size="small" onClick={close}>
          Got it
        </Button>
      </div>
    </Modal>
  );
}
