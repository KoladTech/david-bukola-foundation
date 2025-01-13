"use client";
import { mediaBaseUrl } from "@/constants";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import HeroSection from "@/components/HeroSection";
import handleEmailValidation from "@/lib/emailVerification";
import db from "@/firebase/firebaseConfig";
import addUserDocument from "@/firebase/createUser";
import { handleFormSubmit } from "@/firebase/handleFormSubmission";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { countries } from "@/constants";
import ThankYouMessageOnFormSuccess from "@/components/ThankYouMessageOnFormSuccess";

// Donation constants
const donationAmounts = [
  { value: 5000, label: "₦5,000" },
  { value: 10000, label: "₦10,000" },
  { value: 20000, label: "₦20,000" },
  { value: 50000, label: "₦50,000" },
  { value: 100000, label: "₦100,000" },
  { value: 200000, label: "₦200,000" },
];

// Other ways to give constants
const otherWays = ["Donate Clothes", "Donate Foodstuff", "Others"];

// Number of card steps for payment flow
const totalSteps = 3;

export default function DonatePage() {
  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [donateFormData, setDonateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    phoneCode: "",
    paymentMethod: "",
    amount: "",
    city: "",
    country: "",
    newsletter: false,
    approved: false,
    date: serverTimestamp(),
  });

  // Monetary States
  const [selectedAmount, setSelectedAmount] = useState("");
  const [otherAmount, setOtherAmount] = useState(false);

  // Email states
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  // router for going back to a previous page
  const router = useRouter();
  // Next js router for storing the search parameters of pages visited
  const searchParams = useSearchParams();
  // routing states
  const returnTo = searchParams.get("returnTo");
  const [previousPage, setPreviousPage] = useState("/");

  // Getting bank details
  const [bankDetails, setBankDetails] = useState([]);
  const [loading_bankDetails, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedStates, setCopiedStates] = useState(
    bankDetails.map(() => false)
  );

  // Getting countries and phone codes
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPhoneCode, setSelectedPhoneCode] = useState("");

  // Other states
  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  // Functionsssssssssssssssssssssssssssssssssssssss

  const handleCountryChange = (e) => {
    // Get the country selected and set it
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    // Check if country code is available and set it
    const country = countries.find((c) => c.code === countryCode);
    if (country) {
      setSelectedPhoneCode(country.phoneCode);
    } else {
      setSelectedPhoneCode("");
    }
    // Update FormData to reflect the selected country immediately
    setDonateFormData((prev) => ({
      ...prev,
      country: countryCode, // Update the country field in FormData (using the value itself not the selected country state)
      phoneCode: country ? country.phoneCode : prev.phoneCode, // Update the phone code in FormData
    }));
  };

  // Fetch Banking details
  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchData = async () => {
      setLoading(true);
      try {
        const accountDetailsDoc = await getDoc(
          doc(db, "FoundationInfo", "X4Z4PkcNt2C0L1mFUXdj")
        );
        if (accountDetailsDoc.exists()) {
          console.log("Exists");
          setBankDetails([accountDetailsDoc.data()]);
        }
        if (!accountDetailsDoc.exists()) {
          console.warn("Document does not exist!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handles the copy buttons for the account numbers
  const handleCopy = (index, accountNumber) => {
    // copy the number to clipboard
    navigator.clipboard.writeText(accountNumber);
    // Set the variable with the copied value
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

  // For storing the previous page
  useEffect(() => {
    // Store the previous page URL when the component mounts (Browser method)
    if (typeof window !== "undefined") {
      setPreviousPage(document.referrer);
    }
  }, []);

  // Handles logic of going to next stage only after selecting a donation to give
  const handleNext = () => {
    // If an amount is selected
    if (donateFormData.amount) {
      setCurrentStep(currentStep + 1);
    }
    console.log("Input change Form Data", donateFormData);
  };
  // Back Navigation on payment flow
  const handleBack = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  // Handles getting data from input fields and populating the donateFormData
  const handleInputChange = (e) => {
    // Get the name and value of the field
    const { name, value } = e.target;
    if (name === "email") {
      setEmailErrorMessage(false); // allow user type, without constant error message
      // If email is valid
      if (!handleEmailValidation(e)) {
        setEmailValid(true);
        setEmailErrorMessage(false);
      } else setEmailValid(false);
    }
    setDonateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Solely for to the Amount selection part
    console.log("Input change Form Data", donateFormData);
  };

  // references for other amount input field
  const otherAmountInputRef = useRef(null);

  // Set the input field to be used to get the amount
  const useOtherAmount = () => {
    setOtherAmount(true);
    if (otherAmountInputRef.current.value === "") {
      setSelectedAmount("");
    }
  };

  // Clears input field
  const clearInput = (e) => {
    setOtherAmount(false); // disable otherAmount field
    // clear the amount input field via the ref of the field
    if (otherAmountInputRef.current) {
      otherAmountInputRef.current.value = "";
    }
  };

  const reRoutePage = () => {
    //redirect to the previous or home page
    if (returnTo) {
      router.push(decodeURIComponent(returnTo));
    } else {
      router.push("/");
    }

    // // This uses the browser method to get the last visited page
    // if (previousPage) {
    //   router.push(previousPage);
    // } else {
    //   // Fallback to home page if no previous page
    //   router.push("/");
    // }
  };
  // TODO: Make it a component entirely
  // Function to show thank you message and reset the form data
  // const successfullySubmittedTestimony = () => {
  //   console.log("successfullySubmittedTestimony");

  //   setShowThankYou(true); // Show thank you message

  //   // Set a timeout for thank you message
  //   setTimeout(() => {
  //     setShowThankYou(false);
  //     reRoutePage();
  //   }, 3000);

  //   // Reset Testimony data.
  //   setDonateFormData({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     phoneNumber: "",
  //     phoneCode: "",
  //     paymentMethod: "",
  //     amount: "",
  //     city: "",
  //     country: "",
  //     newsletter: false,
  //     approved: false,
  //     date: serverTimestamp(),
  //   });
  // };

  // Reset Donate data.
  const resetFormData = () => {
    setDonateFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      phoneCode: "",
      paymentMethod: "",
      amount: "",
      city: "",
      country: "",
      newsletter: false,
      approved: false,
      date: serverTimestamp(),
    });
  };

  // Handles form submission on clicking share button
  const handleSubmit = (e) => {
    handleFormSubmit({
      e,
      formType: "donateForm",
      formData: donateFormData,
      yourCollection: "TestCollection",
      userRole: "donor",
      setSubmissionError,
      setIsSubmitting,
      setShowThankYou,
      resetFormData,
      reRoutePage,
    });
  };
  // TODO: Make a reuable function
  // Handles form submission on clicking share button
  const handleDonateFormSubmit = async (e) => {
    e.preventDefault(); //Prevent default i.e form reloading
    setIsSubmitting(true); // Show loading indicator
    setSubmissionError(""); // Reset error state

    try {
      // Send a POST request to the api with testimony data object as payload
      const response = await fetch("api/sendMail", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "donateForm",
          formData: donateFormData,
        }), //2
      });

      // If the mail did not send succesfully
      if (!response.ok) {
        setSubmissionError("Failed to send email. Please try again.");
        return;
      }

      const collectionRef = collection(db, "TestCollection"); //get the testimonial collection //3
      const docRef = await addDoc(collectionRef, donateFormData); //add a new document to the collection //4

      // Add the new user to the Users Collection
      await addUserDocument({ ...donateFormData, roles: ["donor"] });

      // Set the Thank You component with thank you message
      setShowThankYou(true);

      // Reset Testimony data.
      setDonateFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        phoneCode: "",
        paymentMethod: "",
        amount: "",
        city: "",
        country: "",
        newsletter: false,
        approved: false,
        date: serverTimestamp(),
      });

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        reRoutePage();
      }, 3000);
    } catch (error) {
      console.log("Error sending form: ", error); //5
      setSubmissionError(
        "An error occurred while submitting your form details. Please try again." //6
      );
    } finally {
      setIsSubmitting(false); //Hide loading indicator
    }
  };

  return (
    // <form onSubmit={handleFormSubmit}>
    <div className="">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        <HeroSection
          imageUrl={`${mediaBaseUrl}/images/donate-image.jpg`}
          bottomRightWidget={false}
        />
        {/* Donate Now Text */}
        <div className="absolute inset-0 flex items-center justify-center ">
          <h1 className="slide-text text-4xl md:text-6xl font-bold text-white flex gap-2  whitespace-nowrap">
            Donate Now
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="">
        <div className="max-w-6xl mx-auto px-4 py-12 bg-sky-800">
          <div className="flex flex-col md:flex-row gap-8 py-12">
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
                              // Oncliking any amount button
                              onClick={() => {
                                console.log("Button Form Data", donateFormData);
                                // alert([selectedAmount, otherAmount]);
                                clearInput(); //Clear the input field
                                setSelectedAmount(amount.value); //set that buttons amount
                                // Set the value of the button into the form data
                                setDonateFormData((prev) => ({
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
                            ref={otherAmountInputRef}
                            onClick={useOtherAmount} //Enable otherAmount field
                            onInput={(e) => {
                              handleInputChange(e); //Call function to Handle input data
                            }}
                          />
                        </div>
                        <Button
                          className="w-full h-12 bg-sky-800 hover:bg-sky-700"
                          onClick={handleNext}
                          disabled={
                            !donateFormData.amount ||
                            (otherAmount &&
                              otherAmountInputRef.current.value === "")
                          }
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
                              onBlur={(e) =>
                                setEmailErrorMessage(handleEmailValidation(e))
                              }
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
                          {/* City */}
                          <div>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={FormData.city}
                              onChange={handleInputChange}
                              placeholder="City "
                              className="input-field"
                            />
                          </div>
                          {/* Country */}
                          <div>
                            <select
                              id="country"
                              name="country"
                              value={FormData.selectedCountry}
                              onChange={handleCountryChange}
                              className="input-field"
                              required
                            >
                              <option value="">Select a country *</option>
                              {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* PhoneNumber */}
                          <div className="flex md:w-1/2 w-full">
                            <div className=" w-1/8">
                              <select
                                id="phoneCode"
                                name="phoneCode"
                                value={selectedPhoneCode}
                                onChange={(e) => {
                                  const newPhoneCode = e.target.value;
                                  setSelectedPhoneCode(newPhoneCode);
                                  // console.log(selectedPhoneCode);
                                  setDonateFormData((prev) => ({
                                    ...prev,
                                    phoneCode: newPhoneCode, //Use the value gotten directly from the field (and not the updated state)to avoid logging older values, due to Reacts asynchronus state variables
                                  }));
                                }}
                                className="input-field"
                              >
                                <option value="">Code</option>
                                {countries.map((country) => (
                                  <option
                                    key={country.code}
                                    value={country.phoneCode}
                                  >
                                    {country.phoneCode}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="flex-1 mx-2">
                              <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={donateFormData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                                className="input-field"
                              />
                            </div>
                          </div>
                          {/* Newsletter */}
                          <div className="">
                            <Checkbox
                              id="newsletter"
                              checked={FormData.newsletter}
                              onCheckedChange={(checked) => {
                                setDonateFormData((prev) => ({
                                  ...prev,
                                  newsletter: checked,
                                }));
                              }}
                            />
                            <Label
                              htmlFor="newsletter"
                              className="mx-2 text-sm"
                            >
                              Receive updates/notifications about dbf
                            </Label>
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
                              !donateFormData.firstName ||
                              !donateFormData.lastName ||
                              !donateFormData.email ||
                              !donateFormData.country ||
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
                              donateFormData.paymentMethod === "card"
                            } ? "default" : "outline"`}
                            className={`w-full justify-center text-left h-auto p-4 bg-sky-800 hover:bg-sky-950 ${
                              donateFormData.paymentMethod === "card"
                                ? "bg-sky-600"
                                : ""
                            }`}
                            onClick={() => {
                              setDonateFormData((prev) => ({
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
                              donateFormData.paymentMethod === "transfer"
                            } ? "default" : "outline"`}
                            className={`w-full justify-center text-left h-auto p-4 bg-sky-800 hover:bg-sky-950 ${
                              donateFormData.paymentMethod === "transfer"
                                ? "bg-sky-600"
                                : ""
                            }`}
                            onClick={() => {
                              setDonateFormData((prev) => ({
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
                        {donateFormData.paymentMethod && (
                          <Card className="p-4 bg-white">
                            {donateFormData.paymentMethod === "transfer" ? (
                              <>
                                <h3 className="text-center text-sky-900 font-semibold mb-4">
                                  Bank Account Details
                                </h3>
                                <div className="space-y-4">
                                  {bankDetails.map((account, index) => (
                                    <div
                                      key={index}
                                      className="p-3 rounded-lg "
                                    >
                                      <p className="text-black text-lg font-medium">
                                        Bank: {account.bankName}
                                      </p>
                                      <div className="flex justify-start items-center space-x-2">
                                        <p className="text-black text-lg font-medium">
                                          Account Number:{" "}
                                          {account.accountNumber}
                                        </p>
                                        <Button
                                          variant="ghost"
                                          className="h-8 text-sky-800 hover:text-sky-100 hover:bg-sky-800"
                                          onClick={() => {
                                            handleCopy(
                                              index,
                                              account.accountNumber
                                            ); // Function to copy and display "Account Number copied"
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
                                      <p className="text-black text-lg font-medium">
                                        Account Name: {account.accountName}
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
                        <div className="flex flex-col gap-4">
                          <Button
                            variant="outline"
                            className="flex-1 h-12 text-white bg-sky-600"
                            onClick={(e) => {
                              handleSubmit(e);
                            }}
                            // Disable the button until transfer method is selected
                            disabled={
                              !(donateFormData.paymentMethod === "transfer") ||
                              isSubmitting
                            }
                          >
                            {/* I have made payment */}
                            {isSubmitting
                              ? "Processing..."
                              : "I have made payment"}
                          </Button>
                          {/* <Button
                            variant="outline"
                            className="flex-1 h-12 border-red-800 text-red-800"
                            // disabled={!donateFormData.paymentMethod}
                          >
                            Payment did not go through
                          </Button> */}
                          {submissionError && (
                            <div className="flex justify-center">
                              <p className="text-lg text-red-600 p-1 my-1">
                                {submissionError}
                              </p>
                            </div>
                          )}
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
                        </div>
                      </div>
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
      {/* Thank You message */}
      {showThankYou && (
        <ThankYouMessageOnFormSuccess
          showThankYou={showThankYou}
          // Sends a function to set show thank you back to false)
          closeThankYou={() => {
            setShowThankYou(false);
          }}
          message={"Thank you for your donation!"}
          extraMessage={"Your generosity helps us make a difference."}
        />
      )}
    </div>
    // </form>
  );
}
