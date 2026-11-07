export const XMR_COIN_ID = "18081";
export const XMR_BLOCK_TIME_SECONDS = 120;

const HASHRATE_UNITS = ["H/s", "KH/s", "MH/s", "GH/s", "TH/s", "PH/s", "EH/s"] as const;

export function formatHashrate(hashrate: number): string {
  if (!Number.isFinite(hashrate) || hashrate <= 0) return "—";
  let value = hashrate;
  let unitIndex = 0;
  while (value >= 1000 && unitIndex < HASHRATE_UNITS.length - 1) {
    value /= 1000;
    unitIndex += 1;
  }
  return `${value.toFixed(2)} ${HASHRATE_UNITS[unitIndex]}`;
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

export function formatAnnouncementDate(value: string | undefined): string {
  if (!value) return "";
  const parsed = new Date(value.replace(" ", "T"));
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase();
}

export function truncateAddress(address: string, head = 8, tail = 6): string {
  if (address.length <= head + tail + 3) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}
