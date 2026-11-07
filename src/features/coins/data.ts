import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { z } from "zod";
import { apiGet } from "../../lib/api/client";

const REFETCH_INTERVAL_MS = 10_000;
const XMR_PORT = "18081";
const DEFAULT_BLOCK_TIME_SECONDS = 120;

const coinSchema = z.looseObject({
  port: z.number(),
  symbol: z.string(),
  displayName: z.string().optional(),
  active: z.boolean().optional(),
  hashrate: z.number().optional(),
  miners: z.number().optional(),
  altBlocksFound: z.number().optional(),
  blockTime: z.number().optional(),
});

const poolStatisticsSchema = z.looseObject({
  totalBlocksFound: z.number(),
  totalAltBlocksFound: z.number().optional(),
  activePorts: z.array(z.union([z.number(), z.string()])).default([]),
  currentEfforts: z.record(z.string(), z.number()).optional(),
  coinProfit: z.record(z.string(), z.number()).optional(),
  activePortProfit: z.number().optional(),
  portHash: z.record(z.string(), z.number()).optional(),
  portMinerCount: z.record(z.string(), z.number()).optional(),
  altBlocksFound: z.record(z.string(), z.number()).optional(),
  coins: z.record(z.string(), coinSchema).default({}),
});

const poolStatsSchema = z.looseObject({
  pool_statistics: poolStatisticsSchema,
});

const networkStatSchema = z.looseObject({
  difficulty: z.number(),
});

type NetworkStat = z.infer<typeof networkStatSchema>;

const networkStatsSchema = z.record(z.string(), z.unknown()).transform((raw) => {
  const stats: Record<string, NetworkStat> = {};

  for (const [port, value] of Object.entries(raw)) {
    const parsed = networkStatSchema.safeParse(value);
    if (parsed.success) stats[port] = parsed.data;
  }

  return stats;
});

export type PoolStats = z.infer<typeof poolStatsSchema>;
export type NetworkStats = z.infer<typeof networkStatsSchema>;

export function usePoolStats() {
  return useQuery({
    queryKey: ["coins", "pool-stats"],
    queryFn: async () => poolStatsSchema.parse(await apiGet<unknown>("/pool/stats")),
    refetchInterval: REFETCH_INTERVAL_MS,
  });
}

export function useNetworkStats() {
  return useQuery({
    queryKey: ["coins", "network-stats"],
    queryFn: async () => networkStatsSchema.parse(await apiGet<unknown>("/network/stats")),
    refetchInterval: REFETCH_INTERVAL_MS,
  });
}

export interface CoinRow {
  port: string;
  coin: string;
  activeMiners: number;
  effort: number;
  poolHashrate: number;
  networkHashrate: number;
  blocksFound: number;
  profit: number;
}

function resolvePorts(pool: PoolStats | undefined): string[] {
  const statistics = pool?.pool_statistics;
  if (!statistics) return [];

  const activePorts =
    statistics.activePorts.length > 0
      ? statistics.activePorts.map(String)
      : Object.values(statistics.coins)
          .filter((coin) => coin.active !== false)
          .map((coin) => String(coin.port));

  return [...new Set(activePorts)];
}

export function buildCoinRows(
  pool: PoolStats | undefined,
  network: NetworkStats | undefined,
): CoinRow[] {
  const statistics = pool?.pool_statistics;
  if (!statistics) return [];

  const currentEfforts = statistics.currentEfforts ?? {};
  const coinProfit = statistics.coinProfit ?? {};
  const portHash = statistics.portHash ?? {};
  const portMinerCount = statistics.portMinerCount ?? {};
  const activePortProfit = statistics.activePortProfit ?? 0;

  const rows: CoinRow[] = [];

  for (const port of resolvePorts(pool)) {
    const coin = statistics.coins[port];
    if (!coin) continue;

    const difficulty = network?.[port]?.difficulty ?? 0;
    const efforts = currentEfforts[port] ?? 0;
    const blockTime = coin.blockTime ?? DEFAULT_BLOCK_TIME_SECONDS;
    const profitFactor = coinProfit[port] ?? 0;

    rows.push({
      port,
      coin: coin.displayName || coin.symbol,
      activeMiners: portMinerCount[port] ?? 0,
      effort: difficulty > 0 ? (efforts / difficulty) * 100 : 0,
      poolHashrate: portHash[port] ?? 0,
      networkHashrate: difficulty > 0 && blockTime > 0 ? Math.floor(difficulty / blockTime) : 0,
      blocksFound: port === XMR_PORT ? statistics.totalBlocksFound : (coin.altBlocksFound ?? 0),
      profit: activePortProfit > 0 ? (profitFactor / activePortProfit) * 100 : 0,
    });
  }

  return rows;
}

export function useCoinsData() {
  const poolStats = usePoolStats();
  const networkStats = useNetworkStats();

  const rows = useMemo(
    () => buildCoinRows(poolStats.data, networkStats.data),
    [poolStats.data, networkStats.data],
  );

  return {
    rows,
    isLoading: poolStats.isLoading || networkStats.isLoading,
    isError: poolStats.isError || networkStats.isError,
  };
}
