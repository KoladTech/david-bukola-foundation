"use client";
import Image from "next/image";
import DonationWidget from "../components/DonationWidget";
import AboutUs from "@/components/AboutUs";
import Achievement from "@/components/Achievement";
import TestimonyCards from "../components/TestimonyCards";
import PictureCard from "../components/PictureCard";
import ContentCard from "../components/ContentCard";
import FAQ from "../components/FAQ";
import HeroSection from "@/components/HeroSection";
import GetInvolved from "@/components/GetInvolved";
import MeetOurTeam from "@/components/MeetOurTeam";

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
    <main>
      {/* Main home page div */}
      <div className="m-4 space-y-4">
        <HeroSection
          className=""
          title="DAVIDBUKOLA"
          title2="DEVELOPMENT FOUNDATION"
          description="Where care meets community"
          imageUrl="/images/foundation-name-and-motto-image.png"
          alt="foundation welcome image"
        />

        {/* About us section */}
        <div>
          <AboutUs />
        </div>
        <div>
          <Achievement />
        </div>

        {/* Testimonies Section */}
        <div>
          <TestimonyCards />
        </div>

        {/* Project Section */}
        {/* <div className="flex flex-col md:flex-row items-center p-8">
          Left Side - Image
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/projects-image.png"
              alt="Left Side Image"
              width={400}
              height={400}
              className="object-cover rounded-lg"
            />
          </div>

          Right Side - Text
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 gap-y-6">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              blandit fringilla sem eget rutrum. Interdum et malesuada fames ac
              ante ipsum primis in faucibus.
            </p>
            <button className="bg-blue-500 min-w-[100px] text-white rounded-md py-2 w-1/4 hover:bg-blue-600 transition-colors justify-start">
              Learn More
            </button>
          </div>
        </div> */}

        {/* Project Section */}
        {/* <section>
          <div className="flex flex-col md:flex-row items-center p-8 border">
            <div className="w-full md:w-1/2 flex justify-center">
              <PictureCard imageSrc="/project-page-image1.png" altText="" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 gap-y-6">
              <ContentCard
                title="Projects"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              blandit fringilla sem eget rutrum. Interdum et malesuada fames ac
              ante ipsum primis in faucibus."
              />
              <button className="bg-blue-500 min-w-[100px] text-white rounded-md py-2 w-1/4 hover:bg-blue-600 transition-colors justify-start">
                Learn More
              </button>
            </div>
        </div>
        </section> */}

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
