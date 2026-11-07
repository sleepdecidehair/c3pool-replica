import { z } from "zod";

export const paymentsStatsSchema = z.looseObject({
  pool_statistics: z.looseObject({
    totalPayments: z.number().optional(),
    totalXmrPayments: z.number().optional(),
  }),
});

export const paymentRowSchema = z.looseObject({
  id: z.number(),
  ts: z.number(),
  value: z.number(),
  hash: z.string(),
  payees: z.number(),
  fee: z.number(),
  network: z.string(),
  chain: z.string().nullable().optional(),
  usdtAmount: z.number().nullable().optional(),
});

export const paymentRowsSchema = z.union([
  z.array(paymentRowSchema),
  z.record(z.string(), paymentRowSchema),
]);

export type PaymentRow = z.infer<typeof paymentRowSchema>;
export type PaymentRows = z.infer<typeof paymentRowsSchema>;
export type PaymentsStats = z.infer<typeof paymentsStatsSchema>;
