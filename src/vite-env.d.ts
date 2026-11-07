/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_TELEMETRY_OTLP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
