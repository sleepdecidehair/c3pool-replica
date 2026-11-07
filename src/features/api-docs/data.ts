export interface DocsNavItem {
  id: string;
  label: string;
}

export interface DocsNavGroup {
  name: string;
  items: DocsNavItem[];
}

export type ProseBlock =
  | { kind: "heading"; level: 3 | 4; text: string }
  | { kind: "paragraph"; text: string; muted?: boolean; meta?: boolean }
  | { kind: "caption"; text: string }
  | { kind: "request"; text: string }
  | { kind: "table"; headers: string[]; rows: string[][] };

export interface OverviewItem {
  id: string;
  title: string;
  blocks: ProseBlock[];
}

export interface EndpointDoc {
  id: string;
  title: string;
  blocks: ProseBlock[];
  request: string;
  response: string;
  responseNote?: string;
}

export interface EndpointGroup {
  name: string;
  description: string;
  endpoints: EndpointDoc[];
}

export const apiDocsTitle = "C3Pool API";

export const apiDocsIntroRequest = "GET /pool/stats";

export const apiDocsNav: DocsNavGroup[] = [
  {
    name: "Overview",
    items: [
      {
        id: "ov-intro",
        label: "Introduction",
      },
      {
        id: "ov-cors",
        label: "No authentication, CORS enabled",
      },
      {
        id: "ov-cache",
        label: "Caching",
      },
      {
        id: "ov-units",
        label: "Amounts",
      },
      {
        id: "ov-ts",
        label: "Timestamps",
      },
      {
        id: "ov-etiquette",
        label: "Rate limits",
      },
      {
        id: "ov-forward",
        label: "Compatibility",
      },
    ],
  },
  {
    name: "Pool overview",
    items: [
      {
        id: "ep-poolStats",
        label: "Get pool stats",
      },
      {
        id: "ep-poolHashChart",
        label: "Get pool hashrate history",
      },
      {
        id: "ep-poolMinersChart",
        label: "Get miners-online history",
      },
      {
        id: "ep-poolPorts",
        label: "Get mining ports",
      },
    ],
  },
  {
    name: "Coins and networks",
    items: [
      {
        id: "ep-poolStats2",
        label: "Get coin summary",
      },
      {
        id: "ep-networkStats",
        label: "Get network state",
      },
    ],
  },
  {
    name: "Blocks found",
    items: [
      {
        id: "ep-poolBlocks",
        label: "Get XMR main-chain blocks",
      },
      {
        id: "ep-poolAltBlocks",
        label: "Get blocks for other coins",
      },
      {
        id: "ep-coinAltBlocks",
        label: "Get blocks for one coin",
      },
    ],
  },
  {
    name: "Payouts",
    items: [
      {
        id: "ep-poolPayments",
        label: "Get pool payments",
      },
    ],
  },
  {
    name: "Fees and settlement",
    items: [
      {
        id: "ep-usdtChains",
        label: "Get USDT settlement chains",
      },
      {
        id: "ep-poolConfig",
        label: "Get fees and payout configuration",
      },
    ],
  },
  {
    name: "A single miner",
    items: [
      {
        id: "ep-minerStats",
        label: "Get miner balance and stats",
      },
      {
        id: "ep-minerIdentifiers",
        label: "Get rig list",
      },
      {
        id: "ep-minerAllWorkers",
        label: "Get all rigs",
      },
      {
        id: "ep-minerWorkerStats",
        label: "Get one rig",
      },
      {
        id: "ep-minerPayments",
        label: "Get miner payments",
      },
      {
        id: "ep-minerPaymentsCount",
        label: "Get miner payment count",
      },
      {
        id: "ep-minerBlockPayments",
        label: "Get miner earnings per block",
      },
      {
        id: "ep-minerDailyEarnings",
        label: "Get miner daily earnings",
      },
      {
        id: "ep-minerHashChart",
        label: "Get miner hashrate history",
      },
    ],
  },
];

export const apiDocsOverview: OverviewItem[] = [
  {
    id: "ov-intro",
    title: "Introduction",
    blocks: [
      {
        kind: "paragraph",
        text: "C3Pool provides a set of read-only HTTP endpoints for live pool data: hashrate, miner counts, blocks found, payouts and the current state of each supported coin. No registration or API key is required — send a GET request.",
      },
      {
        kind: "heading",
        level: 3,
        text: "Base URL",
      },
      {
        kind: "request",
        text: "https://api.c3pool.com",
      },
      {
        kind: "paragraph",
        text: "All endpoint paths below are relative to this address.",
        muted: true,
      },
    ],
  },
  {
    id: "ov-cors",
    title: "No authentication, CORS enabled",
    blocks: [
      {
        kind: "paragraph",
        text: "All endpoints are GET requests and return Access-Control-Allow-Origin: *, so web pages, scripts and dashboards can call them directly from the browser without additional setup.",
      },
    ],
  },
  {
    id: "ov-cache",
    title: "Caching",
    blocks: [
      {
        kind: "paragraph",
        text: "Responses are cached: 10 seconds for most endpoints, and between 60 seconds and 5 minutes for the rest; each endpoint shows its own cache period. Repeated requests within that period return the same result, so we recommend polling no more often than the cache interval.",
      },
    ],
  },
  {
    id: "ov-units",
    title: "Amounts",
    blocks: [
      {
        kind: "paragraph",
        text: "Unless an endpoint states otherwise, amounts are integers in the coin’s smallest (atomic) unit. The XMR divisor is 1e12; other coins differ, so use coins[port].atomicUnits from /pool/stats rather than a fixed value in your code.",
      },
    ],
  },
  {
    id: "ov-ts",
    title: "Timestamps",
    blocks: [
      {
        kind: "paragraph",
        text: "Timestamp units differ between endpoints: block lists, the pool payment list and hashrate charts use milliseconds; all other endpoints, including a miner’s payment history, use seconds. Each field description states its unit.",
      },
    ],
  },
  {
    id: "ov-etiquette",
    title: "Rate limits",
    blocks: [
      {
        kind: "paragraph",
        text: "The API is free to use. Please request data no more often than the cache interval, wait before retrying a failed request, and avoid high-frequency polling or large numbers of concurrent requests. We may rate-limit abnormal traffic.",
      },
    ],
  },
  {
    id: "ov-forward",
    title: "Compatibility",
    blocks: [
      {
        kind: "paragraph",
        text: "New fields may be added to responses as features evolve. Read values by field name, provide defaults for fields that may be missing, and do not rely on field order or count. The names and meanings of the fields documented on this page will remain stable.",
      },
    ],
  },
];

