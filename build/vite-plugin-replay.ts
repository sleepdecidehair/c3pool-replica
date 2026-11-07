import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { join, resolve } from "node:path";
import type { Plugin } from "vite";
import type {
  CrawlRecord,
  ReplicaEndpointSummary,
  ReplicaStatus,
} from "../shared/replica-types.ts";

const FIXTURE_DIRS = ["replica-data/network", ".replica/crawl/network"];
const STATUS_PATH = "/__replica/status";

type Next = (err?: unknown) => void;

function isStringRecord(value: unknown): value is Record<string, string> {
  if (typeof value !== "object" || value === null) return false;
  return Object.values(value).every((entry) => typeof entry === "string");
}

function toRecord(value: unknown): CrawlRecord | null {
  if (typeof value !== "object" || value === null) return null;
  const raw = value as Record<string, unknown>;
  if (
    typeof raw.id !== "string" ||
    typeof raw.capturedAt !== "string" ||
    typeof raw.sourceUrl !== "string" ||
    typeof raw.method !== "string" ||
    typeof raw.url !== "string" ||
    typeof raw.path !== "string" ||
    typeof raw.status !== "number" ||
    typeof raw.contentType !== "string" ||
    typeof raw.body !== "string" ||
    !isStringRecord(raw.query ?? {})
  ) {
    return null;
  }
  return {
    id: raw.id,
    capturedAt: raw.capturedAt,
    sourceUrl: raw.sourceUrl,
    method: raw.method,
    url: raw.url,
    path: raw.path,
    query: (raw.query ?? {}) as Record<string, string>,
    requestBody: typeof raw.requestBody === "string" ? raw.requestBody : null,
    status: raw.status,
    contentType: raw.contentType,
    body: raw.body,
  };
}

function recordKey(record: CrawlRecord): string {
  const query = Object.keys(record.query)
    .toSorted()
    .map((key) => `${key}=${record.query[key]}`)
    .join("&");
  return `${record.method} ${record.path}?${query}`;
}

async function loadRecords(root: string): Promise<CrawlRecord[]> {
  const merged = new Map<string, CrawlRecord>();
  for (const fixtureDir of FIXTURE_DIRS) {
    const dir = resolve(root, fixtureDir);
    if (!existsSync(dir)) continue;
    const files = (await readdir(dir)).filter((file) => file.endsWith(".json"));
    const records = await Promise.all(
      files.map(async (file) => {
        try {
          const content = await readFile(join(dir, file), "utf8");
          return toRecord(JSON.parse(content) as unknown);
        } catch {
          return null;
        }
      }),
    );
    for (const record of records) {
      if (!record) continue;
      const key = recordKey(record);
      const previous = merged.get(key);
      if (!previous || record.capturedAt > previous.capturedAt) merged.set(key, record);
    }
  }
  return [...merged.values()];
}

function summarize(records: CrawlRecord[]): ReplicaStatus {
  const groups = new Map<string, ReplicaEndpointSummary>();
  for (const record of records) {
    const key = `${record.method} ${record.path}`;
    const existing = groups.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      groups.set(key, { method: record.method, path: record.path, count: 1 });
    }
  }
  const endpoints = [...groups.values()].toSorted((a, b) => a.path.localeCompare(b.path));
  const capturedAt = records.reduce<string | null>((latest, record) => {
    if (latest === null) return record.capturedAt;
    return record.capturedAt > latest ? record.capturedAt : latest;
  }, null);
  const first = records[0];
  return {
    targetUrl: first ? new URL(first.sourceUrl).origin : null,
    recordCount: records.length,
    capturedAt,
    endpoints,
  };
}

function queryMatches(request: Record<string, string>, record: Record<string, string>): number {
  const requestKeys = Object.keys(request);
  if (requestKeys.length === 0) return 1;
  const matched = requestKeys.every((key) => record[key] === request[key]);
  if (!matched) return 0;
  return Object.keys(record).length === requestKeys.length ? 2 : 1;
}

function writeJson(res: ServerResponse, status: number, payload: unknown): void {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function createMiddleware(root: string) {
  return async (req: IncomingMessage, res: ServerResponse, next: Next): Promise<void> => {
    const rawUrl = req.url ?? "/";
    const parsed = new URL(rawUrl, "http://localhost");
    const records = await loadRecords(root);

    if (parsed.pathname === STATUS_PATH) {
      writeJson(res, 200, summarize(records));
      return;
    }

    const method = (req.method ?? "GET").toUpperCase();
    const query: Record<string, string> = {};
    for (const [key, value] of parsed.searchParams) query[key] = value;

    const candidates = records
      .filter((record) => record.method.toUpperCase() === method && record.path === parsed.pathname)
      .map((record) => ({ record, score: queryMatches(query, record.query) }))
      .filter((candidate) => candidate.score > 0)
      .toSorted((a, b) => b.score - a.score);

    const best = candidates[0];
    if (!best) {
      if (parsed.pathname.startsWith("/__replica/")) {
        writeJson(res, 404, {
          error: "REPLICA_FIXTURE_NOT_FOUND",
          method,
          path: parsed.pathname,
          hint: "运行 pnpm crawl --url <目标URL> 采集该接口后再试",
        });
        return;
      }
      next();
      return;
    }

    res.statusCode = best.record.status;
    res.setHeader("content-type", best.record.contentType || "application/json; charset=utf-8");
    res.setHeader("x-replica-source", encodeURIComponent(best.record.sourceUrl));
    res.setHeader("x-replica-captured-at", best.record.capturedAt);
    res.end(best.record.body);
  };
}

export function replicaReplayPlugin(): Plugin {
  return {
    name: "c3pool:replica-replay",
    configureServer(server) {
      server.middlewares.use(createMiddleware(server.config.root));
    },
    configurePreviewServer(server) {
      server.middlewares.use(createMiddleware(server.config.root));
    },
  };
}
