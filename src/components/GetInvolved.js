import ContentCard from "./ContentCard";
import PictureCard from "./PictureCard";

export default function GetInvolved() {
  return (
    <section className="py-2 px-2 mt-4">
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
  );
}
