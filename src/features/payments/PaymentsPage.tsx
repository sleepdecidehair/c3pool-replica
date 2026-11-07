import { Message, Table, Tag } from "@arco-design/web-react";
import type { PaginationProps, TableColumnProps } from "@arco-design/web-react";
import { useMemo, useState } from "react";
import { PageShell } from "../../components/PageShell";
import { formatNumber } from "../../lib/format";
import { usePayments, usePaymentsStats } from "./api";
import { DEFAULT_PAGE_SIZE, mapPaymentRow, PAGE_SIZE_OPTIONS } from "./mapping";
import type { PaymentTableRow } from "./mapping";
import "./payments.css";

const XMR_EXPLORER_BASE = "https://xmrchain.net/tx/";

async function copyHash(hash: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(hash);
    Message.success("Hash copied to clipboard");
    return;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = hash;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      if (!document.execCommand("copy")) throw new Error("copy failed");
      Message.success("Hash copied to clipboard");
    } catch {
      Message.error("Failed to copy hash");
    } finally {
      textarea.remove();
    }
  }
}

function handleHashClick(row: PaymentTableRow): void {
  if (row.network === "XMR") {
    window.open(`${XMR_EXPLORER_BASE}${row.hash}`, "_blank", "noopener");
    return;
  }
  void copyHash(row.hash);
}

function PaymentHash({ row }: { row: PaymentTableRow }) {
  return (
    <button
      type="button"
      className="payments__hash"
      aria-label={`Transaction hash ${row.hash}`}
      onClick={() => handleHashClick(row)}
    >
      <code className="payments__hash-code">{row.hash}</code>
    </button>
  );
}

export function PaymentsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const statsQuery = usePaymentsStats();
  const total = statsQuery.data ?? 0;

  const paymentsQuery = usePayments(page - 1, pageSize);
  const rows = useMemo(
    () => (paymentsQuery.data?.rows ?? []).map(mapPaymentRow),
    [paymentsQuery.data],
  );

  const columns = useMemo<TableColumnProps<PaymentTableRow>[]>(
    () => [
      { title: "ID", dataIndex: "id", key: "id", width: 100 },
      { title: "Date", dataIndex: "date", key: "date", width: 180 },
      {
        title: "Network",
        key: "network",
        width: 140,
        render: (_value, record) => (
          <Tag color={record.network === "USDT" ? "green" : undefined}>{record.network}</Tag>
        ),
      },
      {
        title: "Payees",
        key: "payees",
        width: 110,
        render: (_value, record) => <span className="payments__mono">{record.payees}</span>,
      },
      {
        title: "Amount",
        key: "amount",
        width: 200,
        render: (_value, record) => <span className="payments__mono">{record.amount}</span>,
      },
      {
        title: "Fee",
        key: "fee",
        width: 180,
        render: (_value, record) => <span className="payments__mono">{record.fee}</span>,
      },
      {
        title: "Hash",
        key: "hash",
        render: (_value, record) => <PaymentHash row={record} />,
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
    showTotal: (count) => `${formatNumber(count)} payments`,
  };

  function handleTableChange(next: PaginationProps): void {
    const nextPageSize = next.pageSize ?? pageSize;
    setPageSize(nextPageSize);
    setPage(nextPageSize === pageSize ? (next.current ?? 1) : 1);
  }

  // Replay fixtures only cover pages 0-3 at limit=15.
  const emptyElement = paymentsQuery.isError ? (
    <div className="payments__empty">
      No captured payments at this page. The replay fixture covers the first 4 pages at 15 rows per
      page.
    </div>
  ) : (
    <div className="payments__empty">No payments found.</div>
  );

  return (
    <PageShell title="Pool payments" subtitle={`${formatNumber(total)} payments`}>
      <div className="card card--table payments__card">
        <Table<PaymentTableRow>
          columns={columns}
          data={rows}
          rowKey="id"
          size="middle"
          loading={paymentsQuery.isFetching}
          pagination={pagination}
          scroll={{ x: 1100 }}
          noDataElement={emptyElement}
          onChange={handleTableChange}
        />
      </div>
    </PageShell>
  );
}
