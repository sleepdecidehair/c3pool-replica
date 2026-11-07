import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../lib/api/client";
import { XMR_COIN_ID } from "../../lib/format";
import { blockRowsSchema, blocksStatsSchema } from "./schema";
import type { BlockRow } from "./schema";

const STATS_REFETCH_MS = 30_000;

export function useBlocksStats() {
  return useQuery({
    queryKey: ["blocks", "stats"],
    queryFn: async () => blocksStatsSchema.parse(await apiGet<unknown>("/pool/stats")),
    refetchInterval: STATS_REFETCH_MS,
  });
}

export interface BlocksPageData {
  rows: BlockRow[];
  pageIndex: number;
  pageSize: number;
}

export function useBlocks(port: number, page: number, pageSize: number) {
  return useQuery({
    queryKey: ["blocks", "list", port, page, pageSize],
    queryFn: async (): Promise<BlocksPageData> => {
      const path = port === Number(XMR_COIN_ID) ? "/pool/blocks" : `/pool/coin_altblocks/${port}`;
      const rows = blockRowsSchema.parse(
        await apiGet<unknown>(path, { page: page - 1, limit: pageSize }),
      );
      return { rows, pageIndex: page - 1, pageSize };
    },
    retry: false,
  });
}
