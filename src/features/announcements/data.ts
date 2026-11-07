import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiGet } from "../../lib/api/client";

export const announcementSchema = z.looseObject({
  id: z.string(),
  title_en: z.string().optional(),
  content_en: z.string().optional(),
  category: z.string().optional(),
  created_at: z.string().optional(),
  active: z.union([z.number(), z.boolean()]).optional(),
  listed: z.union([z.number(), z.boolean()]).optional(),
});

export const announcementsSchema = z.array(announcementSchema);

export type Announcement = z.infer<typeof announcementSchema>;

const ANNOUNCEMENTS_PATH = "/leaf/public/announcements/archive";
const LOCAL_ANNOUNCEMENT_IMAGE = "/replica-assets/c3miner-dashboard.jpg";
const ANNOUNCEMENT_IMAGE_PATTERN =
  /https?:\/\/iconc3\.oss-cn-hongkong\.aliyuncs\.com\/[^"'\s>]*c3miner-dashboard[^"'\s>]*/gi;

const CATEGORY_LABELS: Record<string, string> = {
  coins: "New coins",
  features: "Product updates",
  maintenance: "Maintenance",
};

const FILTERS: ReadonlyArray<{ key: string; label: string }> = [
  { key: "all", label: "All announcements" },
  { key: "coins", label: "New coins" },
  { key: "features", label: "Product updates" },
  { key: "maintenance", label: "Maintenance" },
];

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

export interface AnnouncementFilter {
  key: string;
  label: string;
  count: number;
}

export function useAnnouncements() {
  return useQuery({
    queryKey: ["announcements", "archive"],
    queryFn: async () => announcementsSchema.parse(await apiGet<unknown>(ANNOUNCEMENTS_PATH)),
    staleTime: 5 * 60_000,
  });
}

export function sortAnnouncements(items: readonly Announcement[]): Announcement[] {
  return items.toSorted((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
}

export function buildAnnouncementFilters(items: readonly Announcement[]): AnnouncementFilter[] {
  return FILTERS.map((filter) => {
    const count =
      filter.key === "all"
        ? items.length
        : items.filter((item) => item.category === filter.key).length;
    return { key: filter.key, label: filter.label, count };
  });
}

export function getCategoryLabel(category: string | undefined): string {
  if (!category) return "General";
  return CATEGORY_LABELS[category] ?? category;
}

export function formatAnnouncementDate(value: string | undefined): string {
  if (!value) return "";
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value);
  return match?.[1] ?? value;
}

export function sanitizeAnnouncementHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:href|src)\s*=\s*(["'])\s*javascript:[^"']*\1/gi, "")
    .replace(/javascript:/gi, "")
    .replace(ANNOUNCEMENT_IMAGE_PATTERN, LOCAL_ANNOUNCEMENT_IMAGE);
}

export function toPlainText(html: string | undefined): string {
  if (!html) return "";
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ");
  return decodeEntities(stripped).replace(/\s+/g, " ").trim();
}

export function getExcerpt(announcement: Announcement, maxLength = 180): string {
  const text = toPlainText(announcement.content_en);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

function decodeEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith("#")) {
      const isHex = entity[1]?.toLowerCase() === "x";
      const code = Number.parseInt(isHex ? entity.slice(2) : entity.slice(1), isHex ? 16 : 10);
      if (Number.isFinite(code)) return String.fromCodePoint(code);
      return match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}
