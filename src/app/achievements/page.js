"use client";
import HeroSection from "@/components/HeroSection";
import LoadingSpinner from "@/components/loadingSpinner";
import db from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Image from "next/image";
import TruncatedText from "./TruncatedText";
import SchoolsList from "./SchoolsList";
import { LuX } from "react-icons/lu";
import { NAIRA_SYMBOL } from "@/constants";
import { useApiData } from "@/context/ApiStatsContext";
import { formatCurrency, formatTimestamp } from "@/lib/utils";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { stats, error } = useApiData();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch achievements and site stats concurrently
        const achievementsSnapshot = await getDocs(
          collection(db, "Achievements")
        );

        // Process achievements
        const achievementsData = achievementsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAchievements(achievementsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function ImageModal({ src, alt, onClose }) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div className="relative max-w-3xl max-h-[90vh] w-full h-full">
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
          >
            <LuX size={24} />
          </button>
        </div>
      </div>
    );
  }
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
                  {Object.entries(achievement.details)
                    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                    .map(([key, value], i) => {
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

                {achievement.details.schools && (
                  <SchoolsList schools={achievement.details.schools} />
                )}
              </div>
              {achievement.details.images && (
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <div
                    className="relative aspect-[4/3] cursor-pointer"
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
                    console.log({achievement.details.images.image2})
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
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
