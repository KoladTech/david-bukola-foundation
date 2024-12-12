"use client";

import React from "react";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import HeroSection from "@/components/HeroSection";

export default function CareersPage() {
  const jobPostings = [
    {
      id: 1,
      title: "Program Coordinator",
      department: "Education Initiatives",
      location: "Kaduna, Nigeria",
      type: "Full-time",
      description:
        "We're seeking a passionate Program Coordinator to oversee our educational initiatives. The ideal candidate will have experience in project management and a strong commitment to improving educational access in Nigeria.",
    },
    {
      id: 2,
      title: "Fundraising Specialist",
      department: "Development",
      location: "Remote",
      type: "Full-time",
      description:
        "Join our team as a Fundraising Specialist to help drive our mission forward. We're looking for someone with a proven track record in nonprofit fundraising and excellent communication skills.",
    },
  ];

  return (
    <div className="bg-gray-50 mb-5">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <HeroSection
          //   imageUrl={`https://media.istockphoto.com/id/1278834781/photo/group-of-happy-african-children-orphanage-in-nairobi-kenya-east-africa.jpg?s=612x612&w=0&k=20&c=CN_l88pra-m9Q0h8Gzwpv1TTCFwxVqPmarOSt8OlVtk=`}
          imageUrl={`/join-us-image.png`}
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
        <div className="grid gap-8 md:grid-cols-2">
          {jobPostings.map((job) => (
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
                  href={`/careers/${job.id}`}
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
                >
                  Learn More
                  <LuArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Fit?</h2>
          <p className="text-lg text-gray-600 mb-6">
            We're always looking for talented individuals to join our team. Send
            us your resume, and we'll keep you in mind for future opportunities.
          </p>
          <Link
            href="/contact"
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
