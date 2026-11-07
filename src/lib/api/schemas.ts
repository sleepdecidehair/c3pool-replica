import { z } from "zod";

export const announcementSchema = z.looseObject({
  id: z.string(),
  title_en: z.string().optional(),
  content_en: z.string().optional(),
  created_at: z.string().optional(),
  active: z.union([z.number(), z.boolean()]).optional(),
  allow_remember: z.union([z.number(), z.boolean()]).optional(),
});

export const announcementsSchema = z.array(announcementSchema);

export const networkStatSchema = z.looseObject({
  difficulty: z.number(),
  height: z.number().optional(),
  ts: z.number().optional(),
});

export const networkStatsSchema = z.record(z.string(), z.unknown());

export const poolStatisticsSchema = z.looseObject({
  hashRate: z.number(),
  miners: z.number(),
  totalBlocksFound: z.number(),
  totalAltBlocksFound: z.number().optional(),
  totalPayments: z.number(),
  totalMinersPaid: z.number().optional(),
  roundHashes: z.number().optional(),
  lastBlockFoundTime: z.number().optional(),
  lastBlockFound: z.number().optional(),
});

export const poolStatsSchema = z.looseObject({
  pool_statistics: poolStatisticsSchema,
});

export type Announcement = z.infer<typeof announcementSchema>;
export type Announcements = z.infer<typeof announcementsSchema>;
export type NetworkStats = z.infer<typeof networkStatsSchema>;
export type PoolStatistics = z.infer<typeof poolStatisticsSchema>;
export type PoolStats = z.infer<typeof poolStatsSchema>;
