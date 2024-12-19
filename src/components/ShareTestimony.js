import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import db from "@/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FaLessThan } from "react-icons/fa6";

export default function ShareTestimony({ clickCloseForm, closeForm }) {
  const [testimonial, setTestimonial] = useState("");
  const [showThankYou, setShowThankYou] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTestimonyForm, setShowTestimonyForm] = useState(true);
  const [testimonyData, setTestimonyData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    testimonial: "",
    type: "text",
    approved: false,
    date: serverTimestamp(),
  });

  // set form data from user inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the field that triggered the input
    setEmailErrorMessage(false); // allow user type, without constant error message
    setTestimonyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Email validation with a regex
  const handleEmailValidation = (e) => {
    const { name, value } = e.target;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (name === "email") {
      if (!emailPattern.test(value)) {
        setEmailErrorMessage(true);
      }
    }
  };

  // Handles form submission on clicking share button
  const handleTestimonialFormSubmit = async (e) => {
    e.preventDefault(); //Prevent default form reloading
    setIsSubmitting(true); // Show loading indicator
    setSubmissionError(""); // Reset error state

    try {
      // Get the mailed data
      const response = await fetch("api/sendEmail", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(testimonyData),
      });

      // If the mail did not send succesfully
      if (!response.ok) {
        setSubmissionError("Failed to send email. Please try again.");
        console.log(response);
        console.error("Email Error:", errorMessage);
        return;
      }

      // Add to firestore
      const collectionRef = collection(db, "Testimonials"); //get the testimonial collection
      const docRef = await addDoc(collectionRef, testimonyData); //add a new document to the collection

      // Upon form submission and mail success
      setShowTestimonyForm(false); // Remove form display

      setShowThankYou(true); // Show thank you message

      // Set a timeout for thank you message and close the form in the parent page
      setTimeout(() => {
        setShowThankYou(false);
        closeForm();
      }, 3000);

      // Reset Testimony data.
      setTestimonyData({
        firstName: "",
        lastName: "",
        email: "",
        occupation: "",
        testimonial: "",
        type: "text",
        approved: false,
        date: serverTimestamp(),
      });
    } catch (error) {
      console.log("Error adding testimony: ", error);
      setSubmissionError(
        "An error occurred while submitting your testimony. Please try again."
      );
    } finally {
      setIsSubmitting(false); //Hide loading indicator
    }
  };
  const maxLength = 300; // Set the character limit

  const formDataRefs = useRef({}); // Create a single ref object

  return (
    <div>
      {showTestimonyForm && (
        <Card>
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div
              ref={clickCloseForm}
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg text-center"
            >
              <form
                onSubmit={handleTestimonialFormSubmit}
                className="w-full max-w-md mx-auto"
              >
                <h2 className="text-2xl font-bold mb-4">
                  Fill Testimonial Below
                </h2>
                <div className="p-2">
                  <div className="flex flex-col space-y-6">
                    {/* Form Input Fields  */}
                    <div className="flex flex-row gap-4">
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

                    {/* Occupation Field */}
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
                      onBlur={handleEmailValidation}
                    ></input>
                    {emailErrorMessage && (
                      <div>
                        <p className="text-red-500 text-md mt-2">
                          Please enter a valid email address{" "}
                          <p>e.g example@domain.com</p>
                        </p>
                      </div>
                    )}

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
                      placeholder={`Write your testimonial here... \n(Maximum of 250 characters)`}
                      required
                      className="input-field h-48"
                      onInput={(e) => setTestimonial(e.target.value)}
                      onChange={handleInputChange}
                    ></textarea>

                    {/* Testimonial Character Count */}
                    <p className="text-sm text-gray-500 mb-4">
                      {testimonial.length}/{maxLength} characters used
                    </p>
                    <Button
                      onClick={handleTestimonialFormSubmit}
                      disabled={
                        !formDataRefs.current.firstName?.value ||
                        !formDataRefs.current.lastName?.value ||
                        !formDataRefs.current.email?.value ||
                        !formDataRefs.current.occupation?.value ||
                        !formDataRefs.current.testimonial?.value ||
                        emailErrorMessage ||
                        isSubmitting
                      }
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>

                    {submissionError && (
                      <p className="text-lg text-red-600 p-1 my-1">
                        {submissionError}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Card>
      )}
      {showThankYou && (
        <Card>
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div
              // ref={closeForm}
              className=" bg-sky-500 rounded-lg p-6 w-full max-w-md shadow-lg text-center"
            >
              <h2 className="text-lg font-semibold">
                Thank you for sharing your Testimony with us. It will be
                reviewed by our team!
              </h2>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
