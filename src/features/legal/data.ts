import type { LegalDocument } from "./types";

export const serviceDocument: LegalDocument = {
  title: "Terms of Service",
  updated: "2025-01-01",
  articleUpdated: "Last updated: January 1, 2026",
  intro: [
    'This Terms of Service Agreement ("Agreement") governs the rights and obligations between you ("User") and C3Pool ("Platform") regarding the use of C3Pool\'s services. By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by this Agreement. If you do not agree, please discontinue use of the Platform immediately.',
    "C3Pool reserves the right to modify this Agreement at any time. Changes will be posted on the Platform. Your continued use of the Platform after such changes constitutes acceptance of the revised Agreement.",
  ],
  sections: [
    {
      heading: "1. Services",
      paragraphs: [
        "1.1 C3Pool provides distributed computing services and related products through the internet.",
        "1.2 Users are responsible for providing their own equipment (computers, networking devices, computing hardware) and bearing associated costs (internet access, electricity, hardware).",
        "1.3 Users connect to the Platform's services by providing a wallet address. Users are responsible for ensuring their wallet address is valid and lawful.",
      ],
    },
    {
      heading: "2. Service Modifications and Termination",
      paragraphs: [
        "2.1 You agree that C3Pool may modify, suspend, or discontinue any service at any time without prior notice.",
        "2.2 You agree to accept value-added services provided by the Platform, including but not limited to merged computing. You authorize C3Pool to manage the distribution of rewards from such services.",
        "2.3 If you disagree with any changes or are dissatisfied with the services, you may: (a) cease using the Platform; or (b) contact customer support to request service termination.",
      ],
    },
    {
      heading: "3. Privacy",
      paragraphs: [
        "C3Pool values the protection of user information. Please review our Privacy Policy, which forms an integral part of this Agreement, for details on how we collect, store, use, and protect your information.",
      ],
    },
    {
      heading: "4. User Rights and Obligations",
      paragraphs: [
        "4.1 Users have the right to use the Platform's computing services and receive corresponding rewards in accordance with Platform rules.",
        "4.2 Users shall comply with all applicable laws and regulations, this Agreement, and other Platform rules. Users shall act in good faith and shall not use the Platform to infringe upon the rights of others or engage in improper conduct.",
        "4.3 Users shall not use the Platform for any unlawful purpose, interfere with Platform operations, or defame C3Pool.",
        "4.4 Users shall not use the Platform to endanger national security or infringe upon public interests.",
      ],
    },
    {
      heading: "5. International Use",
      paragraphs: [
        "Users acknowledge the borderless nature of the internet and agree to comply with all applicable laws and regulations in relevant jurisdictions.",
      ],
    },
    {
      heading: "6. Third-Party Links",
      paragraphs: [
        "The Platform may contain links to third-party websites. These links are provided for convenience only. C3Pool does not control and is not responsible for the content of linked websites.",
      ],
    },
    {
      heading: "7. Disclaimer",
      paragraphs: [
        '7.1 Services are provided "as is." The Platform may be affected by force majeure events including but not limited to natural disasters, network disruptions, cyber attacks, or government actions, which may cause service delays, interruptions, or termination.',
        "7.2 C3Pool shall not be liable for computing reward losses caused by force majeure or circumstances beyond the Platform's control. C3Pool will make reasonable efforts to assist in remediation.",
        "7.3 Information displayed on the Platform may be subject to delays or inaccuracies due to the nature of the internet. Users acknowledge and accept this.",
      ],
    },
    {
      heading: "8. Governing Law and Dispute Resolution",
      paragraphs: [
        "8.1 Before raising any dispute, you agree to first contact us at support@c3pool.com to attempt informal resolution.",
        '8.2 Any disputes shall be submitted to the Singapore International Arbitration Centre ("SIAC") for arbitration in Singapore. The arbitral award shall be final and binding.',
      ],
    },
    {
      heading: "9. Severability",
      paragraphs: [
        "If any provision of this Agreement is found to be unlawful, void, or unenforceable, such provision shall be severable and shall not affect the validity of the remaining provisions.",
      ],
    },
    {
      heading: "10. Amendments",
      paragraphs: [
        "10.1 This Agreement includes the main text and all rules published or to be published on the Platform.",
        "10.2 C3Pool may amend this Agreement from time to time in response to industry developments and legal changes. Continued use of the Platform constitutes acceptance of the latest Agreement.",
      ],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  title: "Privacy Policy",
  updated: "2025-01-01",
  articleUpdated: "Last updated: October 26, 2026",
  intro: [
    'C3Pool ("we," "us," or "our") values the protection of user privacy. This Privacy Policy explains how we collect, store, use, and protect your information when you use our Platform. Please read this policy carefully before using our services. If you do not agree with any part of this policy, please stop using the Platform.',
  ],
  sections: [
    {
      heading: "1. Scope",
      paragraphs: [
        "This policy applies to all products and services provided by C3Pool. It does not apply to third-party websites or services linked from our Platform, which are governed by their own privacy policies.",
      ],
    },
    {
      heading: "2. Information We Collect",
      paragraphs: [
        "C3Pool operates on an anonymous wallet address model — no account registration is required. We may collect the following information:",
      ],
      subsections: [
        {
          heading: "2.1 Information You Provide",
          paragraphs: [
            "Your wallet address, which you provide to access computing services. This address is used to identify your computing contributions and settle rewards.",
            "If you turn on email alerts, the email address you enter. It is used only to send the worker and payout alerts you asked for. Turning email alerts off stops these emails; to have the address deleted, contact us (see Section 8).",
          ],
        },
        {
          heading: "2.2 Automatically Collected Information",
          paragraphs: [],
          list: [
            "(a) Device information: browser type, operating system, screen resolution, language settings;",
            "(b) Log information: IP address, access time, pages visited, request parameters;",
            "(c) Computing data: hashrate statistics, submitted shares, and reward records associated with your wallet address;",
            "(d) Local storage: we use browser localStorage to store your preferences (theme, language, address history). This data is stored only on your device.",
          ],
        },
        {
          heading: "2.3 Cookies",
          paragraphs: [
            "The Platform may use cookies to improve user experience. You can manage or disable cookies through your browser settings, though this may affect certain features.",
          ],
        },
        {
          heading: "2.4 Mobile App",
          paragraphs: [
            "When you turn on push notifications in the C3Pool app, we record your device's push token together with its phone model, app version and language. We use them to send you worker and payout alerts, to show notifications in your language, and to investigate why a device is not receiving notifications. Push tokens are delivered through Google Firebase Cloud Messaging and the Apple Push Notification service (APNs). When you turn push notifications off, that device's registration is deleted.",
          ],
        },
      ],
    },
    {
      heading: "3. How We Use Information",
      paragraphs: ["We use collected information to:"],
      list: [
        "(a) Provide and maintain computing services;",
        "(b) Display your hashrate statistics, reward data, and other service-related information;",
        "(c) Monitor and analyze Platform performance to improve service quality;",
        "(d) Detect, prevent, and address technical issues and security threats;",
        "(e) Comply with applicable legal requirements.",
      ],
    },
    {
      heading: "4. Information Sharing and Disclosure",
      paragraphs: [
        "We do not sell your personal information. We may share or disclose your information only in the following circumstances:",
        "(a) With your explicit consent;",
        "(b) To comply with applicable laws, legal processes, or governmental requests;",
        "(c) To protect the rights, property, and safety of C3Pool, our users, or the public;",
        "(d) In connection with a merger, acquisition, or asset transfer, in which case the receiving party will be required to honor this policy.",
        "(e) Push notifications are delivered on our behalf by Google Firebase Cloud Messaging and the Apple Push Notification service (APNs), which receive only the push token and the notification content.",
        "Please note: Due to the nature of distributed networks, your wallet address and associated computing data may be publicly viewable on the network. This is not considered disclosure by the Platform.",
      ],
    },
    {
      heading: "5. Information Security",
      paragraphs: [
        "We implement reasonable technical and organizational measures to protect your information, including but not limited to encrypted transmission (TLS/SSL), access controls, and security audits. However, no method of transmission over the internet is 100% secure.",
      ],
    },
    {
      heading: "6. Your Rights",
      paragraphs: [
        "6.1 The Platform operates on an anonymous wallet address model. Your data is associated with your wallet address and does not involve the registration or storage of personal identity information.",
        "6.2 Your preference data (theme, language, address history) is stored in your browser's local storage. You may delete this information at any time by clearing your browser data.",
        "6.3 If you have questions about information processing, please contact us using the details in Section 8.",
      ],
    },
    {
      heading: "7. Minors",
      paragraphs: [
        "Our services are not directed at individuals under 18 years of age. If we become aware that a minor is using the Platform, we will take reasonable steps to remove relevant information. If you are a guardian and discover that a minor has used the Platform, please contact us.",
      ],
    },
    {
      heading: "8. Contact Us",
      paragraphs: [
        "If you have any questions, comments, or suggestions regarding this Privacy Policy, please contact us at:",
        "Email: support@c3pool.com",
      ],
    },
    {
      heading: "9. Policy Updates",
      paragraphs: [
        "We may update this Privacy Policy from time to time. Updated policies will be posted on the Platform. Your continued use of our services after changes are posted constitutes acceptance of the revised policy. For significant changes, we will notify you prominently on the Platform.",
      ],
    },
  ],
};

export const disclaimerDocument: LegalDocument = {
  title: "Disclaimer",
  updated: "2025-01-01",
  articleUpdated: "Last updated: January 1, 2026",
  intro: [
    "Please read this disclaimer carefully before using C3Pool's computing services and related services. You may choose not to use C3Pool, but if you do, your use constitutes acceptance of this disclaimer in its entirety.",
  ],
  sections: [
    {
      heading: '1. Service "As Is"',
      paragraphs: [
        "C3Pool does not guarantee that the Platform or any of its content, services, or features will be error-free or uninterrupted, that defects will be corrected, or that your use of the Platform will produce specific results. All information provided on the Platform is subject to change without notice. C3Pool cannot guarantee that files or data downloaded from the Platform are free from viruses or destructive properties.",
      ],
    },
    {
      heading: "2. No Warranties",
      paragraphs: [
        "C3Pool makes no express or implied warranties, including warranties of accuracy, non-infringement, merchantability, or fitness for a particular purpose. C3Pool is not responsible for the acts, omissions, or conduct of any third parties linked from the Platform. Your use of the Platform and any linked websites is entirely at your own risk.",
      ],
    },
    {
      heading: "3. Limitation of Liability",
      paragraphs: [
        "The above disclaimers apply to any damages, liability, or injury caused by any performance failure, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft, destruction, unauthorized access, alteration, or use, whether for breach of contract, tort, negligence, or any other cause of action.",
      ],
    },
    {
      heading: "4. Computing Rewards",
      paragraphs: [
        "Reward data, hashrate statistics, and other information provided by the Platform are for reference only. Actual rewards are affected by multiple factors including network conditions, algorithm difficulty, and market fluctuations. C3Pool assumes no liability for any reward expectations or losses. Users should fully understand the characteristics and risks of distributed computing and bear the risk of reward fluctuations.",
      ],
    },
    {
      heading: "5. Reservation of Rights",
      paragraphs: [
        "C3Pool reserves the right to take any of the following actions at any time without notice:",
      ],
      list: [
        "(1) Modify, suspend, or terminate the operation of, or access to, the Platform or any part thereof for any reason;",
        "(2) Modify or change the Platform or any applicable policies or terms;",
        "(3) Interrupt the Platform or any part thereof as necessary to perform routine or non-routine maintenance, error correction, or other changes.",
      ],
    },
    {
      heading: "6. Applicability",
      paragraphs: [
        "This disclaimer applies to the C3Pool Platform and all associated services. C3Pool reserves the right of final interpretation of this disclaimer.",
      ],
    },
  ],
};
