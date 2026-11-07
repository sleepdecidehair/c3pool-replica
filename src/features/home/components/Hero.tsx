import { IconPublic, IconThunderbolt, IconTrophy } from "@arco-design/web-react/icon";
import type { DisplayStats } from "../data";
import { AddressSearch } from "./AddressSearch";

export function Hero({ display }: { display: DisplayStats }) {
  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__aurora hero__aurora--1" aria-hidden="true" />
      <div className="hero__aurora hero__aurora--2" aria-hidden="true" />
      <div className="hero__aurora hero__aurora--3" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__badge">
          <IconThunderbolt />
          <span>0% fee</span>
          <span className="hero__badge-dot" />
          <span>Global nodes</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">Every computation</span>
          <span className="hero__title-gradient">is an exploration.</span>
        </h1>

        <p className="hero__subtitle">
          Global nodes · Smart switching · Transparent rewards — no hash left behind.
        </p>

        <div className="hero__search">
          <AddressSearch />
        </div>

        <div className="hero__ticker">
          <div className="hero__ticker-item">
            <IconPublic className="hero__ticker-icon hero__ticker-icon--net" />
            <span className="hero__ticker-label">XMR network</span>
            <span className="hero__ticker-value">{display.xmrNetworkHashrate}</span>
          </div>
          <div className="hero__ticker-sep" />
          <div className="hero__ticker-item">
            <span className="hero__ticker-dot" />
            <span className="hero__ticker-label">Pool hashrate</span>
            <span className="hero__ticker-value">{display.poolHashrate}</span>
          </div>
          <div className="hero__ticker-sep" />
          <div className="hero__ticker-item">
            <span className="hero__ticker-dot hero__ticker-dot--accent" />
            <span className="hero__ticker-label">Active miners</span>
            <span className="hero__ticker-value">{display.miners}</span>
          </div>
          <div className="hero__ticker-sep" />
          <div className="hero__ticker-item">
            <IconTrophy className="hero__ticker-icon" />
            <span className="hero__ticker-label">Blocks found</span>
            <span className="hero__ticker-value">{display.blocks}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
