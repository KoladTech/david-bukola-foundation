import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import PictureCard from "@/components/PictureCard";
import NewPageButton from "@/components/NewPageButton";

export default function Page() {
  let content = `Join us in making a difference. At DavidBukola Development Foundation, we believe everyone has the power to bring positive change. Whether you are looking to donate, volunteer, explore a meaningful career or participate in our events, there are countless ways to support our mission. 
Together, we can make a world of difference. Get involved today!
`;

  let volunteer_content = `Donate your time and skills to help bring hope and joy to those in need.`;
  let careers_content = `Turn your passion for giving back into a fulfilling career. Explore opportunities to join our dedicated team and create a lasting impact.`;
  let events_content = `Be a part of the action! Join us at our upcoming events and experience the joy of helping our community thrive.`;
  return (
    <div className="flex flex-col gap-2 my-4 p-4">
      {/* Hero Section */}
      <div className="flex flex-col">
        <HeroSection
          className=""
          title="Get Involved"
          description=""
          imageUrl="/images/get_involved_hero_section_image.jpeg"
          alt="Get Involved image"
        />
      </div>
      {/* Content Sections */}
      <div className="flex flex-col space-y-10 mb-28">
        <div>
          <ContentCard content={content} />
        </div>
        <div className="grid grid-rows-2:md md:grid-cols-2 md:gap-10">
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/images/get_involved_volunteer_image.png"
              altText=""
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
        <div className="grid grid-rows-2:md md:grid-cols-2 md:gap-10">
          <div className="relative aspect-[4/3] w-full flex flex-col items-center justify-center order-2 md:order-1 gap-4">
            <ContentCard title="Careers" content={careers_content} />
            <NewPageButton buttonText="Careers" href="/careers" />
          </div>
          <div className="relative aspect-[4/3] w-full order-1 md:order-2">
            <PictureCard
              className=""
              imageSrc="/images/get_involved_careers_image.png"
              altText=""
            />
          </div>
        </div>
        <div className="grid grid-rows-2:md md:grid-cols-2 md:gap-10">
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/images/get_involved_events_image.png"
              altText=""
            />
          </div>
          <div className="relative aspect-[4/3] w-full flex flex-col items-center justify-center gap-4">
            <ContentCard title="Events" content={events_content} />
            <NewPageButton buttonText="Events" href="/events" className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
