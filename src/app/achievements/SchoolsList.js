"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

export default function SchoolsList({ schools }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 3;

  if (!schools || schools.length === 0) {
    return null;
  }

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="mt-4">
      <h3 className="text-sm text-gray-500 mb-2">Schools</h3>
      <div className="flex flex-wrap gap-2">
        {(isExpanded ? schools : schools.slice(0, limit)).map((school, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
          >
            {school}
          </span>
        ))}
        {schools.length > limit && (
          <button
            onClick={toggleExpand}
            className="text-blue-500 hover:underline focus:outline-none text-sm"
          >
            {isExpanded ? "Show Less" : `+${schools.length - limit} More`}
          </button>
        )}
      </div>
    </div>
  );
}

SchoolsList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.string).isRequired,
};
