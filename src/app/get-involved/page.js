import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import PictureCard from "@/components/PictureCard";
import NewPageButton from "@/components/NewPageButton";
import { mediaBaseUrl } from "@/constants";

export default function Page() {
  let content = `Join us in making a difference. At DavidBukola Development Foundation, we believe everyone has the power to bring positive change. Whether you are looking to donate, volunteer, explore a meaningful career or participate in our events, there are countless ways to support our mission. 
Together, we can make a world of difference. Get involved today!
`;

  let volunteer_content = `Donate your time and skills to help bring hope and joy to those in need.`;
  let careers_content = `Turn your passion for giving back into a fulfilling career. Explore opportunities to join our dedicated team and create a lasting impact.`;
  let events_content = `Be a part of the action! Join us at our upcoming events and experience the joy of helping our community thrive.`;
  return (
    <div className="flex flex-col gap-2 mb-4">
      {/* Hero Section */}
      <HeroSection
        className="object-[50%_20%]" //This positions the images 50 percent from the x-axis, and 20 percent from the y-axis
        title="Get Involved"
        description=""
        imageUrl={`${mediaBaseUrl}/images/get_involved_hero_section_image.jpeg`}
        alt="Get Involved image"
      />
      {/* Content Sections */}
      <div className="p-4">
        <div className="flex flex-col space-y-10 mb-24 content-div mx-auto">
          <div className="my-8">
            {/* <ContentCard content={content} /> */}
            <p className="text-base md:text-lg text-gray-600 mx-auto">
              {content}
            </p>
          </div>
          {/* Cards for Ways to get involved  */}
          <div className="grid grid-rows-2:md md:grid-cols-2 md:gap-10">
            {/* Volunteers Card  */}
            <div className="relative aspect-[4/3] w-full">
              <PictureCard
                className=""
                imageSrc={`${mediaBaseUrl}/images/dbf-volunteer-image.jpg`}
                altText="Get Involved volunteer image"
              />
            </div>
            <div className="relative aspect-[4/3] w-full flex flex-col items-center justify-center gap-4">
              <ContentCard
                title="Volunteer"
                content={volunteer_content}
                className=""
              />
              <NewPageButton buttonText="Volunteer" href="/volunteer" />
            </div>
          </div>
          {/* Careers Card  */}
          <div className="grid grid-rows-2:md md:grid-cols-2 md:gap-10">
            <div className="relative aspect-[4/3] w-full flex flex-col items-center justify-center order-2 md:order-1 gap-4">
              <ContentCard title="Careers" content={careers_content} />
              <NewPageButton buttonText="Careers" href="/careers" />
            </div>
            <div className="relative aspect-[4/3] w-full order-1 md:order-2">
              <PictureCard
                className=""
                imageSrc={`${mediaBaseUrl}/images/get_involved_careers_image.png`}
                altText="Get Involved careers image"
              />
            </div>
          </div>
          {/* Events Card */}
          <div className="grid grid-rows-2:md md:grid-cols-2 md:gap-10">
            <div className="relative aspect-[4/3] w-full">
              <PictureCard
                className=""
                imageSrc={`${mediaBaseUrl}/images/get_involved_events_image.png`}
                altText="Get Involved events Image"
              />
            </div>
            <div className="relative aspect-[4/3] w-full flex flex-col items-center justify-center gap-4 mb-20">
              <ContentCard title="Events" content={events_content} />
              <NewPageButton buttonText="Events" href="/events" className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
