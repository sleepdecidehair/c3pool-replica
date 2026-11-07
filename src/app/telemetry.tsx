import type { ReactNode } from "react";
import { TelemetryProvider, type TelemetryConfig } from "react-telemetry-open";

const otlpUrl = import.meta.env.VITE_TELEMETRY_OTLP_URL;

const telemetryConfig: TelemetryConfig = {
  app: { name: "c3pool" },
  exporter: otlpUrl ? { type: "otlp", url: otlpUrl } : { type: "console" },
  sampling: { rate: import.meta.env.DEV ? 1 : 0.1 },
  signals: {
    errors: true,
    interactions: true,
    routes: true,
    network: true,
    webVitals: true,
    longTasks: true,
  },
  privacy: {
    stripQueryParams: true,
    respectDoNotTrack: true,
  },
  debug: import.meta.env.DEV,
};

export function AppTelemetryProvider({ children }: { children: ReactNode }) {
  return <TelemetryProvider config={telemetryConfig}>{children}</TelemetryProvider>;
}
