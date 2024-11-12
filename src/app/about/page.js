import Image from "next/image";
import Link from "next/link";
import GetInvolved from "@/components/GetInvolved";
import HeroSection from "@/components/HeroSection";
import PictureCard from "@/components/PictureCard";
import ContentCard from "@/components/ContentCard";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <HeroSection
          title={"ABOUT US"}
          description={"Learn about the Foundation"}
          imageUrl={"/main_about_us.jpg"}
          alt={"Group of people looking at laptop"}
        />

        <div className="mb-16">
          <p className="text-gray-700 mb-4">
            At the DavidBukola Foundation, our mission is simple yet powerful:
            Transforming lives, Empowering hope. We strive to alleviate poverty
            and inspire hope for a brighter tomorrow.
          </p>
          <p className="text-gray-700 mb-4">
            Our work includes providing educational scholarships to children
            from low-income families, ensuring that every child has a chance to
            learn and grow. We are also passionate about providing education in
            technology to young, aspiring individuals with an interest in the
            field, equipping them with the skills needed for a successful
            future.
          </p>
          <p className="text-gray-700">
            Additionally, we extend compassionate support to widows and
            individuals in crisis, helping them find stability and renewed hope
            for the future.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-[#0A2647] text-white py-16 md:rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Mission</h2>
            <p className="text-gray-200">
              Transforming lives, Empowering hope: our mission is to help
              alleviate poverty, fostering hope for a brighter tomorrow; to
              provide educational tech scholarships to children from low-income
              families and compassionate support to widows and individuals in
              crisis.
            </p>
          </div>

          {/* <div>
            <h2 className="text-4xl font-bold mb-4">Vision</h2>
            <p className="text-gray-200">
              Lorem ipsum dolor sit amet consectetur. Consectetur massa eu
              pharetra porttitor nulla ornare. Cursus senectus id ipsum cras
              cursus.
            </p>
          </div> */}
        </div>
      </section>

      {/* Team Section */}
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
            <ContentCard title="Mayowa Kolawole" content="Head Of Operations" />
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
      {/* <MeetOurTeam /> */}

      {/* Get Involved Section */}
      <GetInvolved />
    </div>
  );
}
