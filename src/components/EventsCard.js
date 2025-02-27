import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PictureCard from "./PictureCard";
import ContentCard from "./ContentCard";
import { mediaBaseUrl } from "@/lib/constants";

export default function EventsCard() {
  return (
    <div>
      <section>
        {/* Project Section On Home Page */}
        <div className="flex flex-col md:flex-row items-center justify-start p-8 gap-x-4">
          {/* Project Contents */}
          <div className="w-full md:w-1/2 flex flex-col justify-start items-start px-4 gap-y-6 ">
            <ContentCard
              title="Events"
              content="Explore our upcoming events, and discover how you can be part of our mission to make a difference. Together, we can transform lives!"
            />
            {/* View page button */}
            <div className="flex justify-start">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                View Events
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          {/* Project Image */}
          <div className="w-full md:w-1/2 aspect-[4/3] flex justify-center mb-6">
            <PictureCard
              imageSrc={`${mediaBaseUrl}/images/events_hero_section.jpg`}
              altText="DBF Projects"
              imageSizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
