"use client";
import { useEffect, useState } from "react";
import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import PictureCard from "@/components/PictureCard";
import { Calendar, Target, Clock, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { fetchProjects } from "@/firebase/projectPage";
import { NAIRA_SYMBOL } from "@/constants";

export default function ProjectsPage() {
  // variables to store and set states for data and errors asynchronously
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  // Fetch projects on component mount (Using a variable to store the function)
  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Get the fetched data
        const fetchedProjects = await fetchProjects();

        // Set the fetched data
        setProjects(fetchedProjects);

        // log error if failed
      } catch (err) {
        setError("Failed to load projects");
        console.error(err);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    console.log("Projects After setState:", projects);
  }, [projects]);

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
      {/* Project Sections  */}
      <div className="flex flex-col space-y-10 mb-24">
        {/* Data from backend */}
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          // Each project displayed
          projects.map((project) => (
            <div key={project.id} className="space-y-4">
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
                      {project.plannedBudget
                        ? `${NAIRA_SYMBOL} ${new Intl.NumberFormat("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(project.plannedBudget)}`
                        : "No Budget Yet"}
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
                      {project.plannedStartDate
                        ? new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).format(
                            new Date(project.plannedStartDate.seconds * 1000)
                          )
                        : "No Timestamp Available"}
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
                      {project.expectedCompletionDate
                        ? new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).format(
                            new Date(
                              project.expectedCompletionDate.seconds * 1000
                            )
                          )
                        : "No Timestamp Available"}
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
                    imageSrc="/images/borehole-project-image2.png"
                    altText=""
                  />
                </div>
                <div className="relative aspect-[4/3] w-full">
                  <PictureCard
                    className=""
                    imageSrc="/images/borehole-project-image.jpg"
                    altText=""
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
