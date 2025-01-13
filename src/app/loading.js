"use client"; // Ensures the component runs on the client side.

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { mediaBaseUrl } from "@/constants";

export default function Loading() {
  // State to track the progress of the loading indicator.
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  // Effect to increment progress over time.
  useEffect(() => {
    // Timer to update progress at a fixed interval.
    timerRef.current = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          // Clear the interval when progress reaches 100%.
          clearInterval(timer);
          return 100;
        }
        // Increment progress by 1 and ensure it does not exceed 100.
        const newProgress = oldProgress + 1;
        return Math.min(newProgress, 100);
      });
    }, 20); // Update progress every 20ms.

    // Cleanup function to clear the interval when the component unmounts.
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
      {/* Display the progress percentage as a large, bold number */}
      <div
        className="text-9xl font-bold mb-8"
        aria-live="polite"
        aria-valuenow={progress}
      >
        {progress}%
      </div>

      {/* Progress bar container */}
      <div className="w-3/4 max-w-3xl bg-gray-200 rounded-full h-2.5 mb-16">
        {/* Progress bar filled portion */}
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Logo positioned at the bottom-right corner */}
      <div className="absolute bottom-8 right-8">
        <Image
          src={`${mediaBaseUrl}/images/dbf-logo.svg`}
          alt="Foundation Logo"
          width={60}
          height={60}
        />
      </div>
    </div>
  );
}
