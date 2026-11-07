import { formatNumber, XMR_BLOCK_TIME_SECONDS, XMR_COIN_ID } from "../../lib/format";
import type { BlockCoin, BlockRow, BlocksStats } from "./schema";

export const DEFAULT_PAGE_SIZE = 15;
export const PAGE_SIZE_OPTIONS = [15, 50, 100];
export const DEFAULT_COIN_PORT = Number(XMR_COIN_ID);

const UNLOCK_CONFIRMATIONS = 30;
const REWARD_DIVISOR = 1e12;

const XMR_FALLBACK: BlockCoin = {
  port: DEFAULT_COIN_PORT,
  symbol: "XMR",
  displayName: "XMR",
  active: true,
  blockTime: XMR_BLOCK_TIME_SECONDS,
  altBlocksFound: 0,
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export type TagColor = "red" | "orange" | "green" | "blue";

export interface BlockStatus {
  label: string;
  color: TagColor;
}

export interface BlockTableRow {
  id: number;
  date: string;
  height: string;
  effort: number;
  reward: string;
  orphaned: boolean;
  status: BlockStatus;
  payment: string;
  hash: string;
}

export function getCoinOptions(stats: BlocksStats | undefined): BlockCoin[] {
  const coins = stats?.pool_statistics.coins;
  if (!coins) return [XMR_FALLBACK];

  const xmr = coins[String(DEFAULT_COIN_PORT)] ?? XMR_FALLBACK;
  const altCoins = Object.values(coins)
    .filter((coin) => coin.port !== DEFAULT_COIN_PORT && coin.active === true)
    .toSorted((a, b) => a.port - b.port);

  return [{ ...xmr, port: DEFAULT_COIN_PORT, active: true }, ...altCoins];
}

export function pickCoin(coins: BlockCoin[], port: number): BlockCoin {
  return coins.find((coin) => coin.port === port) ?? coins[0] ?? XMR_FALLBACK;
}

export function getCoinLabel(coin: BlockCoin): string {
  return coin.displayName && coin.displayName !== coin.symbol
    ? `${coin.symbol} · ${coin.displayName}`
    : coin.symbol;
}

export function getCoinTotal(stats: BlocksStats | undefined, port: number): number {
  if (!stats) return 0;
  const statistics = stats.pool_statistics;
  if (port === DEFAULT_COIN_PORT) return statistics.totalBlocksFound;
  return (
    statistics.altBlocksFound?.[String(port)] ??
    statistics.coins?.[String(port)]?.altBlocksFound ??
    0
  );
}

export function getEffortColor(effort: number): TagColor {
  if (effort > 150) return "red";
  if (effort > 100) return "orange";
  return "green";
}

export function getBlockStatus(
  row: BlockRow,
  coin: BlockCoin,
  stats: BlocksStats | undefined,
): BlockStatus {
  if (!row.valid) return { label: "Orphaned", color: "red" };
  if (row.unlocked) return { label: "Confirmed", color: "green" };

  if (coin.port === DEFAULT_COIN_PORT && stats?.pool_statistics.lastBlockFound !== undefined) {
    const confirmations = stats.pool_statistics.lastBlockFound - row.height;
    const remaining = UNLOCK_CONFIRMATIONS - confirmations;
    const blockTime = coin.blockTime ?? XMR_BLOCK_TIME_SECONDS;

    if (remaining > 0) {
      return { label: `${Math.ceil((remaining * blockTime) / 60)} min left`, color: "blue" };
    }
    if (remaining > -10) return { label: "Soon", color: "blue" };
    return { label: "Delayed", color: "orange" };
  }

  return { label: "Pending", color: "blue" };
}

export function mapBlockRows(
  rows: BlockRow[],
  pageIndex: number,
  pageSize: number,
  coin: BlockCoin,
  stats: BlocksStats | undefined,
): BlockTableRow[] {
  return rows.map((row, index) => {
    const rawReward = row.value;
    const valid = row.valid;
    const unlocked = row.unlocked;
    const reward = valid ? `${(rawReward / REWARD_DIVISOR).toFixed(6)} ${coin.symbol}` : "Orphaned";
    const payment =
      unlocked && rawReward > 0
        ? `${(rawReward / REWARD_DIVISOR).toFixed(6)} ${coin.symbol}`
        : "Pending";

    return {
      id: index + pageIndex * pageSize + 1,
      date: dateFormatter.format(new Date(row.ts)),
      height: formatNumber(row.height),
      effort: row.diff > 0 ? (row.shares * 100) / row.diff : 0,
      reward,
      orphaned: !valid,
      status: getBlockStatus(row, coin, stats),
      payment,
      hash: row.hash,
    };
  });
}