export const apiDocsGroups: EndpointGroup[] = [
  {
    name: "Pool overview",
    description:
      "The pool as it stands right now: total hashrate, miners online, blocks found to date, the PPLNS window, and how work is spread across the mining ports. For a monitoring dashboard, /pool/stats on its own is usually enough.",
    endpoints: [
      {
        id: "ep-poolStats",
        title: "Get pool stats",
        blocks: [
          {
            kind: "paragraph",
            text: "The pool’s main data endpoint. A single call returns total hashrate, miners online, blocks and payments to date, the PPLNS window, the per-port breakdown and the current state of each coin under coins. It is the largest response in the API — about 15KB.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /pool/stats",
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["pool_list", "string[]", 'Reward schemes the pool runs. Here, ["pplns"].'],
              ["pool_statistics", "object", "Everything in the table below."],
              ["last_payment", "number", "When the last payment round ran, Unix seconds."],
            ],
          },
          {
            kind: "caption",
            text: "Inside pool_statistics:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["hashRate", "number", "Total pool hashrate, as XMR-equivalent H/s."],
              ["miners", "number", "Miners online, counted by address rather than by rig."],
              ["totalHashes", "number", "Hashes the pool has done since it opened."],
              [
                "roundHashes",
                "number",
                "Hashes spent in the current round; over the network difficulty, that is the round’s effort.",
              ],
              [
                "currentEfforts",
                "object",
                "Hashes spent in the current round per port, keyed by port number.",
              ],
              ["pplnsWindowTime", "number", "How much time the PPLNS window spans, in seconds."],
              [
                "pplnsPortShares",
                "object",
                "Each port’s share of the PPLNS window, keyed by port number; sums to about 1.",
              ],
              [
                "portHash",
                "object",
                "Hashrate per port, keyed by port number, in that coin’s own H/s.",
              ],
              ["portMinerCount", "object", "Miners online per port, keyed by port number."],
              ["portCoinAlgo", "object", "Algorithm per port, keyed by port number."],
              [
                "activePort",
                "number",
                "The port the pool is mining right now — the coin currently paying best.",
              ],
              ["activePorts", "number[]", "Every port that is enabled and mineable."],
              [
                "activePortProfit",
                "number",
                "Profit factor for the coin being mined; see coinProfit for what it means.",
              ],
              [
                "coinProfit",
                "object",
                "Profitability factor per coin, keyed by port number: the expected return per hash, expressed in XMR. A higher value means the coin is currently more profitable.",
              ],
              [
                "coinComment",
                "object",
                "Additional note per coin, keyed by port number; usually empty.",
              ],
              [
                "minBlockRewards",
                "object",
                "Recent block reward per coin, keyed by port number, in XMR-equivalent terms.",
              ],
              ["lastBlockFound", "number", "Height of the most recent XMR main-chain block."],
              ["lastBlockFoundTime", "number", "When that block was found, Unix seconds."],
              ["totalBlocksFound", "number", "XMR main-chain blocks found since the pool opened."],
              [
                "totalAltBlocksFound",
                "number",
                "Blocks found for coins other than XMR since the pool opened.",
              ],
              ["altBlocksFound", "object", "Blocks found per coin, keyed by port number."],
              ["totalMinersPaid", "number", "Addresses that have ever been paid."],
              ["totalPayments", "number", "Payment transactions sent since the pool opened."],
              ["pending", "number", "Earnings found but not yet unlocked and distributed, in XMR."],
              [
                "price",
                "object",
                "Reference XMR price in fiat and BTC, keyed by lower-case currency code.",
              ],
              [
                "coins",
                "object",
                "Current state of every coin the pool mines, keyed by port number. See the table below.",
              ],
              ["updatedAt", "number", "When this snapshot was built, Unix seconds."],
            ],
          },
          {
            kind: "caption",
            text: "coins is keyed by port number; each value looks like this:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["port", "number", "The coin’s mining port."],
              ["symbol", "string", "Coin ticker, e.g. XMR, RTM."],
              ["displayName", "string", "Display name, usually the same as symbol."],
              ["algo", "string", "Algorithm name, e.g. rx/0, ghostrider."],
              ["active", "boolean", "Whether it is mineable right now."],
              ["profit", "number", "Profit factor, the same value as in the top-level coinProfit."],
              ["hashrate", "number", "Pool hashrate on this coin, in its own H/s."],
              ["miners", "number", "Miners on this coin."],
              ["pplnsShare", "number", "This coin’s share of the PPLNS window."],
              [
                "altBlocksFound",
                "number",
                "Blocks found on this coin. It is 0 for XMR — the main-chain count lives in totalBlocksFound.",
              ],
              ["blockTime", "number", "Target seconds between blocks on this chain."],
              [
                "atomicUnits",
                "number",
                "Divide this coin’s atomic units by this to get whole coins.",
              ],
              [
                "exchangeConfigured",
                "boolean",
                "Whether earnings in this coin can be automatically converted to XMR for payout.",
              ],
              ["comment", "string", "Note; usually empty."],
              ["disabledReason", "string", "Why it was turned off; empty when it is not."],
            ],
          },
        ],
        request: "GET /pool/stats",
        response:
          '{\n  "pool_list": [\n    "pplns"\n  ],\n  "pool_statistics": {\n    "hashRate": 537376036.0533333,\n    "miners": 2256,\n    "totalHashes": 2.747547682608535e+22,\n    "lastBlockFoundTime": 1793543569,\n    "lastBlockFound": 3796901,\n    "totalBlocksFound": 66595,\n    "totalMinersPaid": 30592,\n    "totalPayments": 353831,\n    "roundHashes": 96045560537.56403,\n    "totalAltBlocksFound": 57059,\n    "altBlocksFound": {\n      "9998": 10254\n    },\n    "activePort": 18081,\n    "activePorts": [\n      18081,\n      7227,\n      8090,\n      8342\n    ],\n    "activePortProfit": 6.484808297550312e-08,\n    "coinProfit": {\n      "18081": 6.484808297550312e-08,\n      "9998": 4.220604791601484e-08\n    },\n    "coinComment": {\n      "18081": "",\n      "9998": ""\n    },\n    "minBlockRewards": {\n      "18081": 0.60500660192,\n      "9998": 0.0002880964285093183\n    },\n    "pending": 2.941348449779039,\n    "price": {\n      "btc": 0.007722585615288489,\n      "usd": 601.6916540034928,\n      "eur": 537.2486727847555,\n      "cny": 4005.7020173629485,\n      "hkd": 4720.782463563286,\n      "jpy": 94814.61564582368,\n      "krw": 802307.6852797797\n    },\n    "currentEfforts": {\n      "18081": 95589940527.44489,\n      "9998": 241305456.7031517\n    },\n    "pplnsPortShares": {\n      "18081": 0.9770016165126821,\n      "9998": 0.00211841532272563\n    },\n    "pplnsWindowTime": 3056.905,\n    "portHash": {\n      "18081": 525354108.0726255,\n      "9998": 1828752.3612363418\n    },\n    "portMinerCount": {\n      "18081": 2178,\n      "9998": 214\n    },\n    "portCoinAlgo": {\n      "18081": "rx/0",\n      "9998": "ghostrider"\n    },\n    "coins": {\n      "18081": {\n        "port": 18081,\n        "symbol": "XMR",\n        "displayName": "XMR",\n        "algo": "rx/0",\n        "active": true,\n        "profit": 6.484808297550312e-08,\n        "comment": "",\n        "disabledReason": "",\n        "hashrate": 525354108.0726255,\n        "miners": 2178,\n        "pplnsShare": 0.9770016165126821,\n        "altBlocksFound": 0,\n        "blockTime": 120,\n        "atomicUnits": 1000000000000,\n        "exchangeConfigured": false\n      },\n      "9998": {\n        "port": 9998,\n        "symbol": "RTM",\n        "displayName": "RTM",\n        "algo": "ghostrider",\n        "active": true,\n        "profit": 4.220604791601484e-08,\n        "comment": "",\n        "disabledReason": "",\n        "hashrate": 1828752.3612363418,\n        "miners": 214,\n        "pplnsShare": 0.00211841532272563,\n        "altBlocksFound": 10254,\n        "blockTime": 120,\n        "atomicUnits": 100000000,\n        "exchangeConfigured": true\n      }\n    },\n    "updatedAt": 1793543783\n  },\n  "last_payment": 1793444171\n}',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-poolHashChart",
        title: "Get pool hashrate history",
        blocks: [
          {
            kind: "paragraph",
            text: "Total pool hashrate over time, with roughly one data point every two minutes covering about one day. Newest first.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /pool/chart/hashrate",
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["ts", "number", "Sample time, Unix milliseconds."],
              ["hs", "number", "Reported hashrate, in the mined coin’s own H/s."],
              [
                "hs2",
                "number",
                "Pay hashrate — the XMR-equivalent figure earnings are actually computed from.",
              ],
            ],
          },
        ],
        request: "GET /pool/chart/hashrate",
        response:
          '[\n  {\n    "ts": 1793543787000,\n    "hs": 536528832,\n    "hs2": 0\n  },\n  {\n    "ts": 1793543662000,\n    "hs": 539303552,\n    "hs2": 0\n  },\n  {\n    "ts": 1793543542000,\n    "hs": 538239360,\n    "hs2": 0\n  }\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-poolMinersChart",
        title: "Get miners-online history",
        blocks: [
          {
            kind: "paragraph",
            text: "Miners online over time, sampled on the same cadence as the hashrate chart. Newest first.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /pool/chart/miners",
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["ts", "number", "Sample time, Unix milliseconds."],
              ["cn", "number", "Miners online at that moment."],
            ],
          },
        ],
        request: "GET /pool/chart/miners",
        response:
          '[\n  {\n    "ts": 1793543787346,\n    "cn": 2256\n  },\n  {\n    "ts": 1793543662333,\n    "cn": 2256\n  },\n  {\n    "ts": 1793543542411,\n    "cn": 2252\n  }\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-poolPorts",
        title: "Get mining ports",
        blocks: [
          {
            kind: "paragraph",
            text: "Mining ports available for connection. configured lists the ports the pool offers; global and pplns give the live status of each entry address, including miners online and current block height.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /pool/ports",
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["global", "object[]", "Live status of all ports at each entry address."],
              ["pplns", "object[]", "Live status of the PPLNS ports at each entry address."],
              ["configured", "object[]", "The port configuration the pool offers."],
            ],
          },
          {
            kind: "caption",
            text: "Each item in the global and pplns arrays:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["port", "number", "Port number — this is what a rig connects to."],
              ["difficulty", "number", "Starting difficulty this port hands out."],
              ["miners", "number", "Miners on this port."],
              ["description", "string", "What the port is intended for, as readable text."],
              ["tls", "boolean", "Whether the connection has to be TLS."],
              ["pool_type", "string", "Reward scheme. This pool runs pplns only."],
              ["host", "object", "Entry address details. See the table below."],
            ],
          },
          {
            kind: "caption",
            text: "Inside host:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              [
                "hostname",
                "string",
                "Entry address — the pool address to enter in your miner configuration.",
              ],
              ["blockID", "number", "Current XMR block height at this entry address."],
              ["blockIDTime", "number", "Time of that height, Unix seconds."],
              [
                "xtmBlockID",
                "number",
                "Current Tari block height at this entry address (XMR and XTM are merge-mined).",
              ],
              ["xtmBlockIDTime", "number", "Time of that height, Unix seconds."],
            ],
          },
          {
            kind: "caption",
            text: "Each item in configured:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["port", "number", "Port number — this is what a rig connects to."],
              ["tlsPort", "number | null", "The TLS twin of this port, or null if there is none."],
              ["difficulty", "number", "Starting difficulty this port hands out."],
              [
                "targetHashrate",
                "number",
                "Roughly the rig size, in H/s, this difficulty is meant for.",
              ],
              ["description", "string", "What the port is intended for, as readable text."],
              ["portType", "string", "Reward scheme of this port."],
            ],
          },
        ],
        request: "GET /pool/ports",
        response:
          '{\n  "global": [\n    {\n      "host": {\n        "blockID": 3796907,\n        "blockIDTime": 1793543833,\n        "xtmBlockID": 378353,\n        "xtmBlockIDTime": 1793543833,\n        "hostname": "mine.c3pool.com"\n      },\n      "port": 80,\n      "pool_type": "pplns",\n      "difficulty": 52000,\n      "miners": 18723,\n      "description": "Firewall bypass",\n      "tls": false\n    }\n  ],\n  "pplns": [\n    {\n      "host": {\n        "blockID": 3796907,\n        "blockIDTime": 1793543833,\n        "xtmBlockID": 378353,\n        "xtmBlockIDTime": 1793543833,\n        "hostname": "mine.c3pool.com"\n      },\n      "port": 80,\n      "difficulty": 52000,\n      "description": "Firewall bypass",\n      "miners": 1133,\n      "tls": false\n    }\n  ],\n  "configured": [\n    {\n      "port": 80,\n      "tlsPort": null,\n      "difficulty": 52000,\n      "targetHashrate": 1733.3333333333333,\n      "description": "Firewall bypass",\n      "portType": "pplns"\n    },\n    {\n      "port": 443,\n      "tlsPort": null,\n      "difficulty": 52000,\n      "targetHashrate": 1733.3333333333333,\n      "description": "Firewall bypass",\n      "portType": "pplns"\n    }\n  ]\n}',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
    ],
  },
  {
    name: "Coins and networks",
    description: "Each coin the pool currently supports, and the state of its blockchain network.",
    endpoints: [
      {
        id: "ep-poolStats2",
        title: "Get coin summary",
        blocks: [
          {
            kind: "paragraph",
            text: "A flat version of the coin list for direct display: hashrates are formatted as strings with units, and profitability and block reward are given as percentages relative to XMR. For calculations, use coins in /pool/stats.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /pool/stats2",
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["code", "number", "0 means success."],
              ["data", "object[]", "One item per coin. See the table below."],
              ["msg", "string", 'Status text; on success it is always 操作成功 — "ok" in Chinese.'],
            ],
          },
          {
            kind: "caption",
            text: "Each item in data:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              [
                "id",
                "number",
                "Array index — not the port number, and the order may change. Do not use it as an identifier.",
              ],
              ["name", "string", "Coin ticker."],
              ["icon", "string", "Coin icon URL; empty for some coins."],
              [
                "netHash",
                "string",
                'Network hashrate, pre-formatted as a string with its unit, e.g. "6.85 GH/s".',
              ],
              [
                "poolHash",
                "number",
                "Pool hashrate on this coin, as a number, in the coin’s own H/s.",
              ],
              ["minerCount", "number", "Miners on this coin."],
              ["blockFound", "number", "Blocks found to date."],
              [
                "profit",
                "string",
                'Profit relative to XMR, as a percentage string, e.g. "67.53%".',
              ],
              ["award", "string", "Block reward relative to XMR, as a percentage string."],
              ["doller", "number", "Reserved, always 0. Do not use."],
              ["cny", "number", "Reserved, always 0. Do not use."],
            ],
          },
        ],
        request: "GET /pool/stats2",
        response:
          '{\n  "code": 0,\n  "data": [\n    {\n      "netHash": "6.83 GH/s",\n      "award": "100.00%",\n      "icon": "",\n      "name": "XMR",\n      "minerCount": 2176,\n      "doller": 0,\n      "id": 0,\n      "profit": "100%",\n      "cny": 0,\n      "poolHash": 526389116.277492,\n      "blockFound": 66595\n    },\n    {\n      "netHash": "9269585440.27 TH/s",\n      "award": "0.92%",\n      "icon": "",\n      "name": "NEXA",\n      "minerCount": 2,\n      "doller": 0,\n      "id": 1,\n      "profit": "0.002711%",\n      "cny": 0,\n      "poolHash": 61806857.70666666,\n      "blockFound": 0\n    }\n  ],\n  "msg": "success"\n}',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-networkStats",
        title: "Get network state",
        blocks: [
          {
            kind: "paragraph",
            text: "Network state for every chain the pool tracks: current height, difficulty, block hash and block reward. Keyed by that coin’s mining port.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /network/stats",
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "caption",
            text: "The whole body is keyed by port number; each value looks like this:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["height", "number", "Current network height of this chain."],
              [
                "difficulty",
                "number",
                "Network difficulty. Over the coin’s blockTime, that is network hashrate.",
              ],
              [
                "hash",
                "string",
                "Hash of the latest block; some coins prefix it with the chain name.",
              ],
              ["value", "number", "Current block reward, in atomic units."],
              ["ts", "number", "When this reading was taken, Unix seconds."],
            ],
          },
        ],
        request: "GET /network/stats",
        response:
          '{\n  "7227": {\n    "difficulty": 258985273473676,\n    "hash": "nexa:5f03edb262e4d2b7b3acd9c562c128e9b242aad28016f16a81d338cad6bd65ba",\n    "height": 1182144,\n    "value": 500000000,\n    "ts": 1793543788\n  },\n  "8090": {\n    "difficulty": 319486800,\n    "hash": "xel:c549a1991256acf8ed0a6ae52e6498514e703829745e457812db701f58d224a6",\n    "height": 9711330,\n    "value": 30552791,\n    "ts": 1793543788\n  }\n}',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
    ],
  },
  {
    name: "Blocks found",
    description:
      "Blocks found by the pool, with the XMR main chain listed separately from other coins. Blocks for other coins also include the processing status of their rewards.",
    endpoints: [
      {
        id: "ep-poolBlocks",
        title: "Get XMR main-chain blocks",
        blocks: [
          {
            kind: "paragraph",
            text: "XMR main-chain blocks found by the pool, newest first.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /pool/blocks",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "limit",
                "number",
                "No",
                "Rows per page: 15, 50 or 100, default 15. Any other value is treated as 15.",
              ],
              ["page", "number", "No", "Page number, zero-based, up to 1000. Use it with limit."],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["ts", "number", "When the block was found, Unix milliseconds."],
              ["hash", "string", "Block hash."],
              ["height", "number", "Block height."],
              ["diff", "number", "Difficulty of this block."],
              [
                "shares",
                "number",
                "Share work the pool actually spent to hit this block; against diff, that is the round’s luck.",
              ],
              [
                "valid",
                "boolean",
                "Whether the block is valid; false means it was orphaned and does not count towards earnings.",
              ],
              [
                "unlocked",
                "boolean",
                "Whether it has unlocked. An unlocked block is one whose reward can be distributed.",
              ],
              ["value", "number", "The block’s full reward, in atomic units."],
              ["pool_type", "string", "Reward scheme. This pool runs pplns only."],
            ],
          },
        ],
        request: "GET /pool/blocks?limit=15",
        response:
          '[\n  {\n    "ts": 1793543569056,\n    "hash": "0886d658d100c45ab596da63dbddcce07b814823ffaca05ae8838d5d262b514f",\n    "diff": 815918255157,\n    "shares": 950787823691,\n    "height": 3796901,\n    "valid": true,\n    "unlocked": false,\n    "pool_type": "pplns",\n    "value": 608100620000\n  },\n  {\n    "ts": 1793541752513,\n    "hash": "ac7fbcc94117c275f5dbbdac17ebffaaa95f289039570dec26ccb7886d787fd5",\n    "diff": 836459570540,\n    "shares": 3537965929201,\n    "height": 3796888,\n    "valid": true,\n    "unlocked": false,\n    "pool_type": "pplns",\n    "value": 605158960000\n  }\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-poolAltBlocks",
        title: "Get blocks for other coins",
        blocks: [
          {
            kind: "paragraph",
            text: "Blocks found by the pool for coins other than XMR, newest first. Four additional fields show the processing status of each block’s reward.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /pool/altblocks",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "limit",
                "number",
                "No",
                "Rows per page: 15, 50 or 100, default 15. Any other value is treated as 15.",
              ],
              ["page", "number", "No", "Page number, zero-based, up to 1000. Use it with limit."],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["ts", "number", "When the block was found, Unix milliseconds."],
              ["hash", "string", "Block hash."],
              ["height", "number", "Block height."],
              ["diff", "number", "Difficulty of this block."],
              [
                "shares",
                "number",
                "Share work the pool actually spent to hit this block; against diff, that is the round’s luck.",
              ],
              [
                "valid",
                "boolean",
                "Whether the block is valid; false means it was orphaned and does not count towards earnings.",
              ],
              [
                "unlocked",
                "boolean",
                "Whether it has unlocked. An unlocked block is one whose reward can be distributed.",
              ],
              ["value", "number", "The block’s full reward, in atomic units."],
              ["pool_type", "string", "Reward scheme. This pool runs pplns only."],
              ["port", "number", "The coin’s mining port."],
              [
                "pay_value",
                "number",
                "The block’s reward credited in XMR; 0 until processing completes.",
              ],
              [
                "pay_stage",
                "string",
                "The current processing stage of the block’s reward, as readable text.",
              ],
              [
                "pay_status",
                "string",
                "The result of that last step; an empty string means nothing went wrong.",
              ],
            ],
          },
        ],
        request: "GET /pool/altblocks?limit=15",
        response:
          '[\n  {\n    "ts": 1793543548917,\n    "hash": "129c1e6f0ed7495de61877691caa6952a77990567cb8725455756b159c98cd18",\n    "diff": 571111131,\n    "shares": 232570349,\n    "height": 1463495,\n    "valid": true,\n    "unlocked": false,\n    "pool_type": "pplns",\n    "value": 342750000000,\n    "pay_value": 0,\n    "pay_stage": "Unlocking wallet balance",\n    "pay_status": "",\n    "port": 9998\n  },\n  {\n    "ts": 1793543449947,\n    "hash": "1f2380153b7507f3fc27d54c50594919d34f808f41d6b8ce24a73005fabe9cde",\n    "diff": 570599409,\n    "shares": 110598566,\n    "height": 1463494,\n    "valid": true,\n    "unlocked": false,\n    "pool_type": "pplns",\n    "value": 342750000000,\n    "pay_value": 0,\n    "pay_stage": "Unlocking wallet balance",\n    "pay_status": "",\n    "port": 9998\n  }\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-coinAltBlocks",
        title: "Get blocks for one coin",
        blocks: [
          {
            kind: "paragraph",
            text: "As /pool/altblocks, narrowed to one coin’s port.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /pool/coin_altblocks/{port}",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "port",
                "number",
                "Yes",
                "The coin’s mining port. Valid values are in activePorts from /pool/stats.",
              ],
              [
                "limit",
                "number",
                "No",
                "Rows per page: 15, 50 or 100, default 15. Any other value is treated as 15.",
              ],
              ["page", "number", "No", "Page number, zero-based, up to 1000. Use it with limit."],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["ts", "number", "When the block was found, Unix milliseconds."],
              ["hash", "string", "Block hash."],
              ["height", "number", "Block height."],
              ["diff", "number", "Difficulty of this block."],
              [
                "shares",
                "number",
                "Share work the pool actually spent to hit this block; against diff, that is the round’s luck.",
              ],
              [
                "valid",
                "boolean",
                "Whether the block is valid; false means it was orphaned and does not count towards earnings.",
              ],
              [
                "unlocked",
                "boolean",
                "Whether it has unlocked. An unlocked block is one whose reward can be distributed.",
              ],
              ["value", "number", "The block’s full reward, in atomic units."],
              ["pool_type", "string", "Reward scheme. This pool runs pplns only."],
              ["port", "number", "The coin’s mining port."],
              [
                "pay_value",
                "number",
                "The block’s reward credited in XMR; 0 until processing completes.",
              ],
              [
                "pay_stage",
                "string",
                "The current processing stage of the block’s reward, as readable text.",
              ],
              [
                "pay_status",
                "string",
                "The result of that last step; an empty string means nothing went wrong.",
              ],
            ],
          },
        ],
        request: "GET /pool/coin_altblocks/9998?limit=15",
        response:
          '[\n  {\n    "ts": 1793543548917,\n    "hash": "129c1e6f0ed7495de61877691caa6952a77990567cb8725455756b159c98cd18",\n    "diff": 571111131,\n    "shares": 232570349,\n    "height": 1463495,\n    "valid": true,\n    "unlocked": false,\n    "pool_type": "pplns",\n    "value": 342750000000,\n    "pay_value": 0,\n    "pay_stage": "Unlocking wallet balance",\n    "pay_status": "",\n    "port": 9998\n  },\n  {\n    "ts": 1793543449947,\n    "hash": "1f2380153b7507f3fc27d54c50594919d34f808f41d6b8ce24a73005fabe9cde",\n    "diff": 570599409,\n    "shares": 110598566,\n    "height": 1463494,\n    "valid": true,\n    "unlocked": false,\n    "pool_type": "pplns",\n    "value": 342750000000,\n    "pay_value": 0,\n    "pay_stage": "Unlocking wallet balance",\n    "pay_status": "",\n    "port": 9998\n  }\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
    ],
  },
  {
    name: "Payouts",
    description:
      "Payments the pool has already sent. Each row is one on-chain transaction, which usually pays a lot of miners at once. Rows settled in USDT name the chain they went out on.",
    endpoints: [
      {
        id: "ep-poolPayments",
        title: "Get pool payments",
        blocks: [
          {
            kind: "paragraph",
            text: "Payment transactions the pool has sent, newest first. One transaction normally pays many miners at once; payees is how many it covered.",
          },
          {
            kind: "paragraph",
            text: "Cache: 60s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /pool/payments",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "limit",
                "number",
                "No",
                "Rows per page: 15, 50 or 100, default 15. Any other value is treated as 15.",
              ],
              ["page", "number", "No", "Page number, zero-based, up to 1000. Use it with limit."],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["id", "number", "Payment record ID."],
              ["hash", "string", "On-chain transaction hash."],
              ["ts", "number", "When it was paid, Unix milliseconds."],
              ["value", "number", "Total the transaction paid out, in atomic units."],
              ["payees", "number", "How many miners this one transaction covered."],
              [
                "fee",
                "number",
                "Blockchain network transfer cost of this transaction, in atomic units.",
              ],
              ["mixins", "number", "Ring size of the Monero transaction."],
              ["network", "string", "How it settled: XMR or USDT."],
              [
                "chain",
                "string | null",
                "Which chain the USDT went out on — tron, bsc, polygon, solana. null for XMR payments.",
              ],
              [
                "usdtAmount",
                "number | null",
                "The USDT figure when settled in USDT; null for XMR payments.",
              ],
              ["pool_type", "string", "Reward scheme. This pool runs pplns only."],
            ],
          },
        ],
        request: "GET /pool/payments?limit=15",
        response:
          '[\n  {\n    "id": 353833,\n    "hash": "499387e96ca621100b2b175c0041943b159fc09186fc5898c20be0d010e636ba",\n    "mixins": 10,\n    "payees": 15,\n    "fee": 147920000,\n    "value": 2718110000000,\n    "network": "XMR",\n    "chain": null,\n    "usdtAmount": null,\n    "ts": 1793542593000,\n    "pool_type": "pplns"\n  },\n  {\n    "id": 353832,\n    "hash": "f5c698e17a7a72ef7c4503fe356ff3a51b824af0d63a17ffe08f3ae2b39c17fa",\n    "mixins": 10,\n    "payees": 1,\n    "fee": 177280000,\n    "value": 13260000000,\n    "network": "XMR",\n    "chain": null,\n    "usdtAmount": null,\n    "ts": 1793542544000,\n    "pool_type": "pplns"\n  }\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
    ],
  },
  {
    name: "Fees and settlement",
    description:
      "USDT settlement chains with the minimum payout and withdrawal fee on each, plus the pool’s fee and payout configuration.",
    endpoints: [
      {
        id: "ep-usdtChains",
        title: "Get USDT settlement chains",
        blocks: [
          {
            kind: "paragraph",
            text: "The USDT settlement chains currently available, with the minimum payout and withdrawal fee on each.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /pool/usdt/chains",
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              [
                "success",
                "boolean",
                "Whether the request succeeded; on failure an error field gives the reason.",
              ],
              ["data", "object", "Response data. See the table below."],
            ],
          },
          {
            kind: "caption",
            text: "Inside data:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              [
                "enabled",
                "string[]",
                "USDT settlement chains currently available, e.g. tron, bsc, polygon, solana.",
              ],
              ["minPayout", "object", "USDT minimum payout per chain, keyed by chain name."],
              [
                "withdrawalFee",
                "object",
                "Withdrawal fee deducted from each USDT payment, per chain, keyed by chain name, in USDT.",
              ],
            ],
          },
        ],
        request: "GET /pool/usdt/chains",
        response:
          '{\n  "success": true,\n  "data": {\n    "enabled": [\n      "tron",\n      "bsc",\n      "polygon",\n      "solana"\n    ],\n    "minPayout": {\n      "tron": 25,\n      "bsc": 25,\n      "polygon": 25,\n      "eth": 25,\n      "solana": 25\n    },\n    "withdrawalFee": {\n      "tron": 1,\n      "bsc": 1,\n      "polygon": 1,\n      "eth": 1,\n      "solana": 1\n    }\n  }\n}',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-poolConfig",
        title: "Get fees and payout configuration",
        blocks: [
          {
            kind: "paragraph",
            text: "The pool’s fee and payout configuration: fees, payout thresholds, block confirmations, payout precision and the parameters for the XMR transfer fee.",
          },
          {
            kind: "paragraph",
            text: "Cache: 300s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /config",
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["pplns_fee", "number", "Pool fee for the PPLNS reward scheme, as a percentage."],
              ["dev_donation", "number", "Developer donation rate, as a percentage."],
              ["pool_dev_donation", "number", "Pool development donation rate, as a percentage."],
              [
                "min_wallet_payout",
                "number",
                "Minimum XMR payout, in atomic units (1e12 = 1 XMR).",
              ],
              [
                "min_exchange_payout",
                "number",
                "Minimum payout to an exchange address, in atomic units.",
              ],
              [
                "maturity_depth",
                "number",
                "Block confirmations required before a block’s reward is unlocked for distribution.",
              ],
              [
                "min_denom",
                "number",
                "Payout precision in atomic units; payout amounts are rounded to this.",
              ],
              ["coin_code", "string", "Settlement coin code."],
              ["payout_policy", "object", "Payout rules, in XMR. See the table below."],
            ],
          },
          {
            kind: "caption",
            text: "Inside payout_policy:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["minimumThreshold", "number", "Lowest payout threshold a miner can set, in XMR."],
              ["defaultThreshold", "number", "Default payout threshold, in XMR."],
              [
                "exchangeMinimumThreshold",
                "number",
                "Minimum payout threshold for exchange addresses, in XMR.",
              ],
              ["denomination", "number", "Payout precision, in XMR."],
              ["maturityDepth", "number", "Block confirmations, same as maturity_depth."],
              ["feeFormula", "object", "Parameters for the XMR transfer fee. See the table below."],
            ],
          },
          {
            kind: "caption",
            text: "Inside feeFormula:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              [
                "maxFee",
                "number",
                "Maximum transfer fee per payment, in XMR; charged in full when the payment is at or below the minimum payout.",
              ],
              [
                "zeroFeeThreshold",
                "number",
                "Payment amount at which the transfer fee drops to zero, in XMR. Between the minimum payout and this amount the fee decreases linearly; at or above it no transfer fee is charged.",
              ],
            ],
          },
        ],
        request: "GET /config",
        response:
          '{\n  "pplns_fee": 0,\n  "min_wallet_payout": 1000000000,\n  "min_exchange_payout": 100000000000,\n  "dev_donation": 0,\n  "pool_dev_donation": 0,\n  "maturity_depth": 30,\n  "min_denom": 1000000,\n  "coin_code": "XMR",\n  "payout_policy": {\n    "minimumThreshold": 0.001,\n    "defaultThreshold": 0.005,\n    "exchangeMinimumThreshold": 0.1,\n    "denomination": 1e-06,\n    "maturityDepth": 30,\n    "feeFormula": {\n      "maxFee": 0.0004,\n      "zeroFeeThreshold": 4\n    }\n  }\n}',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
    ],
  },
  {
    name: "A single miner",
    description:
      "Look up a single miner by wallet address: balance due, total paid, hashrate, shares, per-rig details and earnings history. This data is available without logging in; if you display it on your own pages, please respect the privacy of other people’s addresses.",
    endpoints: [
      {
        id: "ep-minerStats",
        title: "Get miner balance and stats",
        blocks: [
          {
            kind: "paragraph",
            text: "Balance and totals for one address: amtDue is the amount accrued but not yet paid, and amtPaid is the total paid to date. Suitable for balance monitoring.",
          },
          {
            kind: "paragraph",
            text: "Cache: 60s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /miner/{address}/stats",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "address",
                "string",
                "Yes",
                "The miner’s wallet address. For an integrated address (one with a payment id), write it as address.payment_id.",
              ],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              [
                "amtDue",
                "number",
                "Balance due, in atomic units: accrued earnings that have not yet reached the payout threshold.",
              ],
              ["amtPaid", "number", "Lifetime total paid, in atomic units."],
              ["txnCount", "number", "How many payments this address has received."],
              ["hash", "number", "Current reported hashrate, in the mined coin’s own H/s."],
              [
                "hash2",
                "number",
                "Pay hashrate — the XMR-equivalent figure earnings are computed from.",
              ],
              ["totalHashes", "number", "Hashes this address has contributed in total."],
              ["validShares", "number", "Shares accepted."],
              ["invalidShares", "number", "Shares rejected."],
              [
                "lastHash",
                "number",
                "Last share submitted, Unix seconds. Use it to decide whether a miner is still up.",
              ],
              ["lastShareAlgo", "string", "Algorithm the last share was for."],
              [
                "identifier",
                "string",
                'Always "global" — this row is the total across all of the address’s rigs.',
              ],
            ],
          },
        ],
        request: "GET /miner/YOUR_WALLET_ADDRESS/stats",
        response:
          '{\n  "hash": 1532,\n  "hash2": 0,\n  "identifier": "global",\n  "lastHash": 1793543210,\n  "lastShareAlgo": "pearlhash",\n  "totalHashes": 48216553901,\n  "validShares": 10432,\n  "invalidShares": 7,\n  "amtPaid": 412000000000,\n  "amtDue": 186430000000,\n  "txnCount": 3\n}',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-minerIdentifiers",
        title: "Get rig list",
        blocks: [
          {
            kind: "paragraph",
            text: "Lists every rig name registered under this address.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /miner/{address}/identifiers",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "address",
                "string",
                "Yes",
                "The miner’s wallet address. For an integrated address (one with a payment id), write it as address.payment_id.",
              ],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "paragraph",
            text: "Returns an array of strings — the rig names registered under this address, or an empty array if there are none.",
          },
        ],
        request: "GET /miner/YOUR_WALLET_ADDRESS/identifiers",
        response: '[\n  "rig-01",\n  "rig-02"\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-minerAllWorkers",
        title: "Get all rigs",
        blocks: [
          {
            kind: "paragraph",
            text: "Per-rig details for this address, grouped into online and offline. Responses can be slower for addresses with many rigs; to check a single rig, use the endpoint below.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /miner/{address}/stats/allWorkers",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "address",
                "string",
                "Yes",
                "The miner’s wallet address. For an integrated address (one with a payment id), write it as address.payment_id.",
              ],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["activeWorkers", "object", "Rigs that are online, keyed by rig name."],
              [
                "inactiveWorkers",
                "object",
                "Rigs that have gone offline but are still on record, keyed by rig name.",
              ],
            ],
          },
          {
            kind: "caption",
            text: "activeWorkers and inactiveWorkers are keyed by rig name; each value looks like this:",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              [
                "identifer",
                "string",
                "Rig name. Note that the field name is spelled identifer; read it under that name.",
              ],
              ["hash", "number", "Current reported hashrate, in the mined coin’s own H/s."],
              [
                "hash2",
                "number",
                "Pay hashrate — the XMR-equivalent figure earnings are computed from.",
              ],
              ["totalHash", "number", "Hashes this rig has contributed in total."],
              ["validShares", "number", "Shares accepted."],
              ["invalidShares", "number", "Shares rejected."],
              ["lts", "number", "Last share from this rig, Unix seconds."],
              ["port", "number", "The coin’s mining port."],
            ],
          },
        ],
        request: "GET /miner/YOUR_WALLET_ADDRESS/stats/allWorkers",
        response:
          '{\n  "activeWorkers": {\n    "rig-01": {\n      "identifer": "rig-01",\n      "lts": 1793543210,\n      "hash": 1532,\n      "hash2": 0,\n      "totalHash": 48216553901,\n      "validShares": 10432,\n      "invalidShares": 7,\n      "port": 18081\n    }\n  },\n  "inactiveWorkers": {}\n}',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-minerWorkerStats",
        title: "Get one rig",
        blocks: [
          {
            kind: "paragraph",
            text: "Details for a single rig; faster than requesting all rigs.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /miner/{address}/stats/{worker}",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "address",
                "string",
                "Yes",
                "The miner’s wallet address. For an integrated address (one with a payment id), write it as address.payment_id.",
              ],
              [
                "worker",
                "string",
                "Yes",
                "The rig name — the worker/rig id from the miner’s own config. /miner//identifiers will list them.",
              ],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              [
                "identifer",
                "string",
                "Rig name. Note that the field name is spelled identifer; read it under that name.",
              ],
              ["hash", "number", "Current reported hashrate, in the mined coin’s own H/s."],
              [
                "hash2",
                "number",
                "Pay hashrate — the XMR-equivalent figure earnings are computed from.",
              ],
              ["totalHash", "number", "Hashes this rig has contributed in total."],
              ["validShares", "number", "Shares accepted."],
              ["invalidShares", "number", "Shares rejected."],
              ["lts", "number", "Last share from this rig, Unix seconds."],
            ],
          },
        ],
        request: "GET /miner/YOUR_WALLET_ADDRESS/stats/rig-01",
        response:
          '{\n  "lts": 1793543210,\n  "identifer": "rig-01",\n  "hash": 1532,\n  "hash2": 0,\n  "totalHash": 48216553901,\n  "validShares": 10432,\n  "invalidShares": 7\n}',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-minerPayments",
        title: "Get miner payments",
        blocks: [
          {
            kind: "paragraph",
            text: "Payments this address has received, newest first. Rows settled in USDT carry the chain name.",
          },
          {
            kind: "paragraph",
            text: "Cache: 60s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /miner/{address}/payments",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "address",
                "string",
                "Yes",
                "The miner’s wallet address. For an integrated address (one with a payment id), write it as address.payment_id.",
              ],
              [
                "limit",
                "number",
                "No",
                "Rows per page: 15, 50 or 100, default 15. Any other value is treated as 15.",
              ],
              ["page", "number", "No", "Page number, zero-based, up to 1000. Use it with limit."],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["ts", "number", "When it was paid, Unix seconds."],
              [
                "amount",
                "number",
                "Amount paid to this address: atomic units for XMR payments (1e12 = 1 XMR); for USDT payments, 1e6 = 1 USDT.",
              ],
              ["network", "string", "How it settled: XMR or USDT."],
              [
                "chain",
                "string | null",
                "Which chain the USDT went out on — tron, bsc, polygon, solana. null for XMR payments.",
              ],
              ["txnHash", "string", "On-chain transaction hash."],
              ["mixin", "number", "Ring size of the Monero transaction."],
              ["pt", "string", "Reward scheme: pplns, or legacy for older records."],
            ],
          },
        ],
        request: "GET /miner/YOUR_WALLET_ADDRESS/payments?limit=15",
        response:
          '[\n  {\n    "pt": "pplns",\n    "ts": 1793542593,\n    "amount": 186430000000,\n    "txnHash": "499387e96ca621100b2b175c0041943b159fc09186fc5898c20be0d010e636ba",\n    "mixin": 16,\n    "network": "XMR",\n    "chain": null\n  },\n  {\n    "pt": "pplns",\n    "ts": 1792938120,\n    "amount": 58234000,\n    "txnHash": "f5c698e17a7a72ef7c4503fe356ff3a51b824af0d63a17ffe08f3ae2b39c17fa",\n    "mixin": 0,\n    "network": "USDT",\n    "chain": "tron"\n  }\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-minerPaymentsCount",
        title: "Get miner payment count",
        blocks: [
          {
            kind: "paragraph",
            text: "How many payments this address has received — the page count for the endpoint above.",
          },
          {
            kind: "paragraph",
            text: "Cache: 60s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /miner/{address}/payments_count",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "address",
                "string",
                "Yes",
                "The miner’s wallet address. For an integrated address (one with a payment id), write it as address.payment_id.",
              ],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [["count", "number", "Total number of payments."]],
          },
        ],
        request: "GET /miner/YOUR_WALLET_ADDRESS/payments_count",
        response: '{\n  "count": 0\n}',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-minerBlockPayments",
        title: "Get miner earnings per block",
        blocks: [
          {
            kind: "paragraph",
            text: "For each block the pool found in the last 7 days, this address’s cut of it. Useful for reconciling your own earnings against the blocks they came from; blocks you had no share in come back as 0.",
          },
          {
            kind: "paragraph",
            text: "Cache: 60s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /miner/{address}/block_payments",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "address",
                "string",
                "Yes",
                "The miner’s wallet address. For an integrated address (one with a payment id), write it as address.payment_id.",
              ],
              [
                "limit",
                "number",
                "No",
                "Rows per page: 15, 50 or 100, default 15. Any other value is treated as 15.",
              ],
              ["page", "number", "No", "Page number, zero-based, up to 1000. Use it with limit."],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["id", "number", "Record ID."],
              ["hash", "string", "Block hash."],
              ["port", "number", "The coin’s mining port."],
              ["ts_found", "number", "When the block was found, Unix seconds."],
              ["ts", "number", "When the block’s reward was distributed, Unix seconds."],
              [
                "value_percent",
                "number",
                "This address’s percentage of the block; 0 if it had no share in it.",
              ],
              [
                "value",
                "number",
                "What this address got from the block — whole coins, not atomic units.",
              ],
            ],
          },
        ],
        request: "GET /miner/YOUR_WALLET_ADDRESS/block_payments?limit=15",
        response:
          '[\n  {\n    "id": 268953,\n    "ts": 1793543776,\n    "ts_found": 1793310117,\n    "port": 18146,\n    "hash": "46fa8a3d3e961251de19e6b280500535cd97df90918f2d836339fa226dd6a1fd",\n    "value_percent": 0.4182,\n    "value": 0.002531\n  },\n  {\n    "id": 268952,\n    "ts": 1793539864,\n    "ts_found": 1793535060,\n    "port": 18081,\n    "hash": "d10db758dd702b5e6c3d2b64e9b1cdc666f8d5db6b0cbb82b93620731e4ebe3c",\n    "value_percent": 0.3975,\n    "value": 0.001407\n  }\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-minerDailyEarnings",
        title: "Get miner daily earnings",
        blocks: [
          {
            kind: "paragraph",
            text: "Earnings totalled per day, for the last 30 days.",
          },
          {
            kind: "paragraph",
            text: "Cache: 60s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /miner/{address}/daily_earnings",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "address",
                "string",
                "Yes",
                "The miner’s wallet address. For an integrated address (one with a payment id), write it as address.payment_id.",
              ],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["day", "string", "Date, in YYYY-MM-DD format."],
              ["value", "number", "That day’s earnings in XMR — whole coins, not atomic units."],
            ],
          },
        ],
        request: "GET /miner/YOUR_WALLET_ADDRESS/daily_earnings",
        response:
          '[\n  {\n    "day": "2026-10-30",\n    "value": 0.004812\n  },\n  {\n    "day": "2026-10-31",\n    "value": 0.005107\n  },\n  {\n    "day": "2026-11-01",\n    "value": 0.002233\n  }\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
      {
        id: "ep-minerHashChart",
        title: "Get miner hashrate history",
        blocks: [
          {
            kind: "paragraph",
            text: "Total hashrate over time for this address, carrying both the reported and the pay hashrate. Newest first.",
          },
          {
            kind: "paragraph",
            text: "Cache: 10s",
            meta: true,
          },
          {
            kind: "heading",
            level: 4,
            text: "HTTP request",
          },
          {
            kind: "request",
            text: "GET /miner/{address}/chart/hashrate",
          },
          {
            kind: "heading",
            level: 4,
            text: "Request parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Required", "Description"],
            rows: [
              [
                "address",
                "string",
                "Yes",
                "The miner’s wallet address. For an integrated address (one with a payment id), write it as address.payment_id.",
              ],
            ],
          },
          {
            kind: "heading",
            level: 4,
            text: "Response parameters",
          },
          {
            kind: "table",
            headers: ["Parameter", "Type", "Description"],
            rows: [
              ["ts", "number", "Sample time, Unix milliseconds."],
              ["hs", "number", "Reported hashrate, in the mined coin’s own H/s."],
              [
                "hs2",
                "number",
                "Pay hashrate — the XMR-equivalent figure earnings are actually computed from.",
              ],
            ],
          },
        ],
        request: "GET /miner/YOUR_WALLET_ADDRESS/chart/hashrate",
        response:
          '[\n  {\n    "ts": 1793012424000,\n    "hs": 13924784144384,\n    "hs2": 7552.6435546875\n  },\n  {\n    "ts": 1793012306000,\n    "hs": 27849568288768,\n    "hs2": 15105.287109375\n  },\n  {\n    "ts": 1793012187000,\n    "hs": 60925348413440,\n    "hs2": 33111.71875\n  }\n]',
        responseNote:
          "Sample captured 2026-11-01. For readability, per-port data and lists are trimmed to a few entries; values in /miner/ samples are illustrative.",
      },
    ],
  },
];
