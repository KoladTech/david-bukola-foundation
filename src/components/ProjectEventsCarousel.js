"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { mediaBaseUrl } from "@/lib/constants";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const slides = [
  {
    id: "projects",
    title: "Projects",
    description:
      "We are committed to making a positive impact through various projects tailored to address pressing community needs. From education and healthcare initiatives to empowerment programs, our projects are designed to create lasting change. Discover how we're making a difference and explore the inspiring work we do.",
    imageSrc: `${mediaBaseUrl}/images/project-page-image.png`,
    imageAlt: "Hands coming together in unity",
    link: "/projects",
    linkText: "View Projects",
  },
  {
    id: "events",
    title: "Events",
    description:
      "Join us at our upcoming events where we bring communities together for positive change. From food drives to educational workshops, our events create meaningful impact and lasting connections. Discover how you can be part of these transformative gatherings.",
    imageSrc: `${mediaBaseUrl}/images/events_hero_section.jpg`,
    imageAlt: "Community events and gatherings",
    link: "/events",
    linkText: "View Events",
  },
];

export default function ProjectEventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const controls = useAnimation();

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % slides.length);
  }, []);

  const goToPreviousSlide = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNextSlide]);

  const resumeAutoplayDebounced = useCallback(() => {
    const timer = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDragEnd = (event, info) => {
    setIsAutoPlaying(false);
    const SWIPE_THRESHOLD = 50;

    if (info.offset.x > SWIPE_THRESHOLD) {
      goToPreviousSlide();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      goToNextSlide();
    }

    resumeAutoplayDebounced();
  };

  return (
    <div className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Swipeable area wrapper */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden">
                    <Image
                      src={slides[currentIndex].imageSrc || "/placeholder.svg"}
                      alt={slides[currentIndex].imageAlt}
                      width={600}
                      height={400}
                      className="object-cover select-none"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                  </div>
                </div>
                <div className="w-full md:w-1/2 pointer-events-none px-5">
                  <h2 className="text-3xl font-bold mb-4 select-none">
                    {slides[currentIndex].title}
                  </h2>
                  <p className="text-gray-600 mb-6 select-none">
                    {slides[currentIndex].description}
                  </p>
                  <div className="pointer-events-auto">
                    <Link
                      href={slides[currentIndex].link}
                      className="inline-flex items-center gap-2 p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      {slides[currentIndex].linkText}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-4 mt-8 pointer-events-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                resumeAutoplayDebounced();
              }}
              className={`w-4 h-4 md:w-6 md:h-6 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-500 w-12 md:w-16"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
