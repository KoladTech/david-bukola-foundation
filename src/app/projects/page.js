"use client";
import { useEffect, useState } from "react";
import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import PictureCard from "@/components/PictureCard";
import { Calendar, Target, Clock, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { fetchProjects } from "@/firebase/projectPage";
import { fetchedData } from "@/firebase/fetchFirebaseData";
import { formatTimestamp, formatCurrency } from "@/lib/utils";

function SkeletonHeroSection() {
  return <div className="h-96 bg-gray-200 animate-pulse rounded-md"></div>;
}

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
        // Get the fetched data
        const fetchedProjects = await fetchedData("Projects");

        // Set the fetched data
        setProjects(fetchedProjects);

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
    <div className="flex flex-col gap-2 my-4 p-4">
      {/* Hero Section */}
      <div className="flex flex-col">
        <HeroSection
          className=""
          title="PROJECTS"
          description=""
          imageUrl="/images/project-page-image.png"
          alt=""
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
            imageUrl="/images/project-page-image.png"
            alt=""
          />
        </div>
      )} */}
      {/* Project Sections  */}
      {loading ? (
        <SkeletonProject />
      ) : (
        <div className="flex flex-col space-y-10 mb-24">
          {/* Data from backend */}
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
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
                {/* <h1 className="text-xl font-semibold text-gray-700 mt-2 sm:mt-0">
                  Planned Start Date:{" "}
                  <span>
                    {" "}
                    {project.plannedStartDate
                      ? new Date(
                          project.plannedStartDate.seconds * 1000
                        ).toLocaleDateString()
                      : "No Timestamp Available"}{" "}
                  </span>
                </h1>
                <p></p>
                <h1 className="text-xl font-semibold text-gray-700 mt-2 sm:mt-0">
                  Expected Completion Date:{" "}
                  <span>
                    {" "}
                    {project.expectedCompletionDate
                      ? new Date(
                          project.expectedCompletionDate.seconds * 1000
                        ).toLocaleDateString()
                      : "No Timestamp Available"}{" "}
                  </span>
                </h1> */}

                {/* Text Budget Written as header */}
                <div className="">
                  {/* <h2 className="text-2xl font-bold">
                    Planned Budget:{" "}
                    {project.plannedBudget
                      ? `${NAIRA_SYMBOL} ${new Intl.NumberFormat("en-NG", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(project.plannedBudget)}`
                      : "No Budget Yet"}
                  </h2> */}
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
                      <p className="font-semibold">Kaduna, Nigeria</p>
                    </div>
                  </Card>
                </div>

                {/* Goals */}
                <h2 className="text-3xl font-bold">Goals</h2>
                {/* Check if goal is an array and map over it */}
                {Array.isArray(project.goals) ? (
                  <ul className="ml-5">
                    {project.goals.map((goal, index) => (
                      <li key={index} className="list-disc	">
                        {goal}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p> {project.goal || "No Goal Available"} </p>
                )}

                {/* Picture Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative aspect-[4/3] w-full">
                    <PictureCard
                      className=""
                      imageSrc={project.images.image1}
                      altText=""
                    />
                  </div>
                  <div className="relative aspect-[4/3] w-full">
                    <PictureCard
                      className=""
                      imageSrc={project.images.image2}
                      altText=""
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
