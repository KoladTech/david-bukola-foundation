"use client";

import React, { useState } from "react";
import { LuArrowLeft, LuSend } from "react-icons/lu";
import Link from "next/link";

const jobPostings = [
  {
    id: 1,
    title: "Program Coordinator",
    department: "Education Initiatives",
    location: "Kaduna, Nigeria",
    type: "Full-time",
    description:
      "We're seeking a passionate Program Coordinator to oversee our educational initiatives. The ideal candidate will have experience in project management and a strong commitment to improving educational access in Nigeria.",
    responsibilities: [
      "Develop and implement educational programs aligned with our mission",
      "Coordinate with schools, teachers, and community leaders",
      "Monitor program progress and prepare reports for stakeholders",
      "Manage program budgets and resources effectively",
      "Collaborate with team members to ensure program success",
    ],
    qualifications: [
      "Bachelor's degree in Education, Social Sciences, or related field",
      "3+ years of experience in program coordination or project management",
      "Strong understanding of the Nigerian education system",
      "Excellent communication and interpersonal skills",
      "Proficiency in Microsoft Office and project management tools",
    ],
  },
  {
    id: 2,
    title: "Fundraising Specialist",
    department: "Development",
    location: "Remote",
    type: "Full-time",
    description:
      "Join our team as a Fundraising Specialist to help drive our mission forward. We're looking for someone with a proven track record in nonprofit fundraising and excellent communication skills.",
    responsibilities: [
      "Develop and implement fundraising strategies to support our programs",
      "Identify and cultivate relationships with potential donors",
      "Write grant proposals and manage grant reporting requirements",
      "Organize fundraising events and campaigns",
      "Collaborate with the communications team to create compelling fundraising materials",
    ],
    qualifications: [
      "Bachelor's degree in Nonprofit Management, Business, or related field",
      "5+ years of experience in nonprofit fundraising",
      "Proven track record of successful grant writing and donor cultivation",
      "Excellent written and verbal communication skills",
      "Experience with CRM systems and fundraising software",
    ],
  },
];

export default function JobDetailsPage({ params }) {
  let id = params.jobId;
  // id = 1;
  console.log(id);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });

  const job = jobPostings.find((job) => job.id === Number(id));
  // const job = jobPostings.filter((job) => job.id === id)[0];

  if (!job) {
    return <div>Job not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      resume: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    // console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: "",
    });
    alert("Your application has been submitted successfully!");
  };

  return (
    <div className="bg-gray-50 mb-5">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/careers"
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
        >
          <LuArrowLeft className="mr-2 h-4 w-4" />
          Back to Careers
        </Link>

        <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
        <div className="mb-6">
          <span className="text-blue-500 font-medium">{job.department}</span>
          <span className="mx-2">•</span>
          <span className="text-gray-600">{job.location}</span>
          <span className="mx-2">•</span>
          <span className="text-gray-600">{job.type}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>
          <p className="text-gray-600 mb-6">{job.description}</p>

          <h3 className="text-xl font-bold mb-2">Responsibilities:</h3>
          <ul className="list-disc pl-6 mb-6">
            {job.responsibilities.map((resp, index) => (
              <li key={index} className="text-gray-600 mb-2">
                {resp}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-2">Qualifications:</h3>
          <ul className="list-disc pl-6">
            {job.qualifications.map((qual, index) => (
              <li key={index} className="text-gray-600 mb-2">
                {qual}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Apply for this Position</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="resume"
                className="block text-gray-700 font-medium mb-2"
              >
                Resume
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="coverLetter"
                className="block text-gray-700 font-medium mb-2"
              >
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows="5"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors"
            >
              Submit Application
              <LuSend className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
