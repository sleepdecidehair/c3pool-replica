import {
  IconCloudDownload,
  IconCopy,
  IconDashboard,
  IconDesktop,
  IconMoon,
  IconStorage,
  IconThunderbolt,
} from "@arco-design/web-react/icon";
import { useState, type ReactNode } from "react";
import { PageShell } from "../../components/PageShell";
import { DESKTOP_RELEASE_FALLBACK, formatFileSize, useDesktopRelease } from "./api";
import "./apps.css";

const DESKTOP_SCREENSHOT = "/replica-assets/desktop-dashboard.jpg";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface InstallStep {
  title: string;
  description: string;
  directory?: string;
}

const FEATURES: readonly Feature[] = [
  {
    icon: <IconThunderbolt />,
    title: "One click to start",
    description:
      "Downloads and verifies C3Pool's xmrig-C3 for you; the pool picks the most profitable algorithm. No config files to write.",
  },
  {
    icon: <IconDashboard />,
    title: "Live monitoring",
    description:
      "Hashrate chart, shares, miner logs, CPU model and temperature, plus this computer's pool hashrate, pending balance and daily earnings.",
  },
  {
    icon: <IconMoon />,
    title: "Stays out of your way",
    description:
      "Limit CPU usage, pause while you use the computer or run on battery and resume when idle. Starts at sign-in and keeps running in the tray.",
  },
  {
    icon: <IconStorage />,
    title: "Every payout address",
    description:
      "XMR, USDT-TRC20, USDT-BEP20 / Polygon (0x address with a settlement chain of your choice) and USDT-SPL (Solana).",
  },
];

const INSTALL_STEPS: readonly InstallStep[] = [
  {
    title: `"Isn't commonly downloaded"`,
    description:
      'Edge may say the installer "isn\'t commonly downloaded". Right-click it in the downloads list → "Keep" → open the arrow next to "Delete" → "Keep anyway".',
  },
  {
    title: '"Windows protected your PC"',
    description:
      'The installer is not code-signed yet. Click "More info" → "Run anyway" to continue.',
  },
  {
    title: "Runs as administrator",
    description:
      "You confirm once at start. The miner needs it for huge pages and MSR tuning; without them the hashrate is much lower.",
  },
  {
    title: "Allow the C3 Miner folder in your antivirus",
    description:
      "Antivirus software often flags and deletes mining programs by mistake. Add this folder — the mining programs are inside it too — to its exclusions or allow list, including Microsoft Defender:",
    directory: "C:\\Program Files\\C3 Miner",
  },
  {
    title: "First run",
    description:
      "The miner first measures algorithm performance for about 3 minutes. Restart the computer once after huge pages are enabled for about 50% more hashrate.",
  },
];

export function DesktopAppPage() {
  const query = useDesktopRelease();
  const release = query.data ?? DESKTOP_RELEASE_FALLBACK;
  const [copied, setCopied] = useState(false);

  function handleCopySha() {
    const clipboard = navigator.clipboard;
    if (!clipboard) return;
    void clipboard
      .writeText(release.sha256)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  }

  return (
    <div className="apps-page apps-page--desktop">
      <PageShell
        title="C3 Miner for desktop"
        subtitle="Enter your payout address and a worker name, then start CPU mining with one click. The miner is downloaded, verified and run in the background, with hashrate, logs, hardware status and pool earnings in one window."
      >
        <section className="apps-hero" aria-label="Download C3 Miner for Windows">
          <div className="apps-actions">
            <a className="apps-btn apps-btn--primary" href={release.mirror_url} rel="noopener">
              <IconDesktop />
              <span>
                <b>Download for Windows</b>
                <small>
                  v{release.version} · {formatFileSize(release.file_size)} · Windows 10 / 11 ·
                  64-bit
                </small>
              </span>
            </a>
            <a className="apps-btn apps-btn--alt" href={release.download_url} rel="noopener">
              <IconCloudDownload />
              <span>
                <b>Alternative download</b>
                <small>GitHub</small>
              </span>
            </a>
          </div>

          <div className="apps-sha">
            <span>SHA-256</span>
            <code>{release.sha256}</code>
            <button
              type="button"
              aria-label={copied ? "Copied" : "Copy SHA-256"}
              title={copied ? "Copied" : "Copy SHA-256"}
              onClick={handleCopySha}
            >
              <IconCopy />
            </button>
          </div>

          <div className="apps-shot apps-shot--desktop">
            <img src={DESKTOP_SCREENSHOT} alt="C3 Miner dashboard" width={1600} height={1040} />
          </div>
        </section>

        <section className="apps-section apps-section--features">
          <h2>What it does</h2>
          <div className="apps-grid">
            {FEATURES.map((feature) => (
              <article className="card apps-card" key={feature.title}>
                <span className="apps-card__icon" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="apps-section apps-section--last">
          <h2>Before you install</h2>
          <ol className="apps-steps">
            {INSTALL_STEPS.map((step, index) => (
              <li className="card apps-step" key={step.title}>
                <span className="apps-step__num" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {step.directory ? (
                    <code className="apps-step__dirs">{step.directory}</code>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </PageShell>
    </div>
  );
}
