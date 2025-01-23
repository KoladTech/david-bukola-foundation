"use client";
import db from "@/firebase/firebaseConfig";
import addUserDocument from "@/firebase/createUser";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import handleEmailValidation from "@/lib/emailVerification";
import { handleFormSubmit } from "@/firebase/handleFormSubmission";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const typingTimeoutRef = useRef(null); // Persistent reference for timeout

  // Handles getting data from input fields and populating the donateFormData
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setIsTyping(true);

    // Clear any existing timeout
    // Clear the existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a timeout to validate the email after a delay
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false); // User has stopped typing
      //   Email is vallid
      if (!handleEmailValidation(e)) {
        setEmailValid(true);
        setEmailErrorMessage(false);
      } // If inputfield is empty, remove error message
      else if (e.target.value == "") {
        setEmailErrorMessage(false);
        setEmailValid(false);
      }
      //   email is not valid
      else {
        setEmailValid(false);
        setEmailErrorMessage(true);
      }

      // Clear the timeout reference
      typingTimeoutRef.current = null;
    }, 1500);
  };

  // Cleanup timeout on component unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Function that handles submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "newsletterForm",
          formData: { email },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Failed to send email:",
          errorData.message || "Unknown Error"
        );
        // setSubmissionError("Failed to send email. Please try again.");
        return;
      }

      // Add the user document (if applicable)
      await addUserDocument({
        firstName: "N/A",
        lastName: "N/A",
        email,
        newsletter: true,
        roles: ["subscriber"],
      });

      // Add your newsletter subscription logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        variant: "success",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-600 mb-8">
          Get weekly updates on our activities
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
        >
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              // onBlur={(e) => setEmailErrorMessage(handleEmailValidation(e))}
              required
              className="flex-grow md:min-w-[450px]"
            />
            {!isTyping && emailErrorMessage && (
              <div>
                <p className="text-red-500 text-md mt-2">
                  Please enter a valid email address{" "}
                  <p>e.g example@domain.com</p>
                </p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8"
            disabled={isLoading || !emailValid || emailErrorMessage}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
      <Toaster />
    </section>
  );
}
