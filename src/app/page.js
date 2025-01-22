"use client";
import AboutUs from "@/components/AboutUs";
import TestimonyCards from "../components/TestimonyCards";
import FAQ from "../components/FAQ";
import HeroSection from "@/components/HeroSection";
import GetInvolved from "@/components/GetInvolved";
import MeetOurTeam from "@/components/MeetOurTeam";
import ProjectCard from "@/components/ProjectCard";
import Achievement from "@/components/Achievement";
import { mediaBaseUrl } from "@/constants";

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

  return (
    <>
      {/* Main home page div */}
      <div className="space-y-4">
        <HeroSection
          className="object-[50%_65%]"
          title="DAVIDBUKOLA DEVELOPMENT FOUNDATION"
          title2=""
          description="Where care meets community"
          imageUrl={`${mediaBaseUrl}/images/dbf-home-page-image.jpg`}
          alt="foundation welcome image"
        />

        {/* About us section */}
        {/* the content div restricts the max width to 1140px */}
        <div className="content-div">
          <AboutUs />
        </div>

        {/* <Achievement /> */}
        <div>
          <Achievement />
        </div>
        {/* the content div restricts the max width to 1140px */}
        <div className="content-div">
          {/* Testimonies Section */}
          <TestimonyCards />

          {/* Projects Section */}
          <ProjectCard />

          {/* Get Involved Section */}
          <GetInvolved />

          {/* Meet our team section */}
          <MeetOurTeam />

          {/* Frequently asked questions section */}
          <FAQ />
        </div>
        {/* Main div closing tag */}
      </div>
    </>
  );
}
