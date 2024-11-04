import Image from "next/image";
import DonationWidget from "../components/DonationWidget";
import AboutUs from "@/components/AboutUs";
import Achievement from "@/components/Achievement";

export default function Home() {
  return (
    <main>
      {/* Main home page div */}
      <div className="m-4">
        <div className="flex justify-between items-center">
          {/* Foundation Name and Motto */}
          <p className="text-left font-bold">
            DAVIDBUKOLA DEVELOPMENT FOUNDATION
          </p>
          <p className="text-right">Where care meets community</p>
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
          <div className="absolute bottom-4 right-4">
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
      </div>
    </main>
  );
}
