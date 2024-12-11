"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, MessageSquarePlus, VideoIcon } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import VideoPlayer from "@/components/VideoPlayer";
import { useEffect, useState } from "react";
import { fecthedData } from "@/firebase/fetchFirebaseData";

// const testimonials = [
//   {
//     id: 1,
//     name: "Vincent Anderson",
//     role: "Student volunteer",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis.",
//     image: "/images/person placeholder.png?height=400&width=400",
//     type: "text",
//   },
//   {
//     id: 2,
//     name: "Michael Hamilton",
//     role: "Partner University of Lagos",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis.",
//     image: "/images/person placeholder.png",
//     type: "text",
//   },
//   {
//     id: 3,
//     name: "Vincent Anderson",
//     role: "Student volunteer",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis.",
//     image: "/images/person placeholder.png",
//     type: "text",
//   },
//   {
//     id: 4,
//     name: "Vincent Anderson",
//     role: "Student volunteer",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis. ",
//     image: "/images/person placeholder.png",
//     type: "text",
//   },
//   {
//     id: 5,
//     name: "Deyemi Akande",
//     role: "Partner University of Lagos",
//     image: "",
//     type: "video",
//     videoUrl: "/videos/vid.mp4",
//   },
//   {
//     id: 6,
//     name: "Deyemi Akande",
//     role: "Partner University of Lagos",
//     image: "",
//     type: "video",
//     videoUrl: "/videos/vid2.mp4",
//   },
//   {
//     id: 7,
//     name: "Deyemi Akande",
//     role: "Partner University of Lagos",
//     image: "",
//     type: "video",
//     videoUrl: "/videos/vid3.mp4",
//   },
// ];

function SkeletonProject() {
  return (
    <div className="p-4 animate-pulse rounded-md">
      <div className="flex flex-col md:flex-row h-52 bg-white rounded-md mb-2 gap-4 justify-between">
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

  // Fetch Testimonials on component mount (Using a variable to store the function)
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        // Get the fetched data
        const fetchedTestimonials = await fecthedData("Testimonials");

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

  return (
    <div className="container mx-auto px-4 py-8 my-8">
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

      {/* Text Testimonials Grid */}
      {loading ? (
        <SkeletonProject />
      ) : (
        <div>
          {/* If the data fetch has an error */}
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            // Displaying Testimonials
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {testimonials
                .filter((textTestimonial) => textTestimonial.type === "text")
                .map((testimonial) => (
                  <Card
                    key={testimonial.id}
                    className={`relative p-6 h-72 ${
                      testimonial.num % 2 === 1 ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-start gap-4">
                        {/* <Image
                          src={testimonial.image}
                          alt={`${testimonial.name}'s profile picture`}
                          width={48}
                          height={48}
                          className="rounded-full"
                        /> */}
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p
                            className={`text-sm ${
                              testimonial.num % 2 === 1
                                ? "text-blue-100"
                                : "text-gray-500"
                            } mb-2`}
                          >
                            {testimonial.role}
                          </p>
                          <p className="text-sm">{testimonial.testimonial}</p>
                        </div>
                      </div>
                      {/* Testimonial Dates */}
                      <div className="absolute bottom-4 flex items-end">
                        <p className="text-sm">
                          {" "}
                          <span>
                            {" "}
                            {testimonial.date
                              ? new Date(
                                  testimonial.date.seconds * 1000
                                ).toLocaleDateString()
                              : "No Timestamp Available"}{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Add Share Testimony Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-3xl"
        >
          <MessageSquarePlus className="h-4 w-4" />
          Share Testimony
        </Button>
      </div>

      {/* Video Testimonials Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials
          .filter((testimonial) => testimonial.type === "video")
          .map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
            >
              <VideoPlayer
                src={testimonial.videoUrl}
                poster={testimonial.image}
                className="w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-200">{testimonial.role}</p>
              </div>
            </div>
          ))}
      </div> */}
    </div>
  );
}
