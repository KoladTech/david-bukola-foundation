"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TruncatedText({ text, limit }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= limit) {
    return <p className="text-gray-600">{text}</p>;
  }

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p className="text-gray-600">
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

TruncatedText.propTypes = {
  text: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
};
