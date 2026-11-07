import { IconPublic, IconSafe, IconThunderbolt, IconUser } from "@arco-design/web-react/icon";
import type { ReactNode } from "react";

interface Feature {
  index: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const features: Feature[] = [
  {
    index: "01",
    title: "0% fee",
    description: "Transparent payouts, lowest in the industry.",
    icon: <IconThunderbolt />,
  },
  {
    index: "02",
    title: "Global nodes",
    description: "Asia / EU / US mirrors with auto-routing.",
    icon: <IconPublic />,
  },
  {
    index: "03",
    title: "No account needed",
    description: "Just paste your wallet address to view your computing data.",
    icon: <IconUser />,
  },
  {
    index: "04",
    title: "SSL-encrypted",
    description: "All nodes provide TLS/SSL encrypted endpoints.",
    icon: <IconSafe />,
  },
];

export function Features() {
  return (
    <section className="features">
      <div className="features__inner">
        <header className="features__header">
          <span className="features__eyebrow">Pure Computing Power</span>
          <h2 className="features__title">
            Turn hashrate into <span className="gradient-text">real value</span>
          </h2>
        </header>
        <div className="features__grid">
          {features.map((feature) => (
            <div key={feature.index} className="features__card">
              <div className="features__card-num">{feature.index}</div>
              <div className="features__card-icon">{feature.icon}</div>
              <h3 className="features__card-title">{feature.title}</h3>
              <p className="features__card-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
