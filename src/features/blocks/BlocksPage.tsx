import { Message, Select, Table, Tag } from "@arco-design/web-react";
import type { PaginationProps, TableColumnProps } from "@arco-design/web-react";
import { useMemo, useState } from "react";
import { PageShell } from "../../components/PageShell";
import { formatNumber } from "../../lib/format";
import { useBlocks, useBlocksStats } from "./api";
import {
  DEFAULT_COIN_PORT,
  DEFAULT_PAGE_SIZE,
  getCoinLabel,
  getCoinOptions,
  getCoinTotal,
  getEffortColor,
  mapBlockRows,
  PAGE_SIZE_OPTIONS,
  pickCoin,
} from "./mapping";
import type { BlockTableRow } from "./mapping";
import "./blocks.css";

async function copyHash(hash: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(hash);
    Message.success("Hash copied to clipboard");
  } catch {
    Message.error("Failed to copy hash");
  }
}

export function BlocksPage() {
  const [coinPort, setCoinPort] = useState(DEFAULT_COIN_PORT);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const statsQuery = useBlocksStats();
  const stats = statsQuery.data;
  const coins = useMemo(() => getCoinOptions(stats), [stats]);
  const coin = useMemo(() => pickCoin(coins, coinPort), [coins, coinPort]);
  const total = getCoinTotal(stats, coin.port);

  const blocksQuery = useBlocks(coin.port, page, pageSize);
  const rows = useMemo(() => {
    if (!blocksQuery.data) return [];
    return mapBlockRows(
      blocksQuery.data.rows,
      blocksQuery.data.pageIndex,
      blocksQuery.data.pageSize,
      coin,
      stats,
    );
  }, [blocksQuery.data, coin, stats]);

  const columns = useMemo<TableColumnProps<BlockTableRow>[]>(
    () => [
      { title: "ID", dataIndex: "id", key: "id", width: 70, align: "center" },
      { title: "Date", dataIndex: "date", key: "date", width: 180, align: "center" },
      { title: "Height", dataIndex: "height", key: "height", width: 110, align: "center" },
      {
        title: "Effort",
        key: "effort",
        width: 100,
        align: "center",
        render: (_value, record) => (
          <Tag color={getEffortColor(record.effort)}>{record.effort.toFixed(0)}%</Tag>
        ),
      },
      {
        title: "Reward",
        key: "reward",
        width: 160,
        align: "center",
        render: (_value, record) =>
          record.orphaned ? (
            <Tag color="red">Orphaned</Tag>
          ) : (
            <span className="blocks__mono">{record.reward}</span>
          ),
      },
      {
        title: "Status",
        key: "status",
        width: 130,
        align: "center",
        render: (_value, record) => <Tag color={record.status.color}>{record.status.label}</Tag>,
      },
      {
        title: "Payment",
        key: "payment",
        width: 160,
        align: "center",
        render: (_value, record) => (
          <span className={record.payment === "Pending" ? undefined : "blocks__mono"}>
            {record.payment}
          </span>
        ),
      },
      {
        title: "Hash",
        key: "hash",
        render: (_value, record) => (
          <button type="button" className="blocks__hash" onClick={() => void copyHash(record.hash)}>
            <code className="blocks__hash-code">{record.hash}</code>
          </button>
        ),
      },
    ],
    [],
  );

  const pagination: PaginationProps = {
    current: page,
    pageSize,
    total,
    sizeCanChange: true,
    sizeOptions: PAGE_SIZE_OPTIONS,
    showJumper: true,
    pageSizeChangeResetCurrent: true,
    showTotal: (count) => `${formatNumber(count)} blocks`,
  };

  function handleCoinChange(value: unknown): void {
    const nextPort = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(nextPort)) return;
    setCoinPort(nextPort);
    setPage(1);
  }

  function handleTableChange(next: PaginationProps): void {
    const nextPageSize = next.pageSize ?? pageSize;
    setPageSize(nextPageSize);
    setPage(nextPageSize === pageSize ? (next.current ?? 1) : 1);
  }

  // Replay fixtures only cover the captured pages; missing pages return 404 and render empty.
  const emptyElement = blocksQuery.isError ? (
    <div className="blocks__empty">
      No captured blocks at this page. The replay fixture covers XMR pages 1–4 and altcoin pages
      1–2.
    </div>
  ) : (
    <div className="blocks__empty">No blocks found.</div>
  );

  return (
    <PageShell
      title="Blocks found"
      subtitle={`${coin.symbol} · ${formatNumber(total)} blocks`}
      actions={
        <div className="blocks__controls">
          <span className="blocks__controls-label">Coin</span>
          <Select
            className="blocks__select"
            bordered={false}
            value={coin.port}
            onChange={handleCoinChange}
            options={coins.map((item) => ({ label: getCoinLabel(item), value: item.port }))}
          />
        </div>
      }
    >
      <div className="card card--table blocks__card">
        <Table<BlockTableRow>
          columns={columns}
          data={rows}
          rowKey="id"
          size="middle"
          loading={blocksQuery.isFetching}
          pagination={pagination}
          scroll={{ x: 1200 }}
          noDataElement={emptyElement}
          onChange={handleTableChange}
        />
      </div>
    </PageShell>
  );
}
