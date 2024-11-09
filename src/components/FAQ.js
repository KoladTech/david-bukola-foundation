"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What does the foundation do?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare.",
  },
  {
    question: "How can I join the foundation?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare.",
  },
  {
    question: "Is there a limit to the amount to people that can join?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare.",
  },
  {
    question: "How can I make an impact?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Consectetur massa eu pharetra porttitor nulla ornare.",
  },
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/20 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-8 h-8 text-white/80" />
        ) : (
          <ChevronDown className="w-8 h-8 text-white/80" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-300">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <div className="bg-[#1d3557] text-white rounded-2xl my-12 p-8 w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold mb-2">
          Frequently asked questions
        </h2>
        <p className="text-gray-300 text-2xl">Everything to know</p>
      </div>

      <div className="space-y-4 text-3xl">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
