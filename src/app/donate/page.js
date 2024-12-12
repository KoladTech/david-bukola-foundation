"use client";

import { useState } from "react";
import Image from "next/image";
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
  });

  // Handles logic of going to next stage only after selecting a donation to give
  const handleNext = () => {
    if (selectedAmount) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleBack = () => {
    if (selectedAmount) {
      setCurrentStep(Math.max(0, currentStep - 1));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to Firestore or an API)
    console.log("Form Data Submitted:", formData);
    alert("Thank you for donating!");
  };

  return (
    // <form onSubmit={handleFormSubmit}>
    <div className="">
      {/* Hero Section */}
      <div className="relative w-full">
        <HeroSection
          title={"Donate Now"}
          imageUrl={"/achievements-image-1.jpg"}
        />
        {/* Maybe make this "Donate Now" text animated from right to left on the screen */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white flex items-center gap-2">
            Donate Now
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="full-width-div ">
        <div className="max-w-6xl mx-auto px-4 py-12 bg-sky-900">
          <div className="flex flex-col md:flex-row gap-8 py-12">
            {/* Main Form Area */}
            <div className="flex-1">
              <Card className="bg-white p-8">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentStep * 100}%)`,
                    }}
                  >
                    {/* Card-Step 1: Amount Selection */}
                    <div className="flex-shrink-0 w-full ">
                      <div className="space-y-6 ">
                        {/* Text section for donate card */}
                        <div className="space-y-2">
                          <h2 className="text-xl font-semibold">
                            Choose how much you'd like to give
                          </h2>
                          <p className="text-gray-900">
                            Your donation will help us create positive change
                          </p>
                        </div>

                        {/* Amount selection */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {donationAmounts.map((amount) => (
                            <Button
                              key={amount.value}
                              variant={
                                selectedAmount === amount.value
                                  ? "default"
                                  : "outline"
                              }
                              className={`bg-sky-200 h-12 text-lg ${
                                selectedAmount === amount.value
                                  ? "bg-sky-900"
                                  : "border-white/40 text-white hover:bg-sky-900"
                              }`}
                              onClick={() => setSelectedAmount(amount.value)}
                            >
                              {amount.label}
                            </Button>
                          ))}
                        </div>
                        {/* Other amount  */}
                        <div>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Other Amount"
                            value={FormData.amount}
                            onChange={handleInputChange}
                            className="input-field"
                          />
                        </div>

                        <Button
                          className="w-full h-12 bg-sky-900 hover:bg-sky-800"
                          onClick={handleNext}
                          disabled={!selectedAmount}
                        >
                          Next
                        </Button>
                      </div>
                    </div>

                    {/* Card-Step 2: Personal Information */}
                    <div className="flex-shrink-0 w-full">
                      <div className="space-y-8">
                        {/* Additional form steps will be added here */}
                        <h2 className="text-xl font-semibold">
                          Your Information
                        </h2>
                        <div className="space-y-8">
                          <div className="flex gap-4">
                            <div className="flex w-full">
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={FormData.firstName}
                                onChange={handleInputChange}
                                required
                                placeholder="First Name * "
                                className="input-field"
                              />
                            </div>
                            <div className="flex w-full">
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={FormData.lastName}
                                onChange={handleInputChange}
                                required
                                placeholder="Last Name * "
                                className="input-field"
                              />
                            </div>
                          </div>

                          <div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={FormData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="Email * "
                              className="input-field"
                            />
                          </div>
                          <div>
                            <input
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={FormData.phoneNumber}
                              onChange={handleInputChange}
                              required
                              placeholder="Phone Number * "
                              className="input-field"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={FormData.city}
                              onChange={handleInputChange}
                              required
                              placeholder="City "
                              className="input-field"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              id="country"
                              name="country"
                              value={FormData.country}
                              onChange={handleInputChange}
                              required
                              placeholder="Country "
                              className="input-field"
                            />
                          </div>
                        </div>

                        {/* Next button for page-step-2 */}
                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            className="flex-1 h-12 border-sky-900 text-sky-900"
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                          <Button
                            className="flex-1 h-12 bg-sky-900 hover:bg-sky-800"
                            onClick={handleNext}
                            disabled={
                              !formData.firstName &&
                              !formData.firstName &&
                              !formData.email
                            }
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Card-Step-3  Payment Method*/}
                    <div className="flex-shrink-0 w-full">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h2 className="text-xl font-semibold">
                            Payment Method
                          </h2>
                          <p className="text-gray-900">
                            Choose how you'd like to pay
                          </p>
                        </div>
                        {/* Card Payment Method */}
                        <div className="space-y-4">
                          <Button
                            variant={`${
                              formData.paymentMethod === "card"
                            } ? "default" : "outline"`}
                            className={`w-full justify-start text-left h-auto p-4 border-sky-900 ${
                              formData.paymentMethod === "card"
                                ? "bg-sky-900"
                                : ""
                            }`}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                paymentMethod: "card",
                              }));
                            }}
                          >
                            <div>
                              <div className="font-semibold text-sky-900">
                                Pay with Card
                              </div>
                              <div className="text-sm text-gray-600">
                                Debit or Credit Card
                              </div>
                            </div>
                          </Button>

                          {/* Transfer Payment Method  */}
                          <Button
                            variant={`${
                              formData.paymentMethod === "transfer"
                            } ? "default" : "outline"`}
                            className={`w-full justify-start text-left h-auto p-4 ${
                              formData.paymentMethod === "transfer"
                                ? "bg-sky-900"
                                : "border-white/40 text-white hover:bg-sky-900"
                            }`}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                paymentMethod: "transfer",
                              }));
                            }}
                          >
                            <div>
                              <div className="font-semibold text-sky-900">
                                Bank Transfer
                              </div>
                              <div className="text-sm text-gray-600">
                                Direct bank transfer
                              </div>
                            </div>
                          </Button>
                        </div>
                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            className="flex-1 h-12 border-sky-900 text-sky-900"
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                          <Button
                            className="flex-1 h-12 bg-sky-900 text-white hover:bg-sky-800"
                            onClick={handleNext}
                            disabled={!formData.paymentMethod}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* Card-step-4 Last Page */}
                    <div>
                      <Button
                        variant="outline"
                        className="w-full h-12 border-sky-900 text-sky-900"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
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
    // </form>
  );
}
