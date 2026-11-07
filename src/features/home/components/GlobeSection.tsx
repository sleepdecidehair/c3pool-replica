import { Globe3D } from "./Globe3D";

const regions = ["North America", "South America", "Europe", "Asia"];

export function GlobeSection() {
  return (
    <section className="globe-section">
      <div className="globe-section__inner">
        <header className="globe-section__header">
          <span className="globe-section__eyebrow">Global Infrastructure</span>
          <h2 className="globe-section__title">Hashrate nodes around the globe</h2>
          <p className="globe-section__hint">
            Low-latency stratum nodes across four continents, auto-routed to the nearest region.
          </p>
        </header>

        <div className="stage">
          <div className="stars" aria-hidden="true" />
          <div className="stars stars--2" aria-hidden="true" />
          <div className="orbit orbit--1" aria-hidden="true" />
          <div className="orbit orbit--2" aria-hidden="true" />
          <div className="stage__globe">
            <div className="globe3d">
              <Globe3D />
            </div>
          </div>
        </div>

        <div className="region-chips">
          {regions.map((region) => (
            <div key={region} className="region-chip">
              <span className="region-chip__dot" />
              <span className="region-chip__name">{region}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
