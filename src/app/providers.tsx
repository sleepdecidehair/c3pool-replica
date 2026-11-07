import { ConfigProvider } from "@arco-design/web-react";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import { PacerProvider } from "@tanstack/react-pacer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { HashRouter } from "react-router";
import { AppTelemetryProvider } from "./telemetry";
import { ThemeEffect } from "./ThemeEffect";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <AppTelemetryProvider>
      <ConfigProvider locale={zhCN}>
        <QueryClientProvider client={queryClient}>
          <PacerProvider>
            <HashRouter>
              <ThemeEffect />
              {children}
            </HashRouter>
          </PacerProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </AppTelemetryProvider>
  );
}
