"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 1;
        return Math.min(newProgress, 100);
      });
    }, 20);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
      <div className="text-9xl font-bold mb-8">{progress}%</div>
      <div className="w-3/4 max-w-3xl bg-gray-200 rounded-full h-2.5 mb-16">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="absolute bottom-8 right-8">
        <Image
          src="/images/dbf-logo.svg"
          alt="Foundation Logo"
          width={60}
          height={60}
        />
      </div>
    </div>
  );
}
