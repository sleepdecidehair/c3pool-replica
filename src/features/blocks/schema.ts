import { z } from "zod";

export const blockCoinSchema = z.looseObject({
  port: z.number(),
  symbol: z.string(),
  displayName: z.string().optional(),
  active: z.boolean().optional(),
  blockTime: z.number().optional(),
  altBlocksFound: z.number().optional(),
});

export const blocksStatsSchema = z.looseObject({
  pool_statistics: z.looseObject({
    totalBlocksFound: z.number(),
    totalAltBlocksFound: z.number().optional(),
    altBlocksFound: z.record(z.string(), z.number()).optional(),
    coins: z.record(z.string(), blockCoinSchema).optional(),
    lastBlockFound: z.number().optional(),
    lastBlockFoundTime: z.number().optional(),
  }),
});

export const blockRowSchema = z.looseObject({
  ts: z.number(),
  hash: z.string(),
  diff: z.number(),
  shares: z.number(),
  height: z.number(),
  valid: z.boolean(),
  unlocked: z.boolean(),
  value: z.number(),
  pay_value: z.number().optional(),
  pay_stage: z.string().optional(),
  port: z.number().optional(),
});

export const blockRowsSchema = z.array(blockRowSchema);

export type BlockCoin = z.infer<typeof blockCoinSchema>;
export type BlocksStats = z.infer<typeof blocksStatsSchema>;
export type BlockRow = z.infer<typeof blockRowSchema>;
