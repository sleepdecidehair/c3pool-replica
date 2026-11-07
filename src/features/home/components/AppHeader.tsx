import { Dropdown, Menu, Message } from "@arco-design/web-react";
import {
  IconDown,
  IconDownload,
  IconMenu,
  IconMoon,
  IconSun,
  IconUser,
} from "@arco-design/web-react/icon";
import { NavLink, useNavigate } from "react-router";
import { truncateAddress } from "../../../lib/format";
import { useUiStore } from "../../../stores/ui";

interface MenuEntry {
  key: string;
  label: string;
}

const primaryLinks: MenuEntry[] = [
  { key: "/", label: "Home" },
  { key: "/coins", label: "Coins" },
  { key: "/explorer/blocks", label: "Blocks" },
  { key: "/explorer/payments", label: "Payments" },
];

const productLinks: MenuEntry[] = [
  { key: "/mobile-app", label: "C3Pool Mobile App" },
  { key: "/desktop-app", label: "C3 Miner for desktop" },
  { key: "/api", label: "API" },
];

const moreLinks: MenuEntry[] = [
  { key: "/help", label: "Help Center" },
  { key: "/verify", label: "Official Channel Verification" },
  { key: "/announcements", label: "Announcements" },
  { key: "/community", label: "Community" },
  { key: "/about", label: "About Us" },
  { key: "/feedback", label: "Feedback & Suggestions" },
  { key: "/abuse-report", label: "Report Abuse" },
  { key: "/law-enforcement", label: "Law Enforcement Requests" },
];

const languages = ["English", "中文", "繁體中文", "日本語", "한국어", "Русский"];
const currencies = ["USDT", "BTC", "USD"];

const mobileLinks: MenuEntry[] = [...primaryLinks, ...productLinks, ...moreLinks];

function MenuList({ items, onSelect }: { items: MenuEntry[]; onSelect: (key: string) => void }) {
  return (
    <Menu onClickMenuItem={(key) => onSelect(key)}>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );
}

function focusAddressSearch() {
  const input = document.getElementById("address-search-input");
  if (input instanceof HTMLInputElement) {
    input.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => input.focus(), 320);
  }
}

export function AppHeader() {
  const navigate = useNavigate();
  const address = useUiStore((state) => state.address);
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);
  const language = useUiStore((state) => state.language);
  const setLanguage = useUiStore((state) => state.setLanguage);
  const currency = useUiStore((state) => state.currency);
  const setCurrency = useUiStore((state) => state.setCurrency);

  const selectLanguage = (value: string) => {
    setLanguage(value);
    if (value !== "English") {
      Message.info("当前复刻仅提供英文内容，语言切换待接入");
    }
  };

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <a className="app-header__brand" href="#/">
          <img className="app-header__logo" src="/replica-assets/logo.png" alt="C3Pool" />
          <span className="app-header__brand-text">C3Pool</span>
        </a>
        <span className="app-header__divider" />

        <nav className="app-header__links" aria-label="Primary">
          {primaryLinks.map((item) => (
            <NavLink
              key={item.key}
              to={item.key}
              end={item.key === "/"}
              className={({ isActive }) => `app-header__link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
          <Dropdown
            droplist={<MenuList items={productLinks} onSelect={navigate} />}
            trigger="click"
            position="bl"
          >
            <span className="app-header__link">
              Products <IconDown className="app-header__nav-arrow" />
            </span>
          </Dropdown>
          <Dropdown
            droplist={<MenuList items={moreLinks} onSelect={navigate} />}
            trigger="click"
            position="bl"
          >
            <span className="app-header__link">
              More <IconDown className="app-header__nav-arrow" />
            </span>
          </Dropdown>
        </nav>

        <div className="app-header__actions">
          <button
            type="button"
            className={`app-header__address-btn${address ? " is-valid" : ""}`}
            onClick={focusAddressSearch}
          >
            <IconUser />
            <span>{address ? truncateAddress(address) : "Enter address"}</span>
          </button>
          <button
            type="button"
            className="app-header__app"
            onClick={() => navigate("/desktop-app")}
          >
            <IconDownload />
            <span className="app-header__app-label">Download App</span>
          </button>
          <span className="app-header__divider" />
          <Dropdown
            droplist={
              <Menu onClickMenuItem={(key) => selectLanguage(key)}>
                {languages.map((value) => (
                  <Menu.Item key={value}>{value}</Menu.Item>
                ))}
              </Menu>
            }
            trigger="click"
          >
            <button type="button" className="app-header__lang">
              {language === "English" ? "EN" : language} <IconDown />
            </button>
          </Dropdown>
          <Dropdown
            droplist={
              <Menu onClickMenuItem={(key) => setCurrency(key)}>
                {currencies.map((value) => (
                  <Menu.Item key={value}>{value}</Menu.Item>
                ))}
              </Menu>
            }
            trigger="click"
          >
            <button type="button" className="app-header__lang">
              {currency} <IconDown />
            </button>
          </Dropdown>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>
          <Dropdown
            droplist={<MenuList items={mobileLinks} onSelect={navigate} />}
            trigger="click"
            position="br"
          >
            <button type="button" className="app-header__menu-btn" aria-label="Open navigation">
              <IconMenu />
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
