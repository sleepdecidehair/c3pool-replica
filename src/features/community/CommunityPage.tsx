import {
  IconEmail,
  IconGithub,
  IconPublic,
  IconSafe,
  IconSend,
  IconTwitter,
} from "@arco-design/web-react/icon";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { PageShell } from "../../components/PageShell";

interface CommunityRoom {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
}

const COMMUNITY_ROOMS: readonly CommunityRoom[] = [
  {
    href: "https://github.com/C3Pool",
    label: "GitHub",
    value: "c3pool",
    icon: <IconGithub />,
  },
  {
    href: "https://t.me/C3PoolChinese",
    label: "Telegram 中文群",
    value: "c3poolchinese",
    icon: <IconSend />,
  },
  {
    href: "https://x.com/C3_Pool",
    label: "X (Twitter)",
    value: "c3_pool",
    icon: <IconTwitter />,
  },
  {
    href: "https://discord.gg/U56FGnNF2N",
    label: "Discord",
    value: "u56fgnnf2n",
    icon: <IconPublic />,
  },
];

const HOUSE_RULES: readonly string[] = [
  "Nobody from C3Pool will ever DM you first asking for funds or keys.",
  "We never ask for a wallet private key or seed phrase. Anyone who does is stealing from you.",
  "Support happens in the public channels — be suspicious of anyone moving you to a private chat.",
  "Never send coins anywhere to “unlock”, “verify” or “upgrade” a payout.",
];

export function CommunityPage() {
  return (
    <PageShell
      title="Community"
      subtitle="Where C3Pool miners actually talk. Pick the room that fits your language."
    >
      <div className="community-page">
        <section className="community-page__section">
          <h2>Join us</h2>
          <div className="community-page__rooms">
            {COMMUNITY_ROOMS.map((room) => (
              <a
                key={room.href}
                className="community-page__room"
                href={room.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="community-page__room-icon">{room.icon}</span>
                <span className="community-page__room-label">{room.label}</span>
                <code className="community-page__room-value">{room.value}</code>
              </a>
            ))}
          </div>
          <div className="community-page__notice">
            <IconSafe />
            <p>
              Impostors copy these names constantly. Before you trust any link, check it here.{" "}
              <Link to="/verify">Verify a channel</Link>
            </p>
          </div>
        </section>

        <section className="community-page__section">
          <h2>House rules</h2>
          <ul className="community-page__rules">
            {HOUSE_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        <section className="community-page__section community-page__support">
          <h2>Prefer email?</h2>
          <p>Write to us and include your mining address if the question is about your account.</p>
          <div className="community-page__support-links">
            <a className="community-page__mail" href="mailto:support@c3pool.com">
              <IconEmail />
              <span>support@c3pool.com</span>
            </a>
            <Link className="community-page__feedback" to="/feedback">
              Product feedback
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
