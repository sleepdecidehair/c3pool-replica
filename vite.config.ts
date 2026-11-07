import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { replicaReplayPlugin } from "./build/vite-plugin-replay.ts";

export default defineConfig({
  plugins: [react(), replicaReplayPlugin()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
  test: {
    environment: "happy-dom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
