"use client";
import HeroSection from "@/components/HeroSection";
import LoadingSpinner from "@/components/loadingSpinner";
import { useState, useEffect } from "react";
import Image from "next/image";
import TruncatedText from "./TruncatedText";
import SchoolsList from "./SchoolsList";
import ImageModal from "@/components/ImageModal";
import { useApiData } from "@/context/ApiStatsContext";
import { mediaBaseUrl } from "@/constants";
import { formatCurrency, formatObjectKeyToTitle } from "@/lib/utils";
import { fetchedData } from "@/firebase/fetchFirebaseData";
import VideoPlayer from "@/components/VideoPlayer";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Use context API to get site statistics
  const { stats, loading_stats } = useApiData();

  // Fetch achievements from Firestore
  useEffect(() => {
    async function fetchData() {
      try {
        const achievementsData = await fetchedData("Achievements");
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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-10 mb-16">
          {/* Hero Section */}
          <div className="flex flex-col">
            <HeroSection
              title="ACHIEVEMENTS"
              imageUrl={`${mediaBaseUrl}/images/dbf-achievement-page-image1.jpg`}
              darkenImage="absolute inset-0 bg-black bg-opacity-40"
              showStats={true}
              stats={stats}
            />
          </div>

          {/* Content Sections */}
          {!loading && achievements.length === 0 ? (
            <p className="text-center text-gray-500">
              No achievements to display.
            </p>
          ) : (
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
                    <h2 className="text-2xl font-bold mb-4">
                      {achievement.title}
                    </h2>
                    <TruncatedText text={achievement.description} limit={150} />

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {Object.entries(achievement.details || {})
                        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                        .map(([key, value], i) => {
                          if (
                            (typeof value === "object" &&
                              !Array.isArray(value)) ||
                            key === "images"
                          )
                            return null;
                          if (key === "schools") return null;
                          return (
                            <div key={i} className="bg-gray-50 p-3 rounded-lg">
                              <h3 className="text-sm text-gray-500 mb-1">
                                {formatObjectKeyToTitle(key)}
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

                    {achievement.details?.schools && (
                      <SchoolsList schools={achievement.details.schools} />
                    )}
                  </div>

                  {(achievement.details?.images || []).length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-2">
                      {achievement.details.images.map((image, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-[4/3] cursor-pointer"
                          onClick={() =>
                            setSelectedImage(`${mediaBaseUrl}${image}`)
                          }
                        >
                          <Image
                            src={`${mediaBaseUrl}${image}`}
                            alt={`Image ${idx + 1} for ${achievement.title}`}
                            fill
                            className="rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {(achievement.details?.videos || []).length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-2">
                      {achievement.details.videos.map((video, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-[4/3] cursor-pointer"
                          onClick={() =>
                            setSelectedImage(`${mediaBaseUrl}${image}`)
                          }
                        >
                          <VideoPlayer
                            src={`${mediaBaseUrl}${video.videoUrl}`}
                            poster={video.image}
                            className="w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
