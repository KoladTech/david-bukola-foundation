"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import HeroSection from "@/components/HeroSection";
import { collection, getDocs } from "firebase/firestore";
import db from "@/firebase/firebaseConfig";
import LoadingSpinner from "@/components/loadingSpinner";
import { mediaBaseUrl } from "@/constants";
import { fetchedData } from "@/firebase/fetchFirebaseData";

export default function CareersPage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        // fetch all the careers from firestore
        const fetchedJobs = await fetchedData("Careers");

        // Set the fetched data
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-50 mb-5">
      <HeroSection
        title={"Careers"}
        //   imageUrl={`https://media.istockphoto.com/id/1278834781/photo/group-of-happy-african-children-orphanage-in-nairobi-kenya-east-africa.jpg?s=612x612&w=0&k=20&c=CN_l88pra-m9Q0h8Gzwpv1TTCFwxVqPmarOSt8OlVtk=`}
        imageUrl={`/images/careers_page_hero_section_image.png`}
      />
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */
        <HeroSection
          //   imageUrl={`https://media.istockphoto.com/id/1278834781/photo/group-of-happy-african-children-orphanage-in-nairobi-kenya-east-africa.jpg?s=612x612&w=0&k=20&c=CN_l88pra-m9Q0h8Gzwpv1TTCFwxVqPmarOSt8OlVtk=`}
          imageUrl={`${mediaBaseUrl}/images/careers_page_hero_section_image.png`}
        />

        {/* Introduction */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At DavidBukola Development Foundation, we're committed to creating
            positive change in our communities. Join a team of passionate
            individuals working towards a brighter future for Nigeria.
          </p>
        </div>

        {/* Job Postings */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                  <div className="mb-4">
                    <span className="text-blue-500 font-medium">
                      {job.department}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-600">{job.location}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-600">{job.type}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{job.description}</p>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Learn More
                    <LuArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Fit?</h2>
          <p className="text-lg text-gray-600 mb-6">
            We're always looking for talented individuals to join our team. Send
            us your resume, and we'll keep you in mind for future opportunities.
          </p>
          <Link
            href="mailto:davidbukolafoundation@gmail.com"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors"
          >
            Contact Us
            <LuArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
