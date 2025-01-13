"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, DollarSign, Users } from "lucide-react";

export default function DonationWidget() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Widget Content */}
      <div className="bg-white p-2 md:p-4 rounded-lg shadow-lg">
        <p className="text-xs md:text-sm mb-2 font-medium text-gray-900">
          Want to make an impact?
        </p>
        <a
          href="/donate"
          className="inline-block text-xs md:text-sm px-4 py-2 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          Donate Now <Heart className="ml-1 mb-0.5 inline h-4 w-4" />
        </a>
        {/* Animate on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto", width: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 pt-2"
            >
              {/* <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                <span>Every dollar counts towards our cause</span>
              </div> */}
              {/* <div className="flex items-center text-sm text-gray-600">
                <Users className="mr-2 h-4 w-4 text-blue-500" />
                <span>Join 1000+ donors making a difference</span>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
