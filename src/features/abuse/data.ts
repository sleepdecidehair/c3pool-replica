export interface GuideSection {
  title: string;
  items: readonly string[];
}

export const ABUSE_GUIDE: readonly GuideSection[] = [
  {
    title: "What happens next",
    items: [
      "You get a reference number, and a confirmation is sent to the email address you give.",
      "We check the mining records of the reported wallet addresses on C3Pool.",
      "Where abuse is confirmed, we stop payouts to the address and refuse connections from its miners.",
      "If we need more information, we will contact you at the email address you left.",
      "We cannot remove malware from your devices remotely. C3Pool does not collect miners’ identities, so we cannot provide them either.",
    ],
  },
  {
    title: "Finding the wallet address",
    items: [
      "Linux: find the process using a lot of CPU with top or ps aux, then read its arguments in /proc/PID/cmdline.",
      "Windows: open the Details tab of Task Manager, right-click a column header and add the “Command line” column.",
      "The wallet address usually follows -u or --user, or sits in the user field of a configuration file such as config.json.",
      "If the pool address it connects to contains “c3pool”, it is mining to us.",
      "Enter the wallet address at the top of this site to see its hashrate and payouts on C3Pool and confirm it is mining to us.",
    ],
  },
  {
    title: "What to attach",
    items: [
      "Screenshots of the process list or command line.",
      "The miner’s configuration file and the script that downloaded or started it.",
      "Relevant logs, such as login records, scheduled tasks or service definitions.",
      "Malware samples in a password-protected ZIP using the password infected — say so in the description.",
      "Third-party analysis reports, as files or links.",
    ],
  },
  {
    title: "Please note",
    items: [
      "We can only act on addresses mining to C3Pool. Malware often connects to several pools at once — report the other addresses to those pools.",
      "Executables cannot be uploaded directly; put them in an encrypted archive.",
      "Please submit each incident once. To add material later, email the address below and quote your reference.",
    ],
  },
  {
    title: "Cleaning up",
    items: [
      "Stop the miner and remove how it restarts: crontab entries, systemd services, Windows scheduled tasks and services.",
      "Check ~/.ssh/authorized_keys for keys you do not recognise.",
      "Change any leaked passwords and keys, and patch the vulnerability that was used.",
      "If a cloud server or cloud account was misused, contact your cloud provider as well.",
    ],
  },
];

export const ABUSE_CATEGORIES = [
  "Botnet / malware",
  "Compromised server or cloud account",
  "Unauthorised use of organisation devices",
  "Other",
] as const;

export type AbuseCategory = (typeof ABUSE_CATEGORIES)[number];

export const ATTACHMENT_ACCEPT =
  ".pdf,.png,.jpg,.jpeg,.gif,.webp,.zip,.7z,.docx,.xlsx,.doc,.xls,.txt,.log,.csv,.json,.eml";

export const ATTACHMENT_LIMITS =
  "Up to 5 files, 10 MB each and 25 MB in total. PDF, images, Word, Excel, text, logs, ZIP and 7z.";
