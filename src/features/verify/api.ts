import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiGet } from "../../lib/api/client";

const officialChannelSchema = z.object({
  type: z.string(),
  value: z.string(),
  label: z.string(),
  url: z.string(),
  section: z.string(),
  note: z.record(z.string(), z.unknown()).optional(),
});

const officialChannelsSchema = z.array(officialChannelSchema);

export type OfficialChannel = z.infer<typeof officialChannelSchema>;

export function useOfficialChannels() {
  return useQuery({
    queryKey: ["official-channels"],
    queryFn: async () =>
      officialChannelsSchema.parse(await apiGet<unknown>("/leaf/public/official-channels")),
    staleTime: 10 * 60_000,
  });
}
