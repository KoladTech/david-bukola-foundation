"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TruncatedText({ text, limit }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= limit) {
    return <p className="text-gray-600">{text}</p>;
  }

  // Function to toggle expand
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p className="text-gray-600">
        {/* Display full text if expanded or Display up to the limit if not*/}
        {isExpanded ? text : `${text.slice(0, limit)}...`}
        <button
          onClick={toggleExpand}
          className="ml-1 text-blue-500 hover:underline focus:outline-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </p>
    </div>
  );
}

// Using javascript propType library to implement type checking
TruncatedText.propTypes = {
  text: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
};
