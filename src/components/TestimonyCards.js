"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchedData } from "@/lib/firebase/fetchFirebaseData";
import LoadingSpinner from "./loadingSpinner";

export default function ScrollableCardRow() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  // Handles scrolling of testimony cards
  const handleScroll = (direction) => {
    // Get the container in question
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScrollEvent = () => {
        setScrollPosition(container.scrollLeft);
      };
      container.addEventListener("scroll", handleScrollEvent);
      return () => container.removeEventListener("scroll", handleScrollEvent);
    }
  }, []);

  // variables to store and set states for data and errors asynchronously
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Testimonials on component mount (Using a variable to store the function)
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
  return (
    <section className="py-12 px-4 bg-gray-50 full-width-div">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Testimonies Section */}
          <div className="w-full md:w-1/2 flex flex-col p-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Testimonials</h2>

            {/* All testimony section */}
            <div className="items-center mb-6">
              <p className="mb-6 text-lg text-gray-600">
                Hear what people are saying about our foundation!
              </p>
              <div>
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-2 p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  View All Testimonials
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            {/* Share testimony section */}
            <div className="hidden md:block">
              <p className="mb-6 text-lg text-gray-600">
                Would you like to share yours?
              </p>
              <div>
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-2 p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Share your Testimony
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Scrollable Cards Section */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="w-full md:w-1/2 relative">
              <div
                ref={containerRef}
                className="relative flex overflow-x-auto gap-6 pb-6 scrollbar-custom"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {testimonials
                  .filter(
                    (testimonial) =>
                      testimonial.type === "text" &&
                      testimonial.approved === true
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
                  .slice(0, 5)
                  .map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className=" flex-shrink-0 w-[400px] bg-white rounded-lg shadow-md p-6"
                      style={{ scrollSnapAlign: "start" }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        {/* Not using images currently */}
                        {/* <Image
                        src={testimonial.imageSrc}
                        alt={`${testimonial.name}'s profile picture`}
                        width={60}
                        height={60}
                        className="rounded-full"
                      /> */}
                        <div className="flex space-x-2">
                          {/* Circle with Initial */}
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 font-semibold text-lg">
                            {testimonial.firstName?.[0]?.toUpperCase() || "?"}
                          </div>
                          {/* Testifiers Name and Occupation */}
                          <div>
                            <h3 className="text-xl font-semibold">
                              {testimonial.firstName}
                            </h3>
                            <p className="text-gray-500">
                              {testimonial.occupation}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Testimony */}
                      <p className="mb-2">{testimonial.testimonial}</p>
                      {/* Testimonial Dates */}
                      <div className="absolute bottom-8 flex items-end">
                        <p className="text-sm">
                          {new Date(
                            testimonial.date.seconds * 1000
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Left Scroll Button */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <button
                  onClick={() => handleScroll("left")}
                  className="p-2 bg-slate-200 rounded-full shadow-md hover:bg-slate-300 transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6 text-blue-600" />
                </button>
              </div>
              {/* Right Scroll Button */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                <button
                  onClick={() => handleScroll("right")}
                  className="p-2 bg-slate-200 rounded-full shadow-md hover:bg-slate-300 transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6 text-blue-600" />
                </button>
              </div>
            </div>
          )}
          {/* This section displays below the testimonials cards, only on mobile devices for better UX flow */}
          <div className="md:hidden">
            <p className="mb-6 text-lg text-gray-600">
              Would you like to share yours?
            </p>
            <div className="flex justify-center">
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Share your Testimony
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
