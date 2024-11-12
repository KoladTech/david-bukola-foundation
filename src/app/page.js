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
        <GetInvolved />

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
              <PictureCard imageSrc="/person placeholder.png" altText="" />
              <ContentCard title="Demi Fasanya" content="CEO" />
            </div>
            <div className="flex flex-col items-center">
              <PictureCard imageSrc="/person placeholder.png" altText="" />
              <ContentCard
                title="Mayowa Kolawole"
                content="Head Of Operations"
              />
            </div>
            {/* <div className="flex flex-col items-center">
              <PictureCard imageSrc="/person placeholder.png" altText="" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div> */}
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
