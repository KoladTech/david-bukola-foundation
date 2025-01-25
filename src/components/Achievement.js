import HeroSection from "./HeroSection";
import { useApiData } from "@/context/ApiStatsContext";
import { mediaBaseUrl } from "@/lib/constants";

export default function Achievement() {
  const { stats, loading_stats, error } = useApiData();
  return (
    <div>
      <HeroSection
        imageUrl={`${mediaBaseUrl}/images/dbf-home-achievements-image.jpg`}
        darkenImage={"absolute inset-0 bg-black bg-opacity-50"}
        alt={`achievement image`}
        bottomRightWidget="achievements"
        showStats={true}
        stats={stats}
        statsLoading={loading_stats}
      />
    </div>
  );
}
