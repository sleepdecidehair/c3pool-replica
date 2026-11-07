import {
  IconEmail,
  IconGithub,
  IconLink,
  IconSend,
  IconTwitter,
} from "@arco-design/web-react/icon";
import { Link } from "react-router";

interface FooterLink {
  label: string;
  to?: string;
  href?: string;
}

const productLinks: FooterLink[] = [
  { label: "C3Pool", href: "https://c3pool.com" },
  { label: "C3Pool Mobile App", to: "/mobile-app" },
  { label: "C3 Miner for desktop", to: "/desktop-app" },
];

const helpLinks: FooterLink[] = [
  { label: "Help Center", to: "/help" },
  { label: "Official Channel Verification", to: "/verify" },
  { label: "Feedback & Suggestions", to: "/feedback" },
  { label: "Report Abuse", to: "/abuse-report" },
  { label: "Law Enforcement Requests", to: "/law-enforcement" },
  { label: "API", to: "/api" },
];

const aboutLinks: FooterLink[] = [
  { label: "About Us", to: "/about" },
  { label: "Announcements", to: "/announcements" },
  { label: "Community", to: "/community" },
  { label: "Terms of Service", to: "/legal/service" },
  { label: "Privacy Policy", to: "/legal/privacy" },
  { label: "Disclaimer", to: "/legal/disclaimer" },
];

const partnerLinks: FooterLink[] = [
  { label: "MinerBox", href: "https://www.witplex.com/MinerBox/" },
  { label: "算力宝", href: "https://qm.qq.com/q/GkUR2udiy4" },
];

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="app-footer__col">
      <h4>{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            {link.href ? (
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ) : (
              <Link to={link.to ?? "/"}>{link.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__col app-footer__brand-col">
          <div className="app-footer__brand">
            <img className="app-footer__logo" src="/replica-assets/logo.png" alt="C3Pool" />
            <span className="app-footer__brand-text">C3Pool</span>
          </div>
          <p className="app-footer__tagline">Boundless Power, Infinite Exploration</p>
          <div className="app-footer__socials">
            <a
              className="app-footer__social"
              href="https://x.com/C3_Pool"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              <IconTwitter />
            </a>
            <a
              className="app-footer__social"
              href="https://t.me/C3PoolChinese"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <IconSend />
            </a>
            <a
              className="app-footer__social"
              href="https://discord.gg/U56FGnNF2N"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
            >
              <IconLink />
            </a>
            <a
              className="app-footer__social"
              href="https://github.com/C3Pool"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <IconGithub />
            </a>
            <a className="app-footer__social" href="mailto:support@c3pool.com" aria-label="Email">
              <IconEmail />
            </a>
          </div>
        </div>

        <FooterColumn title="Product" links={productLinks} />
        <FooterColumn title="Help" links={helpLinks} />
        <FooterColumn title="About" links={aboutLinks} />
        <FooterColumn title="Partners" links={partnerLinks} />
      </div>

      <div className="app-footer__bottom">© 2018-2026 C3Pool. All rights reserved.</div>
    </footer>
  );
}
