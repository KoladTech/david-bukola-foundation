"use client";
import { useEffect, useState } from "react";
import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import PictureCard from "@/components/PictureCard";
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
          imageUrl="/dbf-hands-collaboration.png"
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
                <div>
                  <h3 className="text-3xl font-bold">
                    {project.title || "No Title Available"}
                  </h3>
                </div>
                <div className="">
                  <h2 className="text-2xl font-bold">
                    Planned Budget:{" "}
                    {project.plannedBudget
                      ? `${NAIRA_SYMBOL} ${new Intl.NumberFormat("en-NG", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(project.plannedBudget)}`
                      : "No Budget Yet"}
                  </h2>
                </div>
              </div>
              <p>{project.description || "No Description Available"}</p>
              <h1 className="text-xl font-semibold text-gray-700 mt-2 sm:mt-0">
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
              </h1>
              <p></p>
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
                    imageSrc="/project-page-image1.png"
                    altText=""
                  />
                </div>
                <div className="relative aspect-[4/3] w-full">
                  <PictureCard
                    className=""
                    imageSrc="/borehole-project-image.jpg"
                    altText=""
                  />
                </div>
              </div>
            </div>
          ))
        )}
        {/* Data from backend */}

        {/* Structure formally used the content card component, but the whole structure changes based on the data required to be displayed on the project page */}
        {/* <div>
          <ContentCard
            className=""
            title="Borehole Project"
            subtitle="Timeline: 2 Months"
            content="Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu. Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu.
                      Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu.
                      Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu. Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu."
          />
        </div> */}

        {/* Picture Grid */}
        {/* <div className="grid grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/project-page-image1.png"
              altText=""
            />
          </div>
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/project-page-image2.png"
              altText=""
            />
          </div>
        </div> */}
      </div>
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
