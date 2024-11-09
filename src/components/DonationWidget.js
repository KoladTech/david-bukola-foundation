"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DonationWidget() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 space-y-3">
        <p className="text-sm font-medium text-gray-900">
          Want to make an impact?
        </p>
        <a
          href="/donate"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-24 py-2 rounded-md transition-colors"
        >
          Donate Now
        </a>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto", width: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 pt-2"
            >
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Naira</span>
                <span className="font-medium">3118690462-First Bank</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Dollar</span>
                <span className="font-medium">1877319747-Access Bank</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
