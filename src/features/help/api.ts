import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiGet } from "../../lib/api/client";

const localizedTextSchema = z.record(z.string(), z.string());

const helpArticleSchema = z.object({
  slug: z.string(),
  category: z.string(),
  sortOrder: z.number(),
  updatedAt: z.string(),
  title: localizedTextSchema,
  summary: localizedTextSchema,
});

const helpArticlesSchema = z.array(helpArticleSchema);

export type HelpArticle = z.infer<typeof helpArticleSchema>;

export function useHelpArticles() {
  return useQuery({
    queryKey: ["help-articles"],
    queryFn: async () => helpArticlesSchema.parse(await apiGet<unknown>("/leaf/public/help")),
    staleTime: 10 * 60_000,
  });
}

export function localizedEnglish(value: Record<string, string>): string {
  return value.en ?? Object.values(value)[0] ?? "";
}
