import { Navigate, Route, Routes, useLocation } from "react-router";
import { AppFooter } from "./features/home/components/AppFooter";
import { AppHeader } from "./features/home/components/AppHeader";
import { PoolInfoWindow } from "./features/home/components/PoolInfoWindow";
import { deriveDisplayStats, useNetworkStats, usePoolStats } from "./features/home/data";
import { AboutPage } from "./features/about";
import { AbuseReportPage } from "./features/abuse";
import { AnnouncementDetailPage, AnnouncementsPage } from "./features/announcements";
import { ApiDocsPage } from "./features/api-docs";
import { DesktopAppPage, MobileAppPage } from "./features/apps";
import { BlocksPage } from "./features/blocks";
import { CoinsPage } from "./features/coins";
import { CommunityPage } from "./features/community";
import { FeedbackPage } from "./features/feedback";
import { HelpPage } from "./features/help";
import { LawEnforcementPage } from "./features/law";
import { LegalDisclaimerPage, LegalPrivacyPage, LegalServicePage } from "./features/legal";
import { PaymentsPage } from "./features/payments";
import { VerifyPage } from "./features/verify";
import { HomePage } from "./routes/HomePage";
import { NotFoundPage } from "./routes/NotFoundPage";

const IMPLEMENTED_PATHS = new Set([
  "/",
  "/coins",
  "/explorer/blocks",
  "/explorer/payments",
  "/announcements",
  "/about",
  "/community",
  "/help",
  "/verify",
  "/feedback",
  "/abuse-report",
  "/law-enforcement",
  "/legal/service",
  "/legal/privacy",
  "/legal/disclaimer",
  "/api",
  "/mobile-app",
  "/desktop-app",
]);

function isImplemented(pathname: string): boolean {
  return (
    IMPLEMENTED_PATHS.has(pathname) ||
    pathname.startsWith("/announcements/") ||
    pathname.startsWith("/help/")
  );
}

export function App() {
  const poolStats = usePoolStats();
  const networkStats = useNetworkStats();
  const display = deriveDisplayStats(poolStats.data, networkStats.data);
  const location = useLocation();
  const isNotFound = !isImplemented(location.pathname);
  const showPoolInfo = location.pathname !== "/api";

  return (
    <div className="app-shell">
      {isNotFound ? null : <AppHeader />}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/coins" element={<CoinsPage />} />
          <Route path="/explorer/blocks" element={<BlocksPage />} />
          <Route path="/explorer/payments" element={<PaymentsPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/announcements/:id" element={<AnnouncementDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:slug" element={<HelpPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/abuse-report" element={<AbuseReportPage />} />
          <Route path="/law-enforcement" element={<LawEnforcementPage />} />
          <Route path="/legal/service" element={<LegalServicePage />} />
          <Route path="/legal/privacy" element={<LegalPrivacyPage />} />
          <Route path="/legal/disclaimer" element={<LegalDisclaimerPage />} />
          <Route path="/api" element={<ApiDocsPage />} />
          <Route path="/mobile-app" element={<MobileAppPage />} />
          <Route path="/desktop-app" element={<DesktopAppPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {isNotFound ? null : <AppFooter />}
      {showPoolInfo ? <PoolInfoWindow display={display} /> : null}
    </div>
  );
}
