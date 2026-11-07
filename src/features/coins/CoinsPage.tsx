import { Skeleton, Table } from "@arco-design/web-react";
import type { TableColumnProps } from "@arco-design/web-react";
import { PageShell } from "../../components/PageShell";
import { formatHashrate, formatNumber } from "../../lib/format";
import { useCoinsData, type CoinRow } from "./data";
import "./coins.css";

const COIN_ICON_BASE = "https://iconc3.oss-cn-hongkong.aliyuncs.com/coin_icon/";

function coinIconUrl(coin: string): string {
  return `${COIN_ICON_BASE}${coin.replace(/-T$/, "")}.png`;
}

function renderCoin(_value: unknown, row: CoinRow) {
  return (
    <span className="coin-cell">
      <img
        className="coin-cell__icon"
        src={coinIconUrl(row.coin)}
        alt={row.coin}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
      <span className="coin-cell__symbol">{row.coin}</span>
    </span>
  );
}

function renderActiveMiners(_value: unknown, row: CoinRow) {
  return formatNumber(row.activeMiners);
}

function renderEffort(_value: unknown, row: CoinRow) {
  const className =
    row.effort > 0 && row.effort <= 100
      ? "effort--good"
      : row.effort > 100
        ? "effort--over"
        : undefined;

  return <span className={className}>{row.effort > 0 ? `${row.effort.toFixed(1)}%` : "-"}</span>;
}

function renderPoolHashrate(_value: unknown, row: CoinRow) {
  return row.poolHashrate > 0 ? formatHashrate(row.poolHashrate) : "-";
}

function renderNetworkHashrate(_value: unknown, row: CoinRow) {
  return row.networkHashrate > 0 ? formatHashrate(row.networkHashrate) : "-";
}

function renderBlocksFound(_value: unknown, row: CoinRow) {
  return formatNumber(row.blocksFound);
}

function renderProfit(_value: unknown, row: CoinRow) {
  const className =
    row.profit >= 100
      ? "profit--high"
      : row.profit > 0 && row.profit < 50
        ? "profit--low"
        : undefined;

  return <span className={className}>{row.profit > 0 ? `${row.profit.toFixed(1)}%` : "-"}</span>;
}

const columns: TableColumnProps<CoinRow>[] = [
  {
    title: "Coin",
    dataIndex: "coin",
    key: "coin",
    width: 150,
    align: "center",
    render: renderCoin,
  },
  {
    title: "Active miners",
    dataIndex: "activeMiners",
    key: "activeMiners",
    width: 110,
    align: "center",
    sorter: (a, b) => a.activeMiners - b.activeMiners,
    render: renderActiveMiners,
  },
  {
    title: "Effort",
    dataIndex: "effort",
    key: "effort",
    width: 110,
    align: "center",
    sorter: (a, b) => a.effort - b.effort,
    render: renderEffort,
  },
  {
    title: "Pool hashrate",
    dataIndex: "poolHashrate",
    key: "poolHashrate",
    width: 150,
    align: "center",
    sorter: (a, b) => a.poolHashrate - b.poolHashrate,
    render: renderPoolHashrate,
  },
  {
    title: "Network hashrate",
    dataIndex: "networkHashrate",
    key: "networkHashrate",
    width: 160,
    align: "center",
    render: renderNetworkHashrate,
  },
  {
    title: "Blocks found",
    dataIndex: "blocksFound",
    key: "blocksFound",
    width: 120,
    align: "center",
    sorter: (a, b) => a.blocksFound - b.blocksFound,
    render: renderBlocksFound,
  },
  {
    title: "Profit",
    dataIndex: "profit",
    key: "profit",
    width: 110,
    align: "center",
    sorter: (a, b) => a.profit - b.profit,
    defaultSortOrder: "descend",
    render: renderProfit,
  },
];

export function CoinsPage() {
  const { rows, isLoading } = useCoinsData();
  const totalMiners = rows.reduce((total, row) => total + row.activeMiners, 0);

  return (
    <PageShell
      title="Coins"
      subtitle={`${rows.length} coins · ${formatNumber(totalMiners)} Active miners`}
    >
      <Skeleton loading={isLoading} animation image={false} text={{ rows: 6 }}>
        <div className="card card--table">
          <Table<CoinRow>
            columns={columns}
            data={rows}
            pagination={false}
            rowKey="port"
            size="middle"
            scroll={{ x: 950 }}
          />
        </div>
      </Skeleton>
    </PageShell>
  );
}
