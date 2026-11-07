import { AnnouncementModal } from "../features/home/components/AnnouncementModal";
import { Features } from "../features/home/components/Features";
import { GlobeSection } from "../features/home/components/GlobeSection";
import { Hero } from "../features/home/components/Hero";
import { PoolStats } from "../features/home/components/PoolStats";
import {
  deriveDisplayStats,
  pickAnnouncement,
  useAnnouncements,
  useNetworkStats,
  usePoolStats,
} from "../features/home/data";

export function HomePage() {
  const poolStats = usePoolStats();
  const networkStats = useNetworkStats();
  const announcements = useAnnouncements();

  const display = deriveDisplayStats(poolStats.data, networkStats.data);
  const announcement = pickAnnouncement(announcements.data);

  return (
    <>
      <Hero display={display} />
      <PoolStats display={display} />
      <Features />
      <GlobeSection />
      <AnnouncementModal announcement={announcement} />
    </>
  );
}
