import { Message } from "@arco-design/web-react";
import {
  IconCheckCircle,
  IconCopy,
  IconExclamationCircle,
  IconSafe,
  IconSearch,
} from "@arco-design/web-react/icon";
import { useState, type FormEvent } from "react";
import { PageShell } from "../../components/PageShell";
import { useOfficialChannels, type OfficialChannel } from "./api";
import "./verify.css";

const SECTIONS = [
  { key: "site", label: "Websites" },
  { key: "support", label: "Support" },
  { key: "social", label: "Communities" },
  { key: "dev", label: "Development" },
] as const;

const EXAMPLES = ["c3pool.com", "support@c3pool.com", "@C3PoolChinese"] as const;

type VerifyResult =
  | { status: "match"; channel: OfficialChannel }
  | { status: "miss"; input: string };

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^mailto:/, "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/^@/, "")
    .replace(/\/.*$/, "")
    .replace(/\/+$/, "");
}

function channelCandidates(channel: OfficialChannel): string[] {
  const candidates = [channel.value];
  if (channel.url) {
    candidates.push(channel.url);
    try {
      const parsed = new URL(channel.url);
      candidates.push(parsed.hostname);
      candidates.push(parsed.pathname.replace(/^\//, ""));
    } catch {
      // The captured URL is not parseable; the raw value still participates in matching.
    }
  }
  return candidates.map(normalize).filter((candidate) => candidate.length > 0);
}

function findChannel(channels: OfficialChannel[], input: string): OfficialChannel | undefined {
  const needle = normalize(input);
  return channels.find((channel) => channelCandidates(channel).includes(needle));
}

async function copyValue(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    Message.success("Copied");
  } catch {
    Message.error("Copy failed");
  }
}

export function VerifyPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const { data, isPending, isError, refetch } = useOfficialChannels();

  const channels = data ?? [];
  const canSubmit = input.trim().length > 0 && !isPending && !isError;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    const channel = findChannel(channels, value);
    setResult(channel ? { status: "match", channel } : { status: "miss", input: value });
  }

  return (
    <div className="verify-page">
      <PageShell
        title={
          <>
            <span className="verify-page__icon" aria-hidden="true">
              <IconSafe />
            </span>
            <span>Official Channel Verification</span>
          </>
        }
        subtitle="Paste a website, email address, Telegram / X / Discord handle and we will tell you whether it is really ours."
      >
        <div className="verify-page__body">
          <form className="verify-box" onSubmit={handleSubmit}>
            <label className="verify-box__label" htmlFor="verify-input">
              What do you want to check?
            </label>
            <div className="verify-box__row">
              <input
                id="verify-input"
                className="verify-box__input"
                type="text"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="c3pool.com · support@c3pool.com · @C3PoolChinese"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  setResult(null);
                }}
              />
              <button className="verify-box__btn" type="submit" disabled={!canSubmit}>
                <IconSearch aria-hidden="true" />
                <span>Verify</span>
              </button>
            </div>
            <div className="verify-box__examples">
              <span>Try</span>
              {EXAMPLES.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => {
                    setInput(example);
                    setResult(null);
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
          </form>

          {result ? (
            <div
              className={
                result.status === "match"
                  ? "verify-result verify-result--match"
                  : "verify-result verify-result--miss"
              }
              role="status"
              aria-live="polite"
            >
              {result.status === "match" ? (
                <IconCheckCircle aria-hidden="true" />
              ) : (
                <IconExclamationCircle aria-hidden="true" />
              )}
              <div>
                <strong>
                  {result.status === "match"
                    ? "Official channel confirmed"
                    : "Not an official channel"}
                </strong>
                {result.status === "match" ? (
                  <p>
                    {result.channel.label}
                    {result.channel.url ? (
                      <>
                        {" "}
                        ·{" "}
                        <a href={result.channel.url} target="_blank" rel="noopener noreferrer">
                          {result.channel.value}
                        </a>
                      </>
                    ) : (
                      ` · ${result.channel.value}`
                    )}
                  </p>
                ) : (
                  <p>
                    “{result.input}” does not appear in our official list. Treat it as untrusted and
                    check the directory below.
                  </p>
                )}
              </div>
            </div>
          ) : null}

          {isPending ? <p className="verify-page__status">Loading official channels…</p> : null}

          {isError ? (
            <div className="verify-page__status verify-page__status--error" role="alert">
              <p>Unable to load the official channel list.</p>
              <button type="button" onClick={() => void refetch()}>
                Retry
              </button>
            </div>
          ) : null}

          {!isPending && !isError ? (
            <section className="verify-directory">
              <h2>Our official channels</h2>
              <p className="verify-directory__sub">
                The complete list. Anything not here is not us.
              </p>
              {SECTIONS.map((section) => {
                const items = channels.filter((channel) => channel.section === section.key);
                if (items.length === 0) return null;
                return (
                  <div key={section.key} className="verify-directory__group">
                    <h3>{section.label}</h3>
                    <ul>
                      {items.map((channel) => (
                        <li key={`${channel.section}-${channel.type}-${channel.value}`}>
                          <div className="verify-directory__main">
                            {channel.url ? (
                              <a href={channel.url} target="_blank" rel="noopener noreferrer">
                                {channel.label}
                              </a>
                            ) : (
                              <span>{channel.label}</span>
                            )}
                            <code>{channel.value}</code>
                          </div>
                          <div className="verify-directory__side">
                            <button
                              type="button"
                              className="verify-directory__copy"
                              onClick={() => void copyValue(channel.value)}
                            >
                              <IconCopy aria-hidden="true" />
                              <span>Copy</span>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <p className="verify-page__disclaimer">
                C3Pool staff will never ask for your wallet private key or seed phrase, and will
                never ask you to transfer funds for “verification”.
              </p>
            </section>
          ) : null}
        </div>
      </PageShell>
    </div>
  );
}
