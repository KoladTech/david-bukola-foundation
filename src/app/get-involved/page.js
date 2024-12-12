import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import PictureCard from "@/components/PictureCard";
import NewPageButton from "@/components/NewPageButton";

export default function Page() {
  let content = `Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. 
  Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus.`;
  return (
    <div className="flex flex-col gap-2 my-4 p-4">
      {/* Hero Section */}
      <div className="flex flex-col">
        <HeroSection
          className=""
          title="Get Involved"
          description=""
          imageUrl="/achievements-hero-image.jpg"
          alt="Get Involved image"
        />
      </div>
      {/* Content Sections */}
      <div className="flex flex-col space-y-10 mb-24">
        <div>
          <ContentCard content={content} />
        </div>
        <div className="grid grid-rows-2:md md:grid-cols-2 md:gap-10">
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-1.jpg"
              altText=""
            />
          </div>
          <div className="relative aspect-[4/3] w-full flex flex-col items-center justify-center">
            <ContentCard title="Volunteer" content={content} className="" />
            <NewPageButton buttonText="Volunteer" href="/volunteer" />
          </div>
        </div>
        <div className="grid grid-rows-2:md md:grid-cols-2 md:gap-10">
          <div className="relative aspect-[4/3] w-full flex flex-col items-center justify-center">
            <ContentCard title="Careers" content={content} />
            <NewPageButton buttonText="Careers" href="/careers" />
          </div>
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-1.jpg"
              altText=""
            />
          </div>
        </div>
        <div className="grid grid-rows-2:md md:grid-cols-2 md:gap-10">
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-1.jpg"
              altText=""
            />
          </div>
          <div className="relative aspect-[4/3] w-full flex flex-col items-center justify-center">
            <ContentCard title="Events" content={content} />
            <NewPageButton buttonText="Events" href="/events" />
          </div>
        </div>
      </div>
    </div>
  );
}
