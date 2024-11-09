import Image from "next/image";
import DonationWidget from "../components/DonationWidget";
import AboutUs from "@/components/AboutUs";
import Achievement from "@/components/Achievement";
import TestimonyCards from "../components/TestimonyCards";
import PictureCard from "../components/PictureCard";
import ContentCard from "../components/ContentCard";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <main>
      {/* Main home page div */}
      <div className="m-12">
        <div className="flex justify-between items-end my-4">
          {/* Foundation Name and Motto */}
          <p className="text-5xl text-left font-semibold">
            DAVIDBUKOLA
            <span className="block">DEVELOPMENT FOUNDATION</span>
          </p>
          <p className="text-3xl text-right md:whitespace-nowrap">
            Where care meets community
          </p>
        </div>
        {/* Community Image */}
        <div className="relative mt-4">
          <Image
            src="/foundation-name-and-motto-image.png"
            alt="Happy Community image"
            width={1376}
            height={553}
            className="w-full h-auto"
          />
          <div className="absolute bottom-2 right-2 md:bottom-8 md:right-12">
            <DonationWidget />
          </div>
        </div>

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
        <div className="flex flex-col md:flex-row items-center p-8">
          {/* Left Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/projects-image.png" // Path to your image
              alt="Left Side Image"
              width={500} // Adjust width and height as needed
              height={500}
              className="object-cover rounded-lg"
            />
          </div>

          {/* Right Side - Text */}
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
        </div>
        {/* Get Involved Section */}
        <section className="py-4 px-4 bg-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center">Get Involved</h2>
          <div className="flex flex-col items-center md:flex-row p-4">
            <div className="flex flex-col md:flex-row p-4">
              <ContentCard
                title="Donate"
                content="Want to make an impact in society? Donate to help others."
              />
              <PictureCard imageSrc="/donate-now-image.png" />
            </div>
            <div className="flex flex-col md:flex-row p-4">
              <ContentCard
                title="Join Us"
                content="Want to make an impact in society? Donate to help others."
              />
              <PictureCard imageSrc="/join-us-image.png" />
            </div>
            <div className="flex flex-col md:flex-row p-4">
              <ContentCard
                title="Donate and Join Us"
                content="Want to make an impact in society? Donate to help others."
              />
              <PictureCard imageSrc="/get-involved-image.png" />
            </div>
          </div>
        </section>

        {/* Meet our team section */}
        <section className="py-4 px-4 items-center border justify-center text-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Meet Our team</h2>
          <h3 className="">
            Lorem Ipsum pendu libero molestie camero dune tasatrupt caspoer
            idium
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-center mx-4 p-2">
            <div className="flex flex-col items-center m-4">
              <PictureCard imageSrc="/meet-the-team-1.png" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div>
            <div className="flex flex-col items-center">
              <PictureCard imageSrc="/meet-the-team-2.png" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div>
            <div className="flex flex-col items-center">
              <PictureCard imageSrc="/meet-the-team-3.png" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div>
            <div className="flex flex-col items-center border">
              <PictureCard imageSrc="/meet-the-team-4.png" />
              <ContentCard title="David Bukola" content="Head Of Operations" />
            </div>
          </div>
        </section>

        <div>
          <FAQ />
        </div>
      </div>
    </main>
  );
}
