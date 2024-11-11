import Image from "next/image";
import DonationWidget from "../components/DonationWidget";
import AboutUs from "@/components/AboutUs";
import Achievement from "@/components/Achievement";
import TestimonyCards from "../components/TestimonyCards";
import PictureCard from "../components/PictureCard";
import ContentCard from "../components/ContentCard";
import FAQ from "../components/FAQ";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
      {/* Main home page div */}
      <div className="m-4 space-y-4">
        <HeroSection
          className=""
          title="DAVIDBUKOLA"
          title2="DEVELOPMENT FOUNDATION"
          description="Where care meets community"
          imageUrl="/foundation-name-and-motto-image.png"
          alt="foundation"
        />

        {/* About us section */}
        <div>
          <AboutUs />
        </div>
        <div>
          <Achievement />
        </div>

        {/* Testimonies Section */}
        {/* <div>
          <TestimonyCards />
        </div> */}

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
              <PictureCard imageSrc="/projects-image.png" altText="" />
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
        <section className="py-2 px-2">
          <div className="max-w-6xl mx-auto my-4">
            <h2 className="text-4xl font-semibold mb-6 text-center">
              Get Involved
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Donate Card */}
              <div className="flex justify-between items-center bg-white gap-8 m-2 p-4 shadow-md rounded-2xl">
                <div className="flex-1">
                  <ContentCard
                    title="Donate"
                    content="Want to make an impact in society? Donate to help others."
                  />
                </div>
                <div className="relative w-32 h-32 flex-shrink-0">
                  <PictureCard imageSrc="/donate-now-image.png" altText="" />
                </div>
              </div>

              {/* Join Us Card */}
              <div className="flex justify-between items-center bg-white gap-8 m-2 p-4 shadow-md rounded-2xl">
                <div className="flex-1">
                  <ContentCard
                    title="Join Us"
                    content="Want to make an impact in society? Donate to help others."
                  />
                </div>
                <div className="relative w-32 h-32 flex-shrink-0">
                  <PictureCard imageSrc="/join-us-image.png" altText="" />
                </div>
              </div>

              {/* Donate and Join Us card */}
              {/* <div className="flex justify-between items-center bg-white gap-8 m-2">
                <div className="flex-1">
              <ContentCard
                title="Donate and Join Us"
                content="Want to make an impact in society? Donate to help others."
              />
                </div>
                <div className="relative w-24 h-24 flex-shrink-0">
              <PictureCard imageSrc="/get-involved-image.png" />
            </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Meet our team section */}
        <section className="py-4 px-4 my-4 items-center justify-center text-center">
          <h2 className="text-4xl font-semibold mb-2 text-center">
            Meet Our Team
          </h2>
          <h3 className="">
            The Team Powering Our Vision and Making a Difference
          </h3>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 m-4">
            <div className="flex flex-col items-center">
              <PictureCard imageSrc="/meet-the-team-1.png" altText="" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div>
            <div className="flex flex-col items-center">
              <PictureCard imageSrc="/meet-the-team-2.png" altText="" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div>
            <div className="flex flex-col items-center">
              <PictureCard imageSrc="/meet-the-team-3.png" altText="" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div>
            {/* <div className="flex flex-col items-center">
              <PictureCard imageSrc="/meet-the-team-4.png" altText="" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div> */}
          </div>
        </section>

        <div>
          <FAQ />
        </div>
      </div>
    </main>
  );
}
