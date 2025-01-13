import db from "@/firebase/firebaseConfig";
import addUserDocument from "@/firebase/createUser";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const handleFormSubmit = async ({
  // Standard parameters (All pages)
  e,
  formType,
  formData,
  yourCollection,
  userRole,
  setSubmissionError,
  setIsSubmitting,
  setShowThankYou,
  resetFormData,
  //   Conditional parameters (Depends on the page)
  closeForm,
  reRoutePage,
}) => {
  e.preventDefault(); // Prevent default form reloading
  setIsSubmitting(true); // Show loading indicator
  setSubmissionError(""); // Reset error state

  try {
    // Send a POST request to the API with the form data
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType, formData }),
    });

    if (!response.ok) {
      console.error("Failed to send email:", response.error);
      setSubmissionError("Failed to send email. Please try again.");
      return;
    }

    // Add data to Firestore
    const collectionRef = collection(db, `${yourCollection}`); // Update with your collection name
    await addDoc(collectionRef, formData);

    // Add the user document (if applicable)
    await addUserDocument({ ...formData, roles: [`${userRole}`] });

    // Reset form data
    resetFormData();

    // close the form
    if (closeForm) {
      closeForm();
    }

    // Show Thank You message
    setShowThankYou(true);

    // Redirect after a delay (Mainly for Donations Page)
    if (reRoutePage) {
      setTimeout(() => {
        reRoutePage();
      }, 3000);
    }
  } catch (error) {
    console.error("Error handling form submission:", error);
    setSubmissionError(
      "An error occurred while submitting your form details. Please try again."
    );
  } finally {
    setIsSubmitting(false); // Hide loading indicator
  }
};
