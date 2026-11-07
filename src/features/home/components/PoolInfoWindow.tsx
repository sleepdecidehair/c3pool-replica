import type { DisplayStats } from "../data";

export function PoolInfoWindow({ display }: { display: DisplayStats }) {
  return (
    <aside className="float-window" aria-label="Pool Info">
      <div className="float-window__header">
        <span className="float-window__dot" />
        <span className="float-window__title">Pool Info</span>
        <span className="float-window__live">LIVE</span>
      </div>
      <div className="float-window__body">
        <div className="float-window__row">
          <span className="float-window__label">Hashrate</span>
          <span className="float-window__value">{display.poolHashrate}</span>
        </div>
        <div className="float-window__row">
          <span className="float-window__label">Miners</span>
          <span className="float-window__value">{display.miners}</span>
        </div>
        <div className="float-window__row">
          <span className="float-window__label">Paid</span>
          <span className="float-window__value">{display.payments}</span>
        </div>
        <div className="float-window__row">
          <span className="float-window__label">Blocks</span>
          <span className="float-window__value">{display.blocks}</span>
        </div>
      </div>
    </aside>
  );
}
