"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";

const donationAmounts = [
  { value: 5000, label: "₦5,000" },
  { value: 10000, label: "₦10,000" },
  { value: 20000, label: "₦20,000" },
  { value: 50000, label: "₦50,000" },
  { value: 100000, label: "₦100,000" },
  { value: 200000, label: "₦200,000" },
];

const otherWays = [
  "Donate via Bank",
  "Donate via Mobile",
  "Donate via USSD",
  "Others",
];

export default function DonatePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleNext = () => {
    if (selectedAmount) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative w-full">
        <HeroSection
          title={"Donate Now"}
          imageUrl={"/achievements-image-1.jpg"}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white flex items-center gap-2">
            Donate Now <ArrowRight className="w-8 h-8" />
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="full-width-div">
        <div className="max-w-6xl mx-auto px-4 py-12 bg-sky-900">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Form Area */}
            <div className="flex-1">
              <Card className="bg-blue-900 text-white p-8">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentStep * 100}%)` }}
                  >
                    {/* Step 1: Amount Selection */}
                    <div className="flex-shrink-0 w-full">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h2 className="text-xl font-semibold">
                            Choose how much you'd like to give
                          </h2>
                          <p className="text-blue-100">
                            Your donation will help us create positive change
                          </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {donationAmounts.map((amount) => (
                            <Button
                              key={amount.value}
                              variant={
                                selectedAmount === amount.value
                                  ? "default"
                                  : "outline"
                              }
                              className={`h-12 text-lg ${
                                selectedAmount === amount.value
                                  ? "bg-white text-blue-900"
                                  : "border-white/40 text-white hover:bg-white hover:text-blue-900"
                              }`}
                              onClick={() => setSelectedAmount(amount.value)}
                            >
                              {amount.label}
                            </Button>
                          ))}
                        </div>

                        <Button
                          className="w-full h-12 bg-white text-blue-900 hover:bg-blue-50"
                          onClick={handleNext}
                          disabled={!selectedAmount}
                        >
                          Next
                        </Button>
                      </div>
                    </div>

                    {/* Step 2: Personal Information */}
                    <div className="flex-shrink-0 w-full">
                      {/* Additional form steps will be added here */}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Other Ways to Give */}
            <div className="md:w-72">
              <h3 className="text-lg font-semibold mb-4">Other ways to give</h3>
              <div className="space-y-2">
                {otherWays.map((way) => (
                  <Button
                    key={way}
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    {way}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
