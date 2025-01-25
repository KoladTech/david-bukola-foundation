import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PictureCard from "./PictureCard";
import ContentCard from "./ContentCard";
import { mediaBaseUrl } from "@/lib/constants";

export default function ProjectCard() {
  return (
    <div>
      <section>
        {/* Project Section On Home Page */}
        <div className="flex flex-col md:flex-row items-center justify-start p-8 gap-x-4">
          {/* Project Image */}
          <div className="w-full md:w-1/2 aspect-[4/3] flex justify-center mb-6">
            <PictureCard
              imageSrc={`${mediaBaseUrl}/images/project-page-image.png`}
              altText="DBF Projects"
              imageSizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          {/* Project Contents */}
          <div className="w-full md:w-1/2 flex flex-col justify-start items-start px-4 gap-y-6 ">
            <ContentCard
              title="Projects"
              content="We are committed to making a positive impact through various projects tailored to address pressing community needs.
                      From education and healthcare initiatives to empowerment programs, our projects are designed to create lasting change.
                      Discover how we're making a difference and explore the inspiring work we do."
            />
            {/* View page button */}
            <div className="flex justify-start">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                View Projects
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
