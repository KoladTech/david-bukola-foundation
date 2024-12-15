import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef, useState } from "react";
import db from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function ShareTestimony({ closeForm }) {
  const [testimonial, setTestimonial] = useState("");
  const [showThankYou, setShowThankYou] = useState("");
  // const [showTestimonyForm, setShowTestimonyForm] = useState(true);
  const [testimonyData, setTestimonyData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    testimony: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTestimonialFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const collectionRef = collection(db, "testimonials"); //get the testimonial collection
      await addDoc(collectionRef, testimonyData);
      alert("Thank You for your testimony! It will be approved soon");

      // Reset Testimony data.
      setTestimonyData({
        firstName: "",
        lastName: "",
        designation: "",
        testimony: "",
      });
    } catch (error) {
      console.log("Error adding testimony: ", error);
      alert("Something went wrong please try again.");
    } finally {
      setShowThankYou(true);
      setTimeout(() => {
        setShowTestimonyForm(false);
        setShowThankYou(false);
      }, 2000);
      setShowTestimonyForm(true);
    }
  };
  const maxLength = 250; // Set the character limit
  // Create a single ref object
  const formDataRefs = useRef({});

  return (
    <div>
      {true && (
        <Card>
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div
              ref={closeForm}
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
                      {/* <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={testimonyData.lastName}
                        placeholder="Last Name (Optional)"
                        className="input-field"
                        onChange={handleInputChange}
                      ></input> */}
                    </div>

                    {/* Designation Field */}
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={testimonyData.designation}
                      placeholder="Designation (Tell us what you do)"
                      className="input-field"
                      onChange={handleInputChange}
                    ></input>

                    {/* Testimonial TextArea */}
                    <textArea
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
                    ></textArea>

                    {/* Testimonial Character Count */}
                    <p className="text-sm text-gray-500 mb-4">
                      {testimonial.length}/{maxLength} characters used
                    </p>
                    <Button
                      onClick={handleTestimonialFormSubmit}
                      disabled={
                        !formDataRefs.current.firstName?.value ||
                        !formDataRefs.current.testimonial?.value
                      }
                    >
                      Share
                    </Button>
                  </div>
                  {showThankYou && (
                    <div>
                      <h2 className="text-lg font-semibold">
                        Thank you for sharing your Testimony with us. It will be
                        reviewed and approved soon
                      </h2>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
