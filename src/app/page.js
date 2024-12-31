"use client";
import AboutUs from "@/components/AboutUs";
import TestimonyCards from "../components/TestimonyCards";
import FAQ from "../components/FAQ";
import HeroSection from "@/components/HeroSection";
import GetInvolved from "@/components/GetInvolved";
import MeetOurTeam from "@/components/MeetOurTeam";
import ProjectCard from "@/components/ProjectCard";
import { useApiData } from "@/context/ApiStatsContext";
import LoadingSpinner from "@/components/loadingSpinner";

// Imports for testing Firebase analytics using a custom event
// import { logEvent } from "firebase/analytics";
// import { analytics } from "@/firebase/firebaseConfig";

export default function Home() {
  // Testing Firebase analytics using a custom event
  // if (analytics) {
  //   logEvent(analytics, "Testing Analytics with a custom event", {
  //     key: "Custom-event-works",
  //   });
  // }
  const { stats, loading_stats, error } = useApiData();
  return (
    <main>
      {/* Main home page div */}
      <div className="m-4 space-y-4">
        <HeroSection
          className=""
          title="DAVIDBUKOLA"
          title2="DEVELOPMENT FOUNDATION"
          description="Where care meets community"
          imageUrl="/images/dbf-home-page-image.jpg"
          alt="foundation welcome image"
        />

        {/* About us section */}
        <div>
          <AboutUs />
        </div>
        <div>
          {/* <Achievement /> */}

          <HeroSection
            imageUrl={`/images/dbf-home-achievements-image.jpg`}
            darkenImage={"absolute inset-0 bg-black bg-opacity-50"}
            alt={`achievement image`}
            atTop={false}
            showStats={true}
            stats={stats}
            statsLoading={loading_stats}
          />
        </div>

        {/* Testimonies Section */}
        <div>
          <TestimonyCards />
        </div>

        {/* Projects Section */}
        <div>
          <ProjectCard />
        </div>

        {/* Get Involved Section */}
        <GetInvolved />

        {/* Meet our team section */}
        <MeetOurTeam />

        {/* Frequently asked questions section */}
        <div>
          <FAQ />
        </div>

        {/* Main div closing tag */}
      </div>
    </main>
  );
}
