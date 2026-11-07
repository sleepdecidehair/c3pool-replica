import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../lib/api/client";
import {
  announcementsSchema,
  networkStatSchema,
  networkStatsSchema,
  poolStatsSchema,
  type Announcements,
  type NetworkStats,
  type PoolStats,
} from "../../lib/api/schemas";
import {
  formatHashrate,
  formatNumber,
  XMR_BLOCK_TIME_SECONDS,
  XMR_COIN_ID,
} from "../../lib/format";

const REFETCH_INTERVAL_MS = 10_000;

export function usePoolStats() {
  return useQuery({
    queryKey: ["pool-stats"],
    queryFn: async () => poolStatsSchema.parse(await apiGet<unknown>("/pool/stats")),
    refetchInterval: REFETCH_INTERVAL_MS,
  });
}

export function useNetworkStats() {
  return useQuery({
    queryKey: ["network-stats"],
    queryFn: async () => networkStatsSchema.parse(await apiGet<unknown>("/network/stats")),
    refetchInterval: REFETCH_INTERVAL_MS,
  });
}

export function useAnnouncements() {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () =>
      announcementsSchema.parse(await apiGet<unknown>("/leaf/public/announcements")),
    staleTime: 5 * 60_000,
  });
}

export interface DisplayStats {
  xmrNetworkHashrate: string;
  poolHashrate: string;
  miners: string;
  blocks: string;
  payments: string;
  minersPaid: string;
}

export function deriveDisplayStats(
  pool: PoolStats | undefined,
  network: NetworkStats | undefined,
): DisplayStats {
  const statistics = pool?.pool_statistics;
  const xmrNetwork = networkStatSchema.safeParse(network?.[XMR_COIN_ID]);
  const xmrHashrate = xmrNetwork.success
    ? xmrNetwork.data.difficulty / XMR_BLOCK_TIME_SECONDS
    : undefined;
  const blocks =
    statistics === undefined
      ? undefined
      : statistics.totalBlocksFound + (statistics.totalAltBlocksFound ?? 0);

  return {
    xmrNetworkHashrate: xmrHashrate === undefined ? "—" : formatHashrate(xmrHashrate),
    poolHashrate: statistics ? formatHashrate(statistics.hashRate) : "—",
    miners: statistics ? formatNumber(statistics.miners) : "—",
    blocks: blocks === undefined ? "—" : formatNumber(blocks),
    payments: statistics ? formatNumber(statistics.totalPayments) : "—",
    minersPaid:
      statistics?.totalMinersPaid === undefined ? "—" : formatNumber(statistics.totalMinersPaid),
  };
}

export function pickAnnouncement(
  data: Announcements | undefined,
): Announcements[number] | undefined {
  if (!data || data.length === 0) return undefined;
  return data.find((item) => item.active !== 0 && item.active !== false) ?? data[0];
}
