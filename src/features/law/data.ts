export interface GuideSection {
  title: string;
  items: readonly string[];
}

export const LAW_GUIDE: readonly GuideSection[] = [
  {
    title: "Who may use this form",
    items: [
      "Only formal requests from law enforcement, judicial authorities and other government bodies with legal authority are handled here.",
      "Requests from individuals, companies or their lawyers are not accepted here. Report misuse through Report Abuse; anything else through Feedback.",
      "We review each request case by case under applicable law. Cross-border requests may need to come through mutual legal assistance channels.",
      "Please write in English or Chinese.",
    ],
  },
  {
    title: "How to submit",
    items: [
      "Use the form on this page, which lets you attach documents directly.",
      "Or email the address below with “Law Enforcement Request” in the subject; for emergencies, put “Emergency” in the subject.",
      "To add documents after submitting, email us and quote your reference.",
    ],
  },
  {
    title: "What to provide",
    items: [
      "A formal request issued by your agency and signed or sealed, such as an evidence request, freezing or preservation notice.",
      "The case filing decision or another legal document showing the case exists.",
      "Scans of the handling officers’ identification — preferably at least two officers.",
      "Contact details we can verify: the agency’s official email and a publicly verifiable office phone number.",
      "The identifiers to look up: wallet addresses, transaction hashes, worker names and the time range. For long lists, attach a copyable Excel or CSV file.",
      "A summary of the case and material linking it to the request, such as a fund-flow chart.",
      "State the time zone for any times given; UTC is preferred.",
    ],
  },
  {
    title: "What C3Pool may hold",
    items: [
      "C3Pool requires no account and does not collect users’ real names or identity documents.",
      "Records linked to a wallet address usually include hashrate and share statistics, worker names and payouts (transaction hash, amount, time).",
      "Miners can choose to be paid in XMR or in USDT (TRON, BSC, Polygon, Solana); payout records refer to transactions on the corresponding chain.",
      "The hashrate and payouts of a wallet address are public on this site and can be checked before you submit.",
      "C3Pool does not hold miners’ on-chain assets and cannot freeze wallet balances; pool balances not yet paid out can be held on a lawful request.",
    ],
  },
  {
    title: "How long data is kept",
    items: [
      "Payout records (transaction hash, amount, time) are kept long-term.",
      "Worker names and hashrate statistics are deleted 7 days after a worker stops mining; an address’s hashrate history 30 days after it stops mining.",
      "Daily earnings summaries are kept for 30 days.",
      "Raw share records are deleted once the blocks they count towards are settled. Runtime logs, which may include connecting IP addresses, are rotated and kept only briefly.",
      "We can only provide records we actually keep, so ask for preservation early.",
    ],
  },
  {
    title: "How requests are reviewed",
    items: [
      "Document review: whether the documents are genuine and complete, and the request reasonable and proportionate.",
      "Identity check: we verify through the agency’s official email or a publicly verifiable phone number.",
      "We may ask for further documents or explanation during review.",
      "Requests that fail review are declined. Where identity or documents are forged, we reserve the right to inform the supervising authority and pursue legal remedies.",
    ],
  },
  {
    title: "Emergencies",
    items: [
      "For imminent danger of death or serious physical injury.",
      "Choose “Emergency” as the category and describe the emergency; formal documents may follow later.",
      "Emergency requests are handled first.",
    ],
  },
];

export const LAW_CATEGORIES = [
  "Data preservation",
  "Information disclosure",
  "Payout hold",
  "Emergency",
  "Other",
] as const;

export type LawCategory = (typeof LAW_CATEGORIES)[number];

export const ATTACHMENT_ACCEPT =
  ".pdf,.png,.jpg,.jpeg,.gif,.webp,.zip,.7z,.docx,.xlsx,.doc,.xls,.txt,.log,.csv,.json,.eml";

export const ATTACHMENT_LIMITS =
  "Up to 5 files, 10 MB each and 25 MB in total. PDF, images, Word, Excel, text, logs, ZIP and 7z.";
