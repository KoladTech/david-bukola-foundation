"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

import PictureCard from "./PictureCard";
import ContentCard from "./ContentCard";
import { mediaBaseUrl } from "@/lib/constants";

const carouselData = [
  {
    id: "projects",
    imageSrc: `${mediaBaseUrl}/images/project-page-image.png`,
    altText: "DBF Projects",
    title: "Projects",
    content:
      "We're dedicated to positive community impact through projects addressing key needs, from education and healthcare to empowerment. Explore our work and see how we're making a difference.",
    link: "/projects",
    linkText: "View Projects",
  },
  {
    id: "events",
    imageSrc: `${mediaBaseUrl}/images/events_hero_section.jpg`,
    altText: "DBF Events",
    title: "Events",
    content:
      "Explore our upcoming events, and discover how you can be part of our mission to make a difference. Together, we can transform lives!",
    link: "/events",
    linkText: "View Events",
  },
];

export default function ProjectEventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // 0 for initial, -1 for left, 1 for right

  // Handle auto-play
  useEffect(() => {
    console.log(currentIndex);
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]); // Add currentIndex to dependencies

  const goToNextSlide = () => {
    setDirection(1);
    setCurrentIndex((current) => (current + 1) % carouselData.length);
  };

  const goToPrevSlide = () => {
    setDirection(-1);
    setCurrentIndex((current) =>
      current === 0 ? carouselData.length - 1 : current - 1
    );
  };

  // Handle swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setIsAutoPlaying(false); // Pause auto-play
      goToNextSlide();
      // setIsAutoPlaying(true);
      setTimeout(() => setIsAutoPlaying(true), 5000); // Restart auto-play after 5 seconds
    },
    onSwipedRight: () => {
      setIsAutoPlaying(false); // Pause auto-play
      goToPrevSlide();
      // setIsAutoPlaying(true);
      setTimeout(() => setIsAutoPlaying(true), 5000); // Restart auto-play after 5 seconds
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  // Get the proper animation variants based on direction
  const getAnimationVariants = () => {
    return {
      enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
      }),
      center: {
        x: 0,
        opacity: 1,
      },
      exit: (direction) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
      }),
    };
  };

  const variants = getAnimationVariants();

  return (
    <div
      className="relative py-16 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      {...handlers}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <section>
            <div className="flex flex-col md:flex-row items-center justify-start p-8 gap-x-4">
              {/* Image */}
              <div className="w-full md:w-1/2 aspect-[4/3] flex justify-center mb-6">
                <PictureCard
                  imageSrc={carouselData[currentIndex].imageSrc}
                  altText={carouselData[currentIndex].altText}
                  imageSizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              {/* Contents */}
              <div className="w-full md:w-1/2 flex flex-col justify-start items-start px-4 gap-y-6">
                <ContentCard
                  title={carouselData[currentIndex].title}
                  content={carouselData[currentIndex].content}
                />
                {/* View page button */}
                <div className="flex justify-start">
                  <Link
                    href={carouselData[currentIndex].link}
                    className="inline-flex items-center gap-2 p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    {carouselData[currentIndex].linkText}
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      {/* Carousel indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              setIsAutoPlaying(false); // Pause auto-play
              setTimeout(() => setIsAutoPlaying(true), 5000); // Restart auto-play after 5 seconds
            }}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-500 w-16"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
