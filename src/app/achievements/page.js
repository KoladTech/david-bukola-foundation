"use client";
import ContentCard from "@/components/ContentCard";
import HeroSection from "@/components/HeroSection";
import LoadingSpinner from "@/components/loadingSpinner";
import PictureCard from "@/components/PictureCard";
import db from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Page() {
  let content = `Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu. 
  Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. 
  Diam aliquet enim lectus etiam aliquam eu.Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. Cursus senectus id ipsum cras cursus. 
  Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu.Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. 
  Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu. Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare. 
  Cursus senectus id ipsum cras cursus. Nunc sed eu amet purus. Diam aliquet enim lectus etiam aliquam eu.`;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const statsDoc = await getDoc(
          doc(db, "Site Statistics", "jZGeXcoSIbk6pGTNXlln")
        );
        if (statsDoc.exists()) {
          setStats(statsDoc.data()); // Populate stats from Firestore
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
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
            imageUrl="/achievements-hero-image.jpg"
            alt=""
            showStats={true}
            stats={stats}
          />
        )}
      </div>
      {/* Content Sections */}
      <div className="flex flex-col space-y-10 mb-24">
        <div>
          <ContentCard className="" title="Schools Reached" content={content} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-1.jpg"
              altText=""
            />
          </div>
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-2.jpg"
              altText=""
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-10 mb-24">
        <div>
          <ContentCard className="" title="Schools Reached" content={content} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-2.jpg"
              altText=""
            />
          </div>
          <div className="relative aspect-[4/3] w-full">
            <PictureCard
              className=""
              imageSrc="/achievements-image-1.jpg"
              altText=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
