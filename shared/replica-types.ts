export interface CrawlRecord {
  id: string;
  capturedAt: string;
  sourceUrl: string;
  method: string;
  url: string;
  path: string;
  query: Record<string, string>;
  requestBody: string | null;
  status: number;
  contentType: string;
  body: string;
}

export interface ReplicaEndpointSummary {
  method: string;
  path: string;
  count: number;
}

export interface ReplicaStatus {
  targetUrl: string | null;
  recordCount: number;
  capturedAt: string | null;
  endpoints: ReplicaEndpointSummary[];
}
