"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const faqData = [
  {
    question: "What does the foundation do?",
    answer: [
      "Our foundation is committed to making impactful changes in communities by empowering individuals and creating opportunities. See more on our  ",
      <Link key="about" href="/about" className="text-blue-300 hover:underline">
        About Us
      </Link>,
      " page.",
    ],
  },
  {
    question: "How can I join the foundation?",
    answer: [
      "You can connect with us through our ",
      <a
        key="instagram"
        href="https://www.instagram.com/davidbukola_foundation/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300 hover:underline"
      >
        Instagram page
      </a>,
      " or by email ",
      <a
        key="email"
        href="mailto:davidbukolafoundation@gmail.com"
        className="text-blue-300 hover:underline break-words"
      >
        davidbukolafoundation@gmail.com
      </a>,
      ". Let's work together to make a difference!",
    ],
  },
  {
    question: "How do you support individuals in tech?",
    answer:
      "Our founders have a strong commitment to empowering young, aspiring tech enthusiasts. We offer various forms of support to help them thrive in the tech field, including funding for coding bootcamps, introductory coding courses for beginners, educational resources, and interview preparation for tech job opportunities. By providing these tools, we aim to open doors for individuals who want to build a career in technology.",
  },
  {
    question: "Is there a limit to the amount of people that can join?",
    answer:
      "No, there’s no limit—everyone is welcome! The more of us there are, the greater the difference we can make together.",
  },
  {
    question: "How can I make an impact?",
    answer:
      "There are many ways to make a difference! While monetary support is always appreciated, you can also volunteer your time and skills. Another powerful way to help is by spreading the word about the DavidBukola Foundation on social media. The more people who know about our mission, the more lives we can touch and support together.",
  },
  {
    question: "What is the minimum amount I can donate?",
    answer:
      "No amount is too small—every contribution makes a difference. What may seem small to you could mean the world to someone else.",
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
          <p>{Array.isArray(answer) ? answer : answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <div className="bg-[#1d3557] text-white rounded-2xl my-12 p-8 w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-semibold mb-2">
          Frequently asked questions
        </h2>
        <p className="text-gray-300 text-1xl md:text-2xl">Everything to know</p>
      </div>

      <div className="space-y-4 text-2xl ">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
