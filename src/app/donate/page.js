"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import thankYouMessage from "@/lib/thankYouMessage";
import handleEmailValidation from "@/lib/emailVerification";

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

// Bank account details
const bankAccounts = [
  {
    bank: "First Bank",
    accountNumber: "0123456789",
    accountName: "David Bukola Foundation",
  },
  {
    bank: "GTBank",
    accountNumber: "0987654321",
    accountName: "David Bukola Foundation",
  },
];

const totalSteps = 3;

export default function DonatePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [otherAmount, setOtherAmount] = useState(false);
  const [inputMade, setInputMade] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentMethod: "",
    amount: "",
  });
  // router for going back to a previous page
  const router = useRouter();
  // Next js router for storing the search parameters of pages visited
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const [previousPage, setPreviousPage] = useState("/");
  const [showThankYou, setShowThankYou] = useState("");
  const [copiedStates, setCopiedStates] = useState(
    bankAccounts.map(() => false)
  );
  // For storing the previous page
  useEffect(() => {
    // Store the previous page URL when the component mounts (Browser method)
    if (typeof window !== "undefined") {
      setPreviousPage(document.referrer);
    }
  }, []);
  // Handles the copy buttons for the account numbers
  const handleCopy = (index, accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedStates((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
    setTimeout(() => {
      setCopiedStates((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }, 2000);
  };

  // Handles logic of going to next stage only after selecting a donation to give
  const handleNext = () => {
    if (selectedAmount) {
      setCurrentStep(currentStep + 1);
    }
  };
  // Back Navigation on payment flow
  const handleBack = () => {
    if (selectedAmount) {
      setCurrentStep(Math.max(0, currentStep - 1));
    }
  };

  // Handles getting data from input fields and populating the formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailErrorMessage(false); // allow user type, without constant error message
      // If email is valid
      if (!handleEmailValidation(e)) {
        setEmailValid(true);
        setEmailErrorMessage(false);
      } else setEmailValid(false);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setInputMade(true);
  };
  // UseEffect to ensure the setAmount is updated properly as the state changes
  useEffect(() => {
    if (inputMade) {
      inputRef.current.value === "" && !selectedAmount
        ? setSelectedAmount("")
        : setSelectedAmount(formData.amount);
    }
  });

  // Set the input field to be used to get the amount
  const useOtherAmount = () => {
    setOtherAmount(true);
    if (inputRef.current.value === "") {
      setSelectedAmount("");
    }
  };

  // references for input fields
  const inputRef = useRef(null);

  // Create a single ref object
  const formDataRefs = useRef({});

  // Clears input field
  const clearInput = (e) => {
    setInputMade(false); // Make the input made button false (To disable next)
    setOtherAmount(false); // disable otherAmount field
    // clear the amount input field via the ref of the field
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Prevents default submission of forms
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to Firestore or an API)
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
      <div className="full-width-div">
        <div className="max-w-6xl mx-auto px-4 py-12 bg-sky-800">
          <div className="flex flex-col md:flex-row gap-8 py-12">
            {/* Thank You message when "I have made payment is clicked". (Placed here so it'll display on the whole page) */}
            {showThankYou && (
              <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
                <Card className="relative bg-white rounded-lg p-8 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300">
                  <div
                    // ref={closeForm}
                    className=" bg-sky-500 rounded-lg p-6 w-full max-w-md shadow-lg text-center"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Thank you for your donation
                    </h2>
                    <p className="text-gray-700">
                      Your generosity helps us make a difference.
                    </p>
                  </div>
                </Card>
              </div>
            )}

            {/* Main Form Area */}
            <div className="flex-1">
              <Card className="bg-white p-8">
                {/* Back Navigation arrow  */}
                <div className="flex flex-col">
                  <div>
                    {currentStep > 0 && (
                      <button
                        onClick={handleBack}
                        className="hover:text-sky-600 transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                  {/* Progress Indicators */}
                  <div className="flex-1">
                    <div className="flex justify-start gap-2 mb-6">
                      {[...Array(totalSteps)].map((_, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full ${
                            index === currentStep
                              ? "bg-blue-600"
                              : "bg-gray-500/40 border-blue-950"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Card Texts div starts  */}
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
                                selectedAmount === amount.value &&
                                otherAmount === false
                                  ? "bg-sky-800"
                                  : "border-white/40 text-white hover:bg-sky-800"
                              }`}
                              // Onclciking any amount button
                              onClick={() => {
                                // alert([selectedAmount, otherAmount]);
                                clearInput(); //Clear the input field
                                setSelectedAmount(amount.value); //set that buttons amount
                                // Set the value of the button into the form data
                                setFormData((prev) => ({
                                  ...prev,
                                  amount: amount.value,
                                }));
                              }}
                            >
                              {amount.label}
                            </Button>
                          ))}
                        </div>
                        {/* Other amount  */}
                        <div>
                          <input
                            className="input-field"
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="Other Amount"
                            value={FormData.amount}
                            ref={inputRef}
                            onClick={useOtherAmount} //Enable otherAmount field
                            onInput={(e) => {
                              handleInputChange(e); //Call function to Handle input data
                            }}
                          />
                        </div>
                        <Button
                          className="w-full h-12 bg-sky-800 hover:bg-sky-700"
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
                                ref={(el) =>
                                  (formDataRefs.current.firstName = el)
                                }
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
                                // ref={lastNameRef}
                                ref={(el) =>
                                  (formDataRefs.current.lastName = el)
                                }
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
                              // ref={emailRef}
                              onBlur={(e) =>
                                setEmailErrorMessage(handleEmailValidation(e))
                              } // Use arrow function so you can pass the event as a parameter
                              ref={(el) => (formDataRefs.current.email = el)}
                              required
                              placeholder="Email * "
                              className="input-field"
                            />
                            {emailErrorMessage && (
                              <div>
                                <p className="text-red-500 text-md mt-2">
                                  Please enter a valid email address{" "}
                                  <p>e.g example@domain.com</p>
                                </p>
                              </div>
                            )}
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
                            className="flex-1 h-12 border-sky-800 text-sky-800"
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                          <Button
                            className="flex-1 h-12 bg-sky-800 hover:bg-sky-700"
                            onClick={handleNext}
                            disabled={
                              !formDataRefs.current.firstName?.value ||
                              !formDataRefs.current.lastName?.value ||
                              !formDataRefs.current.email?.value ||
                              emailErrorMessage ||
                              !emailValid
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
                            className={`w-full justify-center text-left h-auto p-4 bg-sky-800 hover:bg-sky-950 ${
                              formData.paymentMethod === "card"
                                ? "bg-sky-600"
                                : ""
                            }`}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                paymentMethod: "card",
                              }));
                            }}
                          >
                            <div className="">
                              <div className="flex justify-center font-semibold text-sky-300">
                                Pay with Card
                              </div>
                              {/* Delete */}
                              <div className="flex justify-center text-sm text-sky-100">
                                Debit or Credit Card
                              </div>
                            </div>
                          </Button>

                          {/* Transfer Payment Method  */}
                          <Button
                            variant={`${
                              formData.paymentMethod === "transfer"
                            } ? "default" : "outline"`}
                            className={`w-full justify-center text-left h-auto p-4 bg-sky-800 hover:bg-sky-950 ${
                              formData.paymentMethod === "transfer"
                                ? "bg-sky-600"
                                : ""
                            }`}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                paymentMethod: "transfer",
                              }));
                            }}
                          >
                            <div>
                              <div className="flex justify-center font-semibold text-sky-300">
                                Bank Transfer
                              </div>
                              <div className="flex justify-center text-sm text-sky-100">
                                Direct bank transfer
                              </div>
                            </div>
                          </Button>
                        </div>

                        {/* Account Numbers Display */}
                        {/* Conditional Content Display */}
                        {formData.paymentMethod && (
                          // <Card className="p-4 bg-sky-900/50 border-sky-700">
                          <Card className="p-4 bg-white">
                            {formData.paymentMethod === "transfer" ? (
                              <>
                                <h3 className="text-center text-sky-900 font-semibold mb-4">
                                  Bank Account Details
                                </h3>
                                <div className="space-y-4">
                                  {bankAccounts.map((account, index) => (
                                    <div
                                      key={index}
                                      className="p-3 rounded-lg "
                                    >
                                      <p className="text-black font-medium">
                                        {account.bank}
                                      </p>
                                      <div className="flex justify-start items-center space-x-2">
                                        <p className="text-black text-lg font-mono">
                                          {account.accountNumber}
                                        </p>
                                        <Button
                                          variant="ghost"
                                          className="h-8 text-sky-800 hover:text-sky-100 hover:bg-sky-800"
                                          onClick={() => {
                                            handleCopy(
                                              index,
                                              account.accountNumber
                                            ); // Function to copy and display copied message
                                          }}
                                        >
                                          Copy
                                        </Button>
                                        {copiedStates[index] && (
                                          <div className="text-xs text-sky-800 px-4 py-2 rounded-md shadow-lg">
                                            Account number copied!
                                          </div>
                                        )}
                                      </div>
                                      <p className="text-black font-medium">
                                        {account.accountName}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <div className="text-center py-8">
                                <h3 className="text-2xl font-medium text-sky-300 mb-2">
                                  Coming Soon...
                                </h3>
                                <p className="text-black">
                                  Card payment integration is under development.
                                </p>
                              </div>
                            )}
                          </Card>
                        )}
                        {/* Payment confirmation buttons */}
                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            className="flex-1 h-12 text-white bg-sky-600"
                            onClick={() => {
                              handleNext;

                              setShowThankYou(thankYouMessage(true)); // Call the function to Show thank you message
                              // thankYouMessage(false);

                              // Set a timeout for thank you message and close the form in the parent page
                              setTimeout(() => {
                                setShowThankYou(thankYouMessage(false)); // Call the function to hide thank you message

                                //redirect to the previous or home page
                                if (returnTo) {
                                  router.push(decodeURIComponent(returnTo));
                                } else {
                                  router.push("/");
                                }
                              }, 3000);

                              // This uses the browser method to get the last visited page
                              // if (previousPage) {
                              //   router.push(previousPage);
                              // } else {
                              //   // Fallback to home page if no previous page
                              //   router.push("/");
                              // }
                            }}
                            // Disable the button until transfer method is selected
                            disabled={!(formData.paymentMethod === "transfer")}
                          >
                            I have made payment
                          </Button>
                          {/* <Button
                            variant="outline"
                            className="flex-1 h-12 border-red-800 text-red-800"
                            // onClick={handleNext;}
                            // disabled={!formData.paymentMethod}
                          >
                            Payment did not go through
                          </Button> */}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            className="flex-1 h-12 border-sky-800 text-sky-800"
                            onClick={handleBack}
                          >
                            Back
                          </Button>

                          {/* <Button
                            className="flex-1 h-12 bg-sky-800 text-white hover:bg-sky-950"
                            onClick={handleNext}
                            disabled={!formData.paymentMethod}
                          >
                            Next
                          </Button> */}
                        </div>
                      </div>
                    </div>
                    {/* Card-step-4 Last Page (IF WE IMPLEMENT TRANSFER MANUALLY)*/}
                    {/* <div>
                      <Button
                        variant="outline"
                        className="w-full h-12 border-sky-800 text-sky-800"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    </div> */}
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
