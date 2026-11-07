import { Select } from "@arco-design/web-react";
import { IconCheck, IconCopy } from "@arco-design/web-react/icon";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  apiDocsGroups,
  apiDocsIntroRequest,
  apiDocsNav,
  apiDocsOverview,
  apiDocsTitle,
  type ProseBlock,
} from "./data";
import "./api-docs.css";

const ACTIVE_LINE_PX = 120;

function RequestChip({ text }: { text: string }) {
  const match = /^(GET|POST)\s+(.+)$/.exec(text);
  if (!match) {
    return <code className="api-chip">{text}</code>;
  }
  return (
    <code className="api-chip">
      <span className="api-chip__method">{match[1]}</span>
      <span>{match[2]}</span>
    </code>
  );
}

function ParamTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  const typeIndex = headers.findIndex((header) => header.toLowerCase() === "type");
  return (
    <div className="api-table-wrap">
      <table className="api-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row[0] ?? String(rowIndex)}>
              {row.map((cell, cellIndex) => (
                <td key={headers[cellIndex] ?? String(cellIndex)}>
                  {cellIndex === 0 ? (
                    <code>{cell}</code>
                  ) : cellIndex === typeIndex ? (
                    <span className="api-table__type">{cell}</span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProseBlocks({ blocks }: { blocks: ProseBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.kind}-${index}`;
        switch (block.kind) {
          case "heading":
            return block.level === 3 ? (
              <h3 key={key} className="api-label">
                {block.text}
              </h3>
            ) : (
              <h4 key={key} className="api-label">
                {block.text}
              </h4>
            );
          case "paragraph": {
            if (block.meta) {
              const cache = /^Cache:\s*(.*)$/.exec(block.text);
              return (
                <p key={key} className="api-meta">
                  <strong>Cache: </strong>
                  {cache ? cache[1] : block.text}
                </p>
              );
            }
            return (
              <p key={key} className={block.muted ? "api-p api-p--muted" : "api-p"}>
                {block.text}
              </p>
            );
          }
          case "caption":
            return (
              <p key={key} className="api-caption">
                {block.text}
              </p>
            );
          case "request":
            return <RequestChip key={key} text={block.text} />;
          case "table":
            return <ParamTable key={key} headers={block.headers} rows={block.rows} />;
          default:
            return null;
        }
      })}
    </>
  );
}

function CodePanel({ label, code, note }: { label: string; code: string; note?: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="api-block">
      <div className="api-block__head">
        <span>{label}</span>
        <button
          type="button"
          className="api-copy"
          aria-label={`Copy ${label.toLowerCase()}`}
          title={copied ? "Copied" : "Copy"}
          onClick={() => {
            void copyCode();
          }}
        >
          {copied ? <IconCheck /> : <IconCopy />}
        </button>
      </div>
      <pre className="api-pre api-pre--json">
        <code>{code}</code>
      </pre>
      {note ? <p className="api-block__note">{note}</p> : null}
    </div>
  );
}

function Sidebar({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
  return (
    <aside className="api-nav">
      <div className="api-nav__mobile">
        <span className="api-nav__mobile-label">Endpoints</span>
        <Select
          className="api-nav__select"
          value={activeId}
          onChange={(value) => {
            if (typeof value === "string") onNavigate(value);
          }}
        >
          {apiDocsNav.flatMap((group) =>
            group.items.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {group.name} · {item.label}
              </Select.Option>
            )),
          )}
        </Select>
      </div>
      <nav className="api-nav__list" aria-label="Endpoints">
        <p className="api-nav__brand">{apiDocsTitle}</p>
        {apiDocsNav.map((group) => (
          <Fragment key={group.name || "overview"}>
            <p className="api-nav__group">{group.name}</p>
            {group.items.map((item) => (
              <a
                key={item.id}
                href={`#/api#${item.id}`}
                className={`api-nav__item${activeId === item.id ? " is-active" : ""}`}
                aria-current={activeId === item.id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </Fragment>
        ))}
      </nav>
    </aside>
  );
}

export function ApiDocsPage() {
  const sectionIds = useMemo(
    () => apiDocsNav.flatMap((group) => group.items.map((item) => item.id)),
    [],
  );
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      let current = sectionIds[0] ?? "";
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= ACTIVE_LINE_PX) {
          current = id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  const navigateTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <div className="api-docs">
      <Sidebar activeId={activeId} onNavigate={navigateTo} />
      <div className="api-body">
        <section className="api-row api-row--intro">
          <div className="api-prose">
            <h1 className="api-h1">{apiDocsTitle}</h1>
            {apiDocsOverview.map((item) => (
              <div key={item.id} id={item.id} className="api-ov">
                <h2 className="api-h3">{item.title}</h2>
                <ProseBlocks blocks={item.blocks} />
              </div>
            ))}
          </div>
          <div className="api-code">
            <div className="api-code__sticky">
              <CodePanel label="Request" code={apiDocsIntroRequest} />
            </div>
          </div>
        </section>

        {apiDocsGroups.map((group) => (
          <Fragment key={group.name}>
            <section className="api-row api-row--group">
              <div className="api-prose">
                <h2 className="api-h2">{group.name}</h2>
                <p className="api-p">{group.description}</p>
              </div>
              <div className="api-code" aria-hidden="true" />
            </section>
            {group.endpoints.map((endpoint) => (
              <section key={endpoint.id} id={endpoint.id} className="api-row">
                <div className="api-prose">
                  <h3 className="api-h3">{endpoint.title}</h3>
                  <ProseBlocks blocks={endpoint.blocks} />
                </div>
                <div className="api-code">
                  <div className="api-code__sticky">
                    <CodePanel label="Request" code={endpoint.request} />
                    <CodePanel
                      label="Response"
                      code={endpoint.response}
                      note={endpoint.responseNote}
                    />
                  </div>
                </div>
              </section>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
