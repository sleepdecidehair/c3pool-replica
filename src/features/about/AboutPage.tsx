import { Spin } from "@arco-design/web-react";
import {
  IconPublic,
  IconRight,
  IconSafe,
  IconThunderbolt,
  IconUserGroup,
} from "@arco-design/web-react/icon";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { PageShell } from "../../components/PageShell";
import { formatAnnouncementDate, sortAnnouncements, useAnnouncements } from "../announcements/data";

interface CoreValue {
  title: string;
  description: string;
  icon: ReactNode;
}

const CORE_VALUES: readonly CoreValue[] = [
  {
    title: "Maximum Efficiency",
    description:
      "Smart algorithm scheduling automatically selects the optimal computing path, ensuring no hash goes to waste.",
    icon: <IconThunderbolt />,
  },
  {
    title: "Global Coverage",
    description:
      "Low-latency nodes across four continents with auto-routing, delivering a stable and seamless connection for every user.",
    icon: <IconPublic />,
  },
  {
    title: "Full Transparency",
    description:
      "Zero hidden fees, verifiable settlement records, and real-time dashboards that keep everything visible.",
    icon: <IconSafe />,
  },
  {
    title: "Community Driven",
    description:
      "Built by developers and users who are passionate about distributed technology. The voice of the community drives our evolution.",
    icon: <IconUserGroup />,
  },
];

export function AboutPage() {
  const announcements = useAnnouncements();
  const latest = sortAnnouncements(announcements.data ?? []).slice(0, 3);

  return (
    <PageShell title="About Us" subtitle="Boundless Power, Infinite Exploration">
      <div className="about-page">
        <section className="about-page__section">
          <h2>Our Mission</h2>
          <p>
            We believe every computation holds value. C3Pool&apos;s mission is to provide a fair,
            transparent, and efficient distributed computing platform for users worldwide — turning
            every unit of hashrate into real returns and ensuring every participant shares equally
            in network rewards.
          </p>
        </section>

        <section className="about-page__section">
          <h2>Our Vision</h2>
          <p>
            Boundless Power, Infinite Exploration. We are building a globally distributed hashrate
            network with smart scheduling and low-latency node deployment, removing barriers of
            geography and technical complexity. Wherever you are, whatever hardware you run, you can
            connect and earn in the simplest way possible.
          </p>
        </section>

        <section className="about-page__section">
          <h2>Announcements</h2>
          <p>
            Every announcement the pool has published — new coins, feature changes, maintenance
            notices — newest first.
          </p>
          {announcements.isLoading ? (
            <div className="about-page__notices-status">
              <Spin />
            </div>
          ) : announcements.isError ? (
            <p className="about-page__notices-empty">Announcements are temporarily unavailable.</p>
          ) : (
            <ul className="about-page__notices">
              {latest.map((item) => (
                <li key={item.id}>
                  <Link to={`/announcements/${item.id}`}>
                    <time dateTime={item.created_at}>
                      {formatAnnouncementDate(item.created_at)}
                    </time>
                    <span>{item.title_en ?? item.id}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link to="/announcements" className="about-page__notices-all">
            <span>Open the announcement centre</span>
            <IconRight />
          </Link>
        </section>

        <section className="about-page__section">
          <h2>Core Values</h2>
          <div className="about-page__values">
            {CORE_VALUES.map((value) => (
              <div key={value.title} className="about-page__value-card">
                <div className="about-page__value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
