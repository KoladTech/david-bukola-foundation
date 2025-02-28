"use client";
import React, { useRef, useEffect, useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TestimonyForm from "@/app/testimonials/TestimonyForm";
import { fetchedData } from "@/lib/firebase/fetchFirebaseData";
import ThankYouMessageOnFormSuccess from "@/components/ThankYouMessageOnFormSuccess";
import { mediaBaseUrl } from "@/lib/constants";
import { serverTimestamp } from "firebase/firestore";

function SkeletonProject() {
  return (
    <div className="p-4 animate-pulse rounded-md">
      <div className="flex flex-col md:flex-row h-52 bg-white rounded-md mb-2 gap-4 justify-between">
        <div className="bg-gray-300 rounded-md border-solid w-full mb-2 p-4 mx-2"></div>
        <div className="bg-gray-300 rounded-md border-solid w-full mb-2 p-4 mx-2"></div>
        <div className="bg-gray-300 rounded-md border-solid w-full mb-2 p-4 mx-2"></div>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  // variables to store and set states for data and errors asynchronously
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTestimonyForm, setShowTestimonyForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const formRef = useRef(null);
  const [testimonyData, setTestimonyData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    testimonial: "",
    type: "text",
    newsletter: false,
    approved: false,
    date: serverTimestamp(),
  });

  // Fetch Testimonials on component mount (Using a variable (loadTestimonials) to store the function)
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        // Get the fetched data
        const fetchedTestimonials = await fetchedData("Testimonials");

        // Set the fetched data
        setTestimonials(fetchedTestimonials);

        // log error if failed
      } catch (err) {
        setError("Failed to load projects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  // Click anywhere outside the form to close the form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowTestimonyForm(false);
      }
    };

    // Set event to run on show of the form
    if (showTestimonyForm) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // useEffect Clean up function (Runs After every render/re-render, mount/removal of the component)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [showTestimonyForm]); //dependencies (list of all reactive code in the effect setup)

  return (
    <div className="container mx-auto px-4 py-8 my-8 content-div">
      {/* Featured Video Section */}

      {/* Featured Video Section */}
      {/* <div className="mb-6 rounded-lg overflow-hidden">
        <VideoPlayer
          src="/videoTest.mp4"
          poster="/thumbnail.jpg?height=600&width=1200"
          className="w-full aspect-video"
        />
      </div> */}

      {/* <HeroSection
        title={"Testimonials"}
        imageUrl={"/main_about_us.jpg"}
        alt={"Featured testimonial video thumbnail"}
        video={true}
      /> */}

      {/* Add Share Testimony Buttons */}
      <div className="flex justify-start mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-3xl"
          onClick={() => {
            setShowTestimonyForm(true);
          }}
        >
          <MessageSquarePlus className="h-4 w-4" />
          Share Testimony
        </Button>
      </div>

      {/* Text Testimonials Grid */}
      {loading ? (
        <SkeletonProject />
      ) : (
        <div>
          {/* // Displaying Testimonials: Filter text testimonies > sort by date > display sorted testimonies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials
              .filter(
                (testimonial) =>
                  testimonial.type === "text" && testimonial.approved === true
              )
              .sort((a, b) => {
                // Ensure both dates are valid before sorting
                const dateA = a.date?.seconds
                  ? new Date(a.date.seconds * 1000)
                  : new Date(0); // Default to epoch for invalid dates
                const dateB = b.date?.seconds
                  ? new Date(b.date.seconds * 1000)
                  : new Date(0);
                return dateB - dateA; // Sort in descending order (most recent first)
              })
              .map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  // Give alternating cards blue color by index
                  className={`relative p-6 h-72 ${
                    index % 2 === 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-start gap-4">
                      {/* Not using images currently */}
                      {/* <Image
                          src={testimonial.image}
                          alt={`${testimonial.name}'s profile picture`}
                          width={48}
                          height={48}
                          className="rounded-full"
                        /> */}
                      <div>
                        <div className="-ml-2 flex space-x-2">
                          {/* Circle with Initial */}
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 font-semibold text-lg">
                            {testimonial.firstName?.[0]?.toUpperCase() || "?"}
                          </div>
                          {/* Testifiers Name and Occupation */}
                          <div>
                            <h3 className="font-semibold">
                              {testimonial.firstName}
                            </h3>
                            <p
                              className={`text-sm ${
                                index % 2 === 1
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              } mb-2`}
                            >
                              {testimonial.occupation}
                            </p>
                          </div>
                        </div>

                        {/* Testimony */}
                        <p className="text-sm">{testimonial.testimonial}</p>
                      </div>
                    </div>
                    {/* Testimonial Dates */}
                    <div className="absolute bottom-4 flex items-end">
                      <p className="text-sm">
                        {new Date(
                          testimonial.date.seconds * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Video Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {testimonials
          .filter(
            (testimonial) =>
              testimonial.type === "video" && testimonial.approved === true
          )
          .map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
            >
              <VideoPlayer
                src={`${mediaBaseUrl}${testimonial.videoUrl}`}
                poster={testimonial.image}
                className="w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-200">{testimonial.role}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Display Testimony form on clicking the share testimony button*/}
      {showTestimonyForm && (
        <div>
          <TestimonyForm
            clickCloseForm={formRef}
            // Uses form ref to close the form
            closeForm={() => {
              setShowTestimonyForm(false);
            }}
            setShowThankYou={setShowThankYou}
            // Pass in testimony data so the data is available to the fonr and the data persists on closing the form and reopening it.
            testimonyData={testimonyData}
            setTestimonyData={setTestimonyData}
          />
        </div>
      )}
      {/* Show thank you message on successfully submitting testimony and onClosing the form */}
      {showThankYou && (
        <ThankYouMessageOnFormSuccess
          showThankYou={showThankYou}
          // Sends a function to set show thank you back to false)
          closeThankYou={() => {
            setShowThankYou(false);
          }}
          message={"Thank you for sharing your Testimony with us."}
          extraMessage={"It will be reviewed by our team!"}
        />
      )}
    </div>
  );
}
