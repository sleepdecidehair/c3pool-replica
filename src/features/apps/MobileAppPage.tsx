import {
  IconApps,
  IconDashboard,
  IconGoogle,
  IconMobile,
  IconNotification,
  IconPublic,
  IconQrcode,
} from "@arco-design/web-react/icon";
import type { ReactNode } from "react";
import { MOBILE_APP_FALLBACK, useMobileAppRelease } from "./api";
import "./mobile-app.css";

const APP_HOME_SCREENSHOT = "/replica-assets/app-home.jpg";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const FEATURES: readonly Feature[] = [
  {
    icon: <IconDashboard />,
    title: "Your whole account",
    description:
      "Real-time and average hashrate, every worker, earnings history and payment records — the same figures as the website.",
  },
  {
    icon: <IconNotification />,
    title: "Worker and payout alerts",
    description:
      "A notification when a rig stops hashing, when it comes back, and when a payout is sent to your address.",
  },
  {
    icon: <IconApps />,
    title: "Home screen widget",
    description:
      "Hashrate, workers online and unpaid balance at a glance, with a 24-hour trend — without opening the app.",
  },
  {
    icon: <IconPublic />,
    title: "Six languages",
    description:
      "English, Simplified and Traditional Chinese, Japanese, Korean and Russian, following your device by default.",
  },
];

export function MobileAppPage() {
  const query = useMobileAppRelease();
  const app = query.data ?? MOBILE_APP_FALLBACK;

  return (
    <div className="mobile-page">
      <section className="mobile-page__hero">
        <div className="mobile-page__mesh" aria-hidden="true" />
        <div className="mobile-page__inner">
          <div className="mobile-page__split">
            <div className="mobile-page__copy">
              <h1>C3Pool Mobile App</h1>
              <p className="mobile-page__lede">
                Watch your rigs from your pocket. Live hashrate, worker status, earnings and payouts
                — plus a notification the moment a worker drops offline or a payout lands.
              </p>

              <div className="mobile-page__actions">
                <a
                  className="mobile-page__btn mobile-page__btn--play"
                  href={app.playUrl}
                  rel="noopener"
                >
                  <IconGoogle />
                  <span>
                    <b>Google Play</b>
                    <small>{app.androidVersion ? `v${app.androidVersion}` : "Android"}</small>
                  </span>
                </a>
                <span className="mobile-page__btn mobile-page__btn--soon" aria-disabled="true">
                  <IconApps />
                  <span>
                    <b>App Store</b>
                    <small>Coming soon</small>
                  </span>
                </span>
                <a
                  className="mobile-page__btn mobile-page__btn--apk"
                  href={app.androidUrl}
                  rel="noopener"
                >
                  <IconMobile />
                  <span>
                    <b>Download APK</b>
                    <small>
                      v{app.androidVersion} · {app.androidSize}
                    </small>
                  </span>
                </a>
              </div>

              <div className="mobile-page__qrs">
                <figure>
                  <div
                    className="mobile-page__qr"
                    role="img"
                    aria-label={`QR code placeholder for ${app.playUrl}`}
                  >
                    <IconQrcode />
                    <span>QR</span>
                  </div>
                  <figcaption>Google Play</figcaption>
                </figure>
                <figure>
                  <div
                    className="mobile-page__qr"
                    role="img"
                    aria-label={`QR code placeholder for ${app.androidUrl}`}
                  >
                    <IconQrcode />
                    <span>QR</span>
                  </div>
                  <figcaption>Download APK</figcaption>
                </figure>
              </div>
            </div>

            <div className="mobile-page__shot">
              <img
                src={APP_HOME_SCREENSHOT}
                alt="The C3Pool app home screen"
                width={270}
                height={574}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mobile-page__features">
        <div className="mobile-page__inner">
          <h2>What it does</h2>
          <div className="mobile-page__grid">
            {FEATURES.map((feature) => (
              <article key={feature.title}>
                <span className="mobile-page__ico" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
