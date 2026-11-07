import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiGet } from "../../lib/api/client";
import { getPaymentsTotal, normalizePaymentRows } from "./mapping";
import { paymentRowsSchema, paymentsStatsSchema } from "./schema";
import type { PaymentRow } from "./schema";

const STATS_STALE_MS = 30_000;

export function usePaymentsStats() {
  return useQuery({
    queryKey: ["payments", "stats"],
    queryFn: async () => paymentsStatsSchema.parse(await apiGet<unknown>("/pool/stats")),
    select: getPaymentsTotal,
    staleTime: STATS_STALE_MS,
  });
}

export interface PaymentsPageData {
  rows: PaymentRow[];
  pageIndex: number;
  pageSize: number;
}

export function usePayments(pageIndex: number, pageSize: number) {
  return useQuery({
    queryKey: ["payments", "list", pageIndex, pageSize],
    queryFn: async (): Promise<PaymentsPageData> => {
      const parsed = paymentRowsSchema.parse(
        await apiGet<unknown>("/pool/payments", { page: pageIndex, limit: pageSize }),
      );
      return { rows: normalizePaymentRows(parsed), pageIndex, pageSize };
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
}
