"use client";

import React, { use, useEffect, useState } from "react";
import { LuArrowLeft, LuSend } from "react-icons/lu";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import db from "@/firebase/firebaseConfig";

// const jobPostings = [
//   {
//     id: 1,
//     title: "Program Coordinator",
//     department: "Education Initiatives",
//     location: "Kaduna, Nigeria",
//     type: "Full-time",
//     description:
//       "We're seeking a passionate Program Coordinator to oversee our educational initiatives. The ideal candidate will have experience in project management and a strong commitment to improving educational access in Nigeria.",
//     responsibilities: [
//       "Develop and implement educational programs aligned with our mission",
//       "Coordinate with schools, teachers, and community leaders",
//       "Monitor program progress and prepare reports for stakeholders",
//       "Manage program budgets and resources effectively",
//       "Collaborate with team members to ensure program success",
//     ],
//     qualifications: [
//       "Bachelor's degree in Education, Social Sciences, or related field",
//       "3+ years of experience in program coordination or project management",
//       "Strong understanding of the Nigerian education system",
//       "Excellent communication and interpersonal skills",
//       "Proficiency in Microsoft Office and project management tools",
//     ],
//   },
//   {
//     id: 2,
//     title: "Fundraising Specialist",
//     department: "Development",
//     location: "Remote",
//     type: "Full-time",
//     description:
//       "Join our team as a Fundraising Specialist to help drive our mission forward. We're looking for someone with a proven track record in nonprofit fundraising and excellent communication skills.",
//     responsibilities: [
//       "Develop and implement fundraising strategies to support our programs",
//       "Identify and cultivate relationships with potential donors",
//       "Write grant proposals and manage grant reporting requirements",
//       "Organize fundraising events and campaigns",
//       "Collaborate with the communications team to create compelling fundraising materials",
//     ],
//     qualifications: [
//       "Bachelor's degree in Nonprofit Management, Business, or related field",
//       "5+ years of experience in nonprofit fundraising",
//       "Proven track record of successful grant writing and donor cultivation",
//       "Excellent written and verbal communication skills",
//       "Experience with CRM systems and fundraising software",
//     ],
//   },
// ];

let doument = {
  description: "description",
  postedDate: {
    seconds: 1734303600,
    nanoseconds: 694000000,
  },
  responsibilities: [
    {
      "Program Planning and Implementation": [
        "Design and coordinate community-focused projects and outreach",
        "Work closely with the team to ensure smooth execution of initiatives.",
      ],
      "Budgeting and Resource Allocation": [
        "Create budgets for programs and ensure efficient allocation of resources.",
        "Monitor expenses and maintain financial accountability.",
      ],
      "Social Media Management": [
        "Develop and execute engaging content strategies for social media platforms.",
        "Manage accounts, monitor analytics, and grow our online presence.",
        "Create posts that highlight the impact of our programs and share beneficiary testimonials.",
      ],
      "Content Creation and Testimonial Gathering": [
        "Collect testimonials from beneficiaries to showcase the organization’s impact.",
        "Oversee the capture of videos and photos during outreach activities.",
      ],
    },
  ],
  department: "Community Outreach and Social Media Management",
  location: "Kaduna(Hybrid)",
  requirements: [
    "Experience in social media management and content creation.",
    "Strong organizational and project management skills.",
    "Excellent communication and storytelling abilities.",
    "Basic understanding of budgeting and financial tracking.",
    "Passion for community development and charity work.",
    "Photography or videography skills are an added advantage.",
  ],
  closingDate: {
    seconds: 1735254000,
    nanoseconds: 22000000,
  },
  type: "Part-time",
  status: "Open",
  title: "Project Coordinator",
};

export default function JobDetailsPage({ params }) {
  let id = params.jobId;

  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function getCareerById(id) {
      try {
        // Reference the document in the "careers" collection
        const docRef = doc(db, "Careers", id);

        // Fetch the document
        const docSnap = await getDoc(docRef);

        // Check if the document exists
        if (docSnap.exists()) {
          // Return the document data
          setJob(docSnap.data());
        } else {
          console.log("No such job exists");
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    }
    getCareerById(id);
  }, [id]);

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   resume: null,
  //   coverLetter: "",
  // });

  // const job = jobPostings.find((job) => job.id === Number(id));
  // const job = jobPostings.filter((job) => job.id === id)[0];

  if (!job) {
    return <div>Job not found</div>;
  }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     resume: file,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // Here you would typically send the form data to your server
  // console.log("Form submitted:", formData);
  // Reset form after submission
  //   setFormData({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     resume: null,
  //     coverLetter: "",
  //   });
  //   alert("Your application has been submitted successfully!");
  // };

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
          {/* <ul className="list-disc pl-6 mb-6">
            {job.responsibilities.map((resp, index) => (
              <li key={index} className="text-gray-600 mb-2">
                {resp}
              </li>
            ))}
          </ul> */}
          <div>
            {job.responsibilities.map((responsibility, index) => (
              <div key={index}>
                {Object.entries(responsibility).map(([title, tasks]) => (
                  <div key={title} className="mb-6">
                    <h3 className="text-base font-semibold">{title}</h3>
                    <ul className="list-inside list-disc ml-6">
                      {tasks.map((task, idx) => (
                        <li key={idx} className="text-gray-600">
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-2">Requirements:</h3>
          <ul className="list-disc pl-6">
            {job.requirements.map((qual, index) => (
              <li key={index} className="text-gray-600 mb-2">
                {qual}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-2">How to Apply:</h3>
            <p className="text-gray-600 mb-6">
              Send your CV to
              <a
                className="text-blue-700 font-semibold"
                href="mailto:davidbukolafoundation@gmail.com?subject=Job Application for Project Coordinator"
              >
                {" "}
                davidbukolafoundation@gmail.com{" "}
              </a>
              with the job title as the subject.
            </p>
          </div>
        </div>

        {/* <div className="bg-white rounded-2xl shadow-lg p-6">
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
        </div> */}
      </div>
    </div>
  );
}
