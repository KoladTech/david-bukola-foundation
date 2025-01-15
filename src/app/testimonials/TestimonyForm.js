import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import db from "@/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import handleEmailValidation from "@/lib/emailVerification";
import addUserDocument from "@/firebase/createUser";
import { handleFormSubmit } from "@/firebase/handleFormSubmission";
import React from "react";

export default function TestimonyForm({
  clickCloseForm,
  closeForm,
  setShowThankYou,
}) {
  const [testimonial, setTestimonial] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonyData, setTestimonyData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    testimonial: "",
    type: "text",
    newsletter: false,
    approved: false,
    date: serverTimestamp(),
  });

  const maxLength = 300; // Set the character limit

  const formDataRefs = useRef({}); // Create a single ref object

  // Function to set form data from user inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the field that triggered the input
    if (name === "email") {
      setEmailErrorMessage(false); // allow user type, without constant error message
      // If email is valid
      if (!handleEmailValidation(e)) {
        setEmailValid(true);
        setEmailErrorMessage(false);
      } else setEmailValid(false);
    }
    // Populate testimony form
    setTestimonyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Reset Testimony data.
  const resetFormData = () => {
    setTestimonyData({
      firstName: "",
      lastName: "",
      email: "",
      occupation: "",
      testimonial: "",
      type: "text",
      newsletter: false,
      approved: false,
      date: serverTimestamp(),
    });
  };

  // Handles form submission on clicking share button
  const handleSubmit = (e) => {
    handleFormSubmit({
      e,
      formType: "testimonyForm",
      formData: testimonyData,
      yourCollection: "Testimonials",
      userRole: "testifier",
      closeForm,
      setShowThankYou,
      setSubmissionError,
      setIsSubmitting,
      resetFormData,
    });
  };

  return (
    <div>
      <Card>
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div
            ref={clickCloseForm}
            className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-lg text-center"
          >
            <form
              // onSubmit={handleTestimonialFormSubmit}
              className="w-full max-w-md mx-auto"
            >
              <h2 className="text-2xl font-bold mb-4">
                Fill Testimonial Below
                <button
                  onClick={closeForm}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
                >
                  <X size={24} />
                </button>
              </h2>
              <div className="p-2">
                <div className="flex flex-col space-y-6">
                  {/* Form Input Fields  */}
                  <div className="flex flex-row gap-4">
                    {/* First Name */}
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={testimonyData.firstName}
                      placeholder="First Name *"
                      ref={(el) => (formDataRefs.current.firstName = el)}
                      required
                      className="input-field"
                      onChange={handleInputChange}
                    ></input>
                    {/* Last Name */}
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={testimonyData.lastName}
                      ref={(el) => (formDataRefs.current.lastName = el)}
                      placeholder="Last Name *"
                      required
                      className="input-field"
                      onChange={handleInputChange}
                    ></input>
                  </div>

                  {/* Email Field */}
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={testimonyData.email}
                    ref={(el) => (formDataRefs.current.email = el)}
                    placeholder="Email *"
                    required
                    className="input-field"
                    onChange={handleInputChange}
                    onBlur={(e) =>
                      setEmailErrorMessage(handleEmailValidation(e))
                    } // Use arrow function so you can pass the event as a parameter
                  ></input>
                  {emailErrorMessage && (
                    <div>
                      <p className="text-red-500 text-md mt-2">
                        Please enter a valid email address{" "}
                        <p>e.g example@domain.com</p>
                      </p>
                    </div>
                  )}
                  {/* Occupation Field */}
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={testimonyData.occupation}
                    ref={(el) => (formDataRefs.current.occupation = el)}
                    placeholder="Occupation *"
                    required
                    className="input-field"
                    onChange={handleInputChange}
                  ></input>

                  {/* Testimonial TextArea */}
                  <textarea
                    id="testimonial"
                    name="testimonial"
                    maxLength={maxLength}
                    value={testimonyData.testimony}
                    ref={(el) => (formDataRefs.current.testimonial = el)}
                    placeholder={`Write your testimonial here... \n(Maximum of 300 characters)`}
                    required
                    className="input-field h-48"
                    onInput={(e) => setTestimonial(e.target.value)}
                    onChange={handleInputChange}
                  ></textarea>

                  {/* Testimonial Character Count */}
                  <p className="text-sm text-gray-500 mb-4">
                    {testimonial.length}/{maxLength} characters used
                  </p>
                  {/* Newsletter */}
                  <div className="">
                    <Checkbox
                      id="newsletter"
                      checked={testimonyData.newsletter}
                      onCheckedChange={(checked) => {
                        setTestimonyData((prev) => ({
                          ...prev,
                          newsletter: checked,
                        }));
                      }}
                    />
                    <Label htmlFor="newsletter" className="mx-2 text-sm">
                      Receive updates/notifications about dbf
                    </Label>
                  </div>
                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !formDataRefs.current.firstName?.value ||
                      !formDataRefs.current.lastName?.value ||
                      !formDataRefs.current.email?.value ||
                      !emailValid ||
                      !formDataRefs.current.occupation?.value ||
                      !formDataRefs.current.testimonial?.value ||
                      emailErrorMessage ||
                      isSubmitting
                    }
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>

                  {submissionError && (
                    <div className="flex justify-center">
                      <p className="text-lg text-red-600 p-1 my-1">
                        {submissionError}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}
