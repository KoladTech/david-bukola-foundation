import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import PictureCard from "@/components/PictureCard";

export default function Page() {
  let content = `Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu. 
  Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. 
  Diam aliquet enim lectus etiam aliquam eu.Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. 
  Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu.Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. 
  Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu. Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. 
  Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu.`;
  return (
    <div className="flex flex-col gap-2 my-4 p-4">
      {/* Hero Section */}
      <div className="flex flex-col">
        <HeroSection
          className=""
          title="ACHIEVEMENTS"
          description=""
          imageUrl="/achievements-hero-image.jpg"
          alt=""
          showStats={true}
        />
      </div>
      {/* Content Sections */}
      <div className="flex flex-col space-y-10 mb-24">
        <div>
          <ContentCard className="" title="Schools Reached" content={content} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-1.jpg"
              altText=""
            />
          </div>
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-2.jpg"
              altText=""
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-10 mb-24">
        <div>
          <ContentCard className="" title="Schools Reached" content={content} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-2.jpg"
              altText=""
            />
          </div>
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-1.jpg"
              altText=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
