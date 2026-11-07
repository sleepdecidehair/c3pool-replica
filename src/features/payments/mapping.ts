import { formatNumber } from "../../lib/format";
import type { PaymentRow, PaymentRows, PaymentsStats } from "./schema";

export const DEFAULT_PAGE_SIZE = 15;
export const PAGE_SIZE_OPTIONS = [15, 50, 100];

const USDT_DIVISOR = 1e6;
const XMR_DIVISOR = 1e12;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export interface PaymentTableRow {
  id: number;
  date: string;
  network: string;
  payees: string;
  amount: string;
  fee: string;
  hash: string;
}

export function normalizePaymentRows(rows: PaymentRows): PaymentRow[] {
  return Array.isArray(rows) ? rows : Object.values(rows);
}

export function getPaymentsTotal(stats: PaymentsStats | undefined): number {
  if (!stats) return 0;
  const statistics = stats.pool_statistics;
  return statistics.totalXmrPayments ?? statistics.totalPayments ?? 0;
}

export function mapPaymentRow(row: PaymentRow): PaymentTableRow {
  const isUsdt = row.network === "USDT";

  return {
    id: row.id,
    date: dateFormatter.format(new Date(row.ts)),
    network: row.network,
    payees: formatNumber(row.payees),
    amount: isUsdt
      ? `${((row.usdtAmount ?? 0) / USDT_DIVISOR).toFixed(2)} USDT`
      : `${(row.value / XMR_DIVISOR).toFixed(8)} XMR`,
    fee: isUsdt ? "—" : `${(row.fee / XMR_DIVISOR).toFixed(8)} XMR`,
    hash: row.hash,
  };
}
