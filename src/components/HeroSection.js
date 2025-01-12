"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import LoadingSpinner from "./loadingSpinner";
import DonationWidget from "./DonationWidget";
import AchievementWidgets from "./AchievementWidgets";

const AnimatedCounter = ({ targetValue, statsLoading }) => {
  const [displayValue, setDisplayValue] = useState(0); // Value to display
  const [isVisible, setIsVisible] = useState(false); // Determines if the number is visible

  useEffect(() => {
    if (!statsLoading) {
      setIsVisible(true); // Make the number visible after loading
      let startValue = 0; // Start from 0
      const duration = 2000; // Animation duration in milliseconds
      const intervalTime = 10; // Update the value every 10ms
      const totalSteps = duration / intervalTime; // Calculate total steps
      const stepValue = targetValue / totalSteps; // Value to add per step

      const interval = setInterval(() => {
        startValue += stepValue; // Increment value
        if (startValue >= targetValue) {
          clearInterval(interval); // Stop the animation
          setDisplayValue(targetValue); // Ensure it ends on the exact target
        } else {
          setDisplayValue(Math.ceil(startValue)); // Update display with rounded value
        }
      }, intervalTime);

      return () => clearInterval(interval); // Clean up on component unmount
    }
  }, [statsLoading, targetValue]);

  return (
    <div style={{ visibility: isVisible ? "visible" : "hidden" }}>
      <span>{displayValue.toLocaleString()}</span>
    </div>
  );
};

export default function HeroSection({
  title,
  title2,
  description,
  imageUrl,
  alt,
  className,
  darkenImage,
  showStats = false,
  statsLoading,
  stats = null,
  video = false,
  bottomRightWidget = "donate",
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-between md:items-end my-4 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          {title}
          <span className="block">{title2}</span>
        </h1>
        <p className="text-gray-600 md:whitespace-nowrap">{description}</p>
      </div>
      <div className="relative rounded-3xl overflow-hidden mb-12 h-[300px] md:h-[533px]">
        <div className="aspect-w-2 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
          <Image
            src={imageUrl}
            alt={alt}
            className={`w-full h-full ${className}`}
            fill={true}
            style={{ objectFit: "cover" }}
          />
          {/* Darken background div */}
          <div className={darkenImage}></div>
          {/* Video section for displaying the Testimonials Page featured video */}
          {video && (
            <div>
              <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Featured testimonial video thumbnail"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full w-16 h-16 p-0"
                  >
                    <Play className="h-8 w-8" />
                    <span className="sr-only">Play featured video</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* Section for displaying stats on Achievements page */}
          {statsLoading ? ( //Check if the stats are still loading and display loading spinner as fallback
            <div className="relative h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            </div>
          ) : (
            showStats &&
            stats && ( // Show stats only if showStats is true and stats are provided
              <div className="absolute inset-0">
                <div className="h-full flex flex-col justify-end p-6 md:p-8">
                  {/* Mobile layout */}
                  <div className="flex flex-col md:hidden space-y-2">
                    {stats.totalFinancialSupportProvided ? (
                      <div className="text-white">
                        <div className="text-4xl font-bold mb-2">
                          {formatCurrency(stats.totalFinancialSupportProvided)}+
                        </div>
                        <div className="text-lg md:text-xl">
                          Support provided
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {stats.schoolsReached ? (
                      <div className="text-white">
                        <div className="text-4xl font-bold mb-2">
                          {`${new Intl.NumberFormat("en-NG", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(stats.schoolsReached)}+`}
                        </div>
                        <div className="text-lg md:text-xl">
                          Schools Reached
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {stats.peopleReached ? (
                      <div className="text-white">
                        <div className="text-4xl font-bold mb-2">
                          {`${new Intl.NumberFormat("en-NG", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(stats.peopleReached)}+`}
                        </div>
                        <div className="text-lg md:text-xl">People Reached</div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:flex md:flex-col">
                    {stats.totalFinancialSupportProvided ? (
                      <div className="text-white mb-8">
                        <div className="text-6xl font-bold mb-2">
                          {formatCurrency(stats.totalFinancialSupportProvided)}+
                        </div>
                        <div className="text-2xl">Support Provided</div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="flex gap-16">
                      <div className="text-white">
                        {stats.schoolsReached ? (
                          <>
                            <div className="text-5xl font-bold mb-2">
                              {`${new Intl.NumberFormat("en-NG", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(stats.schoolsReached)}+`}
                            </div>
                            <div className="text-xl">Schools Reached</div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="text-white">
                        {stats.peopleReached ? (
                          <>
                            <div className="text-5xl font-bold mb-2">
                              {`${new Intl.NumberFormat("en-NG", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(stats.peopleReached)}+`}
                            </div>
                            <div className="text-xl">People Reached</div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {bottomRightWidget === "donate" ? (
          <div className="absolute bottom-4 right-3 md:right-4 ">
            <DonationWidget />
          </div>
        ) : // If is is achievements
        bottomRightWidget === "achievements" ? (
          <AchievementWidgets />
        ) : // If its nothing
        null}
      </div>
    </>
  );
}
