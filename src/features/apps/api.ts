import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiGet } from "../../lib/api/client";

const mobileAppSchema = z.looseObject({
  androidUrl: z.string(),
  playUrl: z.string(),
  iosUrl: z.string().optional(),
  androidVersion: z.string(),
  iosVersion: z.string().optional(),
  androidSize: z.string(),
});

const desktopReleaseSchema = z.looseObject({
  version: z.string(),
  sha256: z.string(),
  download_url: z.string(),
  mirror_url: z.string(),
  file_size: z.number(),
});

export type MobileAppRelease = z.infer<typeof mobileAppSchema>;
export type DesktopRelease = z.infer<typeof desktopReleaseSchema>;

export const MOBILE_APP_FALLBACK: MobileAppRelease = {
  androidUrl: "https://app.blockschina.net/app/android/c3pool-app-1.1.1.apk",
  playUrl: "https://play.google.com/store/apps/details?id=org.c3pool.c3pool_app",
  iosUrl: "",
  androidVersion: "1.1.1",
  iosVersion: "",
  androidSize: "55 MB",
};

export const DESKTOP_RELEASE_FALLBACK: DesktopRelease = {
  version: "1.4.5",
  sha256: "8572ab71407accaebd7a3fdf76534eabd943d0b568cf1aa36266fde12a36ac57",
  download_url:
    "https://github.com/C3Pool/c3-miner-releases/releases/download/v1.4.5/C3Miner-1.4.5-setup.exe",
  mirror_url: "https://update.c3pool.xyz/C3_Setup/C3Miner-1.4.5-setup.exe",
  file_size: 6_014_390,
};

export function useMobileAppRelease() {
  return useQuery({
    queryKey: ["mobile-app-release"],
    queryFn: async () => mobileAppSchema.parse(await apiGet<unknown>("/leaf/public/mobile-app")),
    staleTime: 5 * 60_000,
  });
}

export function useDesktopRelease() {
  return useQuery({
    queryKey: ["desktop-release", "c3-miner-win"],
    queryFn: async () =>
      desktopReleaseSchema.parse(
        await apiGet<unknown>("/leaf/public/desktop-release", { channel: "c3-miner-win" }),
      ),
    staleTime: 5 * 60_000,
  });
}

export function formatFileSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
