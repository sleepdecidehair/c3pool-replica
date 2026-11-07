import {
  IconStorage,
  IconThunderbolt,
  IconTrophy,
  IconUserGroup,
} from "@arco-design/web-react/icon";
import type { ReactNode } from "react";
import type { DisplayStats } from "../data";

interface StatCard {
  variant: "brand" | "info" | "success" | "warning";
  label: string;
  value: string;
  icon: ReactNode;
}

export function PoolStats({ display }: { display: DisplayStats }) {
  const cards: StatCard[] = [
    {
      variant: "brand",
      label: "Pool hashrate",
      value: display.poolHashrate,
      icon: <IconThunderbolt />,
    },
    { variant: "info", label: "Active miners", value: display.miners, icon: <IconUserGroup /> },
    { variant: "success", label: "Blocks found", value: display.blocks, icon: <IconTrophy /> },
    { variant: "warning", label: "Total payments", value: display.payments, icon: <IconStorage /> },
  ];

  return (
    <section className="pool-stats">
      <div className="pool-stats__inner">
        <div className="pool-stats__grid">
          {cards.map((card) => (
            <div key={card.label} className={`pool-stats__card pool-stats__card--${card.variant}`}>
              <div className="pool-stats__glow" aria-hidden="true" />
              <div className="pool-stats__icon">{card.icon}</div>
              <div className="pool-stats__label">{card.label}</div>
              <div className="pool-stats__value">{card.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
