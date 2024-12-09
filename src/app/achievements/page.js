"use client";
import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import LoadingSpinner from "@/components/loadingSpinner";
import db from "@/firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Image from "next/image";
import TruncatedText from "./TruncatedText";
import SchoolsList from "./SchoolsList";

export default function Page() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch achievements and site stats concurrently
        const [achievementsSnapshot, statsDoc] = await Promise.all([
          getDocs(collection(db, "Achievements")), // Fetch achievements
          getDoc(doc(db, "Site Statistics", "jZGeXcoSIbk6pGTNXlln")), // Fetch stats
        ]);

        // Process achievements
        const achievementsData = achievementsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAchievements(achievementsData);
        console.log(achievementsData);

        // Process stats
        if (statsDoc.exists()) {
          setStats(statsDoc.data());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // if (loading) {
  //   return <LoadingSpinner />; // Display a loading indicator while data is being fetched
  // }

  return (
    <>
      <div className="flex flex-col gap-2 my-4 p-4">
        {/* Hero Section */}
        <div className="flex flex-col">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <HeroSection
              className=""
              title="ACHIEVEMENTS"
              description=""
              imageUrl="/images/achievements-hero-image.jpg"
              alt=""
              showStats={true}
              stats={stats}
            />
          )}
        </div>
        {/* Content Sections */}
        <div className="grid gap-8 md:grid-cols-2 pb-5">
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
                <TruncatedText text={achievement.description} limit={150} />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  {Object.entries(achievement.details).map(
                    ([key, value], i) => {
                      if (typeof value === "object" && !Array.isArray(value))
                        return null;
                      if (key === "schools") return null; // Handle schools separately
                      return (
                        <div key={i} className="bg-gray-50 p-3 rounded-lg">
                          <h3 className="text-sm text-gray-500 mb-1">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                                return str.toUpperCase();
                              })}
                          </h3>
                          <p className="font-semibold">
                            {Array.isArray(value) ? value.join(", ") : value}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>

                {achievement.details.schools && (
                  <SchoolsList schools={achievement.details.schools} />
                )}
              </div>
              {achievement.details.images && (
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <Image
                    src={achievement.details.images.image1}
                    alt={`Image 1 for ${achievement.title}`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                  <Image
                    src={achievement.details.images.image2}
                    alt={`Image 2 for ${achievement.title}`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
