"use client";
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import PictureCard from "@/components/PictureCard";
import { Calendar, Target, Clock, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { fetchedData } from "@/lib/firebase/fetchFirebaseData";
import {
  formatObjectKeyToTitle,
  formatTimestamp,
  formatCurrency,
} from "@/lib/utils";
import { mediaBaseUrl } from "@/lib/constants";

function SkeletonHeroSection() {
  return <div className="h-96 bg-gray-200 animate-pulse rounded-md"></div>;
}

// Skeleton Outline for when data is loading
function SkeletonProject() {
  return (
    <div className="p-4 animate-pulse rounded-md">
      <div className="h-64 bg-gray-300 rounded-md mb-4 mx-2 "></div>
      <div className="flex flex-col md:flex-row h-24 bg-white rounded-md mb-2 justify-between">
        <div className="bg-gray-300 rounded-md border-solid w-full mb-2 p-4 mx-2"></div>
        <div className="bg-gray-300 rounded-md border-solid w-full mb-2 p-4 mx-2"></div>
        <div className="bg-gray-300 rounded-md border-solid w-full mb-2 p-4 mx-2"></div>
        <div className="bg-gray-300 rounded-md border-solid w-full mb-2 p-4 mx-2"></div>
      </div>
      <div className="h-32 bg-gray-300 rounded-md mb-2 mx-2 "></div>
      <div className="flex flex-col md:flex-row h-52 bg-white rounded-md mb-2 justify-between">
        <div className="bg-gray-300 rounded-md border-solid w-full mb-2 p-4 mx-2"></div>
        <div className="bg-gray-300 rounded-md border-solid w-full mb-2 p-4 mx-2"></div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  // variables to store and set states for data and errors asynchronously
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch projects on component mount (Using a variable to store the function)
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        // Get the fetched data
        const fetchedProjects = await fetchedData("Projects");

        if (fetchedProjects?.length > 0) {
          var sortedProjects = fetchedProjects.sort((a, b) => {
            const timestampA = a.plannedStartDate?.toDate() || null;
            const timestampB = b.plannedStartDate?.toDate() || null;

            if (!timestampA || !timestampB) {
              // Handle cases where timestamps might be missing or null
              if (!timestampA && !timestampB) return 0; //both missing, consider equal
              if (!timestampA) return 1; //A missing, B present, B is "greater"
              if (!timestampB) return -1; //B missing, A present, A is "greater"
            }

            if (timestampA < timestampB) {
              return -1; // a comes before b
            }
            if (timestampA > timestampB) {
              return 1; // a comes after b
            }
            return 0; // a and b are equal
          });
        }
        console.log("fetched" + JSON.stringify(fetchedProjects));
        console.log("sorted" + JSON.stringify(sortedProjects));
        setProjects(sortedProjects);

        // Set the fetched data
        // setProjects(fetchedProjects);

        // log error if failed
      } catch (err) {
        setError("Failed to load projects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <div className="flex flex-col gap-2 mb-10">
      {/* Hero Section */}
      <div className="flex flex-col mb-14">
        <HeroSection
          className=""
          title="PROJECTS"
          description=""
          imageUrl={`${mediaBaseUrl}/images/project-page-image.png`}
          alt="projects hero image"
        />
      </div>
      {/* {loading ? (
        <SkeletonHeroSection />
      ) : (
        <div className="flex flex-col">
          <HeroSection
            className=""
            title="PROJECTS"
            description=""
            imageUrl={`${mediaBaseUrl}/images/project-page-image.png`}
            alt=""
          />
        </div>
      )} */}
      {/* Project Sections  */}
      {loading ? (
        <SkeletonProject />
      ) : (
        <div className="flex flex-col space-y-10 mb-24 content-div p-4">
          {
            // Each project displayed
            projects.map((project, index) => (
              <div
                key={project.id}
                className={`p-6 rounded-lg shadow-xl ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } border border-gray-200 space-y-4`}
              >
                <div className="flex flex-col gap-y-4">
                  {/* Title */}
                  <div>
                    <h3 className="text-3xl font-bold">
                      {project.title || "No Title Available"}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p>{project.description || "No Description Available"}</p>

                {/* General Project details */}
                <div>
                  {Object.entries(project.details || {})
                    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                    .map(([key, value], i) => {
                      return (
                        <div key={i} className="bg-gray-50 p-2 rounded-lg">
                          <h3 className="text-md text-gray-500 mb-1">
                            {formatObjectKeyToTitle(key)}
                          </h3>
                          {/* Left this incase it may be used in the future */}
                          <p className="font-semibold">
                            {key === "totalFinancialSupport"
                              ? formatCurrency(value)
                              : Array.isArray(value)
                              ? value.join(", ")
                              : value}
                          </p>
                        </div>
                      );
                    })}
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  {/* Planned Budget */}
                  <Card className="bg-white/10 backdrop-blur-sm p-4 flex items-start gap-3">
                    <Wallet className="w-6 h-6 text-blue-500" />
                    <div>
                      <h2 className="text-blue-500 text-sm font-semibold mt-2 sm:mt-0">
                        Planned Budget{" "}
                      </h2>
                      <p className="font-semibold">
                        {formatCurrency(project.plannedBudget)}
                      </p>
                    </div>
                  </Card>

                  {/* Planned End Date Card */}
                  <Card className="bg-white/10 backdrop-blur-sm p-4 flex items-start gap-3">
                    <Calendar className="w-6 h-6 text-blue-500" />
                    <div>
                      <h1 className="text-blue-500 text-sm font-semibold mt-2 sm:mt-0">
                        Planned Start Date
                      </h1>
                      <p className="font-semibold">
                        {formatTimestamp(project.plannedStartDate)}
                      </p>
                    </div>
                  </Card>

                  {/* Planned End Date Card */}
                  <Card className="bg-white/10 backdrop-blur-sm p-4 flex items-start gap-3">
                    <Calendar className="w-6 h-6 text-blue-500" />
                    <div>
                      <h1 className="text-blue-500 text-sm font-semibold mt-2 sm:mt-0">
                        Planned End Date
                      </h1>
                      <p className="font-semibold">
                        {formatTimestamp(project.expectedCompletionDate)}
                      </p>
                    </div>
                  </Card>

                  {/* Location Card */}
                  <Card className="bg-white/10 backdrop-blur-sm p-4 flex items-start gap-3">
                    <Target className="w-6 h-6 text-blue-500" />
                    <div>
                      <h1 className="text-blue-500 text-sm font-semibold mt-2 sm:mt-0">
                        Location
                      </h1>
                      <p className="font-semibold">{project.location}</p>
                    </div>
                  </Card>
                </div>

                {/* Goals */}
                <h2 className="text-3xl font-bold">Goals</h2>
                {/* Check if goal is an array and map over it */}
                <ul className="ml-5">
                  {project.goals.map((goal, index) => (
                    <li key={index} className="list-disc">
                      {goal}
                    </li>
                  ))}
                </ul>

                {/* Picture Grid */}
                {project.images && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative aspect-[4/3] w-full">
                      <PictureCard
                        className=""
                        imageSrc={`${mediaBaseUrl}${project.images.image1}`}
                        altText={`${project.images.image1}`}
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-full">
                      <PictureCard
                        className=""
                        imageSrc={`${mediaBaseUrl}${project.images.image2}`}
                        altText={`${project.images.image2}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}
