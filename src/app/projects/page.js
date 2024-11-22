import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import PictureCard from "@/components/PictureCard";
import UnderConstruction from "@/components/UnderConstruction";

export default function Page() {
  return (
    <div>
      <UnderConstruction />
    </div>
    //     <div className="flex flex-col gap-2 my-4 p-4">
    //       {/* Hero Section */}
    //       <div className="flex flex-col">
    //         <HeroSection
    //           className=""
    //           title="PROJECTS"
    //           description=""
    //           imageUrl="/project-page-main-image.png"
    //           alt=""
    //         />
    //       </div>
    //       {/* Project Sections  */}
    //       <div className="flex flex-col space-y-10 mb-24">
    //         <h3 className="text-3xl font-bold">Coming soon</h3>
    //         <div>
    //           <ContentCard
    //             className=""
    //             title="Borehole Project"
    //             subtitle="Timeline: 2 Months"
    //             content="Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu. Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu.
    // Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu.
    // Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu. Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu."
    //           />
    //         </div>
    //         <div className="grid grid-cols-2 gap-6">
    //           <div className="relative aspect-[4/3] w-full">
    //             <PictureCard
    //               className=""
    //               imageSrc="/project-page-image1.png"
    //               altText=""
    //             />
    //           </div>
    //           <div className="relative aspect-[4/3] w-full">
    //             <PictureCard
    //               className=""
    //               imageSrc="/project-page-image2.png"
    //               altText=""
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
  );
}
