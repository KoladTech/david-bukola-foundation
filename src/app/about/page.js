"use client";
import GetInvolved from "@/components/GetInvolved";
import HeroSection from "@/components/HeroSection";
import MeetOurTeam from "@/components/MeetOurTeam";
import db from "@/lib/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/loadingSpinner";
import { mediaBaseUrl } from "@/lib/constants";

export default function AboutPage() {
  const [statements, setStatements] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get Mission and Vision doc
  useEffect(() => {
    async function fetchStatements() {
      try {
        // Request data from database
        const statementsDoc = await getDoc(
          doc(db, "Site Statistics", "qGzixVLInJnWbfnPSnMh")
        );
        //set variable with data from database
        if (statementsDoc.exists()) {
          setStatements(statementsDoc.data());
        }
      } catch (error) {
        console.error("Error fetching statements:", error);
      } finally {
        setLoading(false);
      }
    }
    // call function
    fetchStatements();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      {/* <section className="container mx-auto p-4"> */}
      <section className="mx-auto">
        {/* TODO: Make the hero section span full width */}
        <HeroSection
          title={"ABOUT US"}
          description={"Learn about the Foundation"}
          imageUrl={`${mediaBaseUrl}/images/dbf-about-us-image.jpg`}
          alt={"about foundation image"}
        />
      </section>

      {/* About us content */}
      <section className="container mx-auto p-4">
        <div className="mb-16">
          <p className="text-gray-700 mb-4">
            At the DavidBukola Foundation, our mission is simple yet powerful:
            Transforming lives, Empowering hope. We strive to alleviate poverty
            and inspire hope for a brighter tomorrow.
          </p>
          <p className="text-gray-700 mb-4">
            Our work includes providing educational scholarships to children
            from low-income families, ensuring that every child has a chance to
            learn and grow. We are also passionate about providing education in
            technology to young, aspiring individuals with an interest in the
            field, equipping them with the skills needed for a successful
            future.
          </p>
          <p className="text-gray-700">
            Additionally, we extend compassionate support to widows and
            individuals in crisis, helping them find stability and renewed hope
            for the future.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          statements && (
            <section className="bg-[#0A2647] text-white py-16 full-width-div ">
              {/* Mission */}
              <div className="container max-w-6xl mx-auto px-4">
                <div className="mb-12">
                  <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
                  <p className="text-gray-200"> {statements.mission}</p>
                </div>
                {/* Vision */}
                <div>
                  <h2 className="text-4xl font-bold mb-4">Vision</h2>
                  <p className="text-gray-200"> {statements.vision}</p>
                </div>
              </div>
            </section>
          )
        )}
      </div>

      {/* Get Involved Section */}
      <GetInvolved />

      {/* Team Section */}
      <MeetOurTeam />
    </div>
  );
}
