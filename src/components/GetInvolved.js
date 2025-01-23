import Link from "next/link";
import ContentCard from "./ContentCard";
import PictureCard from "./PictureCard";
import { mediaBaseUrl } from "@/constants";

export default function GetInvolved() {
  return (
    <section className="py-2 bg-gray-50  px-2 my-8 full-width-div">
      <div className="max-w-6xl mx-auto my-4">
        <h2 className="text-4xl font-semibold mb-6 text-center">
          Get Involved
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Donate Card */}
          <Link href="/donate" className="flex-1">
            <div className="flex justify-between items-center bg-white gap-8 m-2 p-4 shadow-md rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer">
              <div className="flex-1">
                <ContentCard
                  title="Donate"
                  content="Want to make an impact in society? Donate to help others."
                />
              </div>
              <div className="relative w-32 h-32 flex-shrink-0">
                <PictureCard
                  imageSrc={`${mediaBaseUrl}/images/donate-now-image.png`}
                  altText="Money coin jar"
                  imageSizes="128px"
                />
              </div>
            </div>
          </Link>

          {/* Join Us Card */}
          <Link href="/get-involved" className="flex-1">
            <div className="flex justify-between items-center bg-white gap-8 m-2 p-4 shadow-md rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer">
              <div className="flex-1">
                <ContentCard
                  title="Join Us"
                  content="Want to make an impact in society? Donate to help others."
                />
              </div>
              <div className="relative w-32 h-32 flex-shrink-0">
                <PictureCard
                  imageSrc={`${mediaBaseUrl}/images/join-us-image.png`}
                  altText="Children Get Involved"
                  imageSizes="128px"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
