"use client";
import HeroSection from "@/components/HeroSection";
import LoadingSpinner from "@/components/loadingSpinner";
import db from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Image from "next/image";
import TruncatedText from "./TruncatedText";
import SchoolsList from "./SchoolsList";
import ImageModal from "@/components/ImageModal";
import { useApiData } from "@/context/ApiStatsContext";
import { mediaBaseUrl } from "@/constants";
import { formatCurrency, formatObjectKeyToTitle } from "@/lib/utils";
import { fetchedData } from "@/firebase/fetchFirebaseData";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  // Use context api to get site statistics
  const { stats, loading_stats, error } = useApiData();

  // TODO: Make this use the reusable fetchData function
  // Get achievement collection
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch achievements from firestore
        const achievementsData = await fetchedData("Achievements");

        // set the achievements data with the fetched data
        setAchievements(achievementsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-10 my-4">
        {/* Hero Section */}
        <div className="flex flex-col">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <HeroSection
              className=""
              title="ACHIEVEMENTS"
              description=""
              imageUrl={`${mediaBaseUrl}/images/dbf-achievement-page-image1.jpg`}
              alt=""
              darkenImage={"absolute inset-0 bg-black bg-opacity-40"}
              showStats={true}
              stats={stats}
            />
          )}
        </div>
        {/* Content Sections */}
        <div className="grid gap-8 md:grid-cols-2 p-4 content-div">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col"
            >
              <div className="p-6 flex-grow">
                <span className="text-blue-500 font-medium mb-2 block">
                  {achievement.category}
                </span>
                <h2 className="text-2xl font-bold mb-4">{achievement.title}</h2>
                {/* Allows extension to show more text */}
                <TruncatedText text={achievement.description} limit={150} />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  {/* Loop through all the "achievement details" */}
                  {Object.entries(achievement.details)
                    // sort the achievement details alphabetically
                    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                    // loop through the achievement details
                    .map(([key, value], i) => {
                      if (typeof value === "object" && !Array.isArray(value))
                        return null; // Handle objects found separately
                      if (key === "schools") return null; // Handle schools separately
                      return (
                        <div key={i} className="bg-gray-50 p-3 rounded-lg">
                          <h3 className="text-sm text-gray-500 mb-1">
                            {/* Format the "Key" from db to a heading */}
                            {formatObjectKeyToTitle(key)}
                          </h3>
                          <p className="font-semibold">
                            {/* Show the monetary support given, or list the support items provided */}
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

                {/* Allows extension to show more schools  */}
                {achievement.details.schools && (
                  <SchoolsList schools={achievement.details.schools} />
                )}
              </div>
              {achievement.details.images && (
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <div
                    className="relative aspect-[4/3] cursor-pointer"
                    // Set selected image to full screen
                    onClick={() =>
                      setSelectedImage(`${achievement.details.images.image1}`)
                    }
                  >
                    <Image
                      src={achievement.details.images.image1}
                      alt={`Image 1 for ${achievement.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div
                    className="relative aspect-[4/3] cursor-pointer"
                    // Set selected image to full screen
                    onClick={() =>
                      setSelectedImage(`${achievement.details.images.image2}`)
                    }
                  >
                    <Image
                      src={achievement.details.images.image2}
                      alt={`Image 2 ${achievement.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/*Set selected image to full screen */}
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Full-screen image"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
