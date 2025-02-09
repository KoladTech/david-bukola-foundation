"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mediaBaseUrl } from "@/lib/constants";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { serverTimestamp } from "firebase/firestore";
import LoadingSpinner from "@/components/loadingSpinner";
import { fetchedData } from "@/lib/firebase/fetchFirebaseData";
import ThankYouMessageOnFormSuccess from "@/components/ThankYouMessageOnFormSuccess";

const daysOfWeek = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

export default function Page() {
  let content = `Make a lasting impact by volunteering with DavidBukola Development Foundation. We believe that everyone has unique skills and talents to contribute, and your time and effort can bring positive change to countless lives. Whether you're passionate about community outreach, event support, or lending a helping hand where it's needed most, your involvement matters.

Together, we can create meaningful change. Join our team of dedicated volunteers and start making a difference today!
`;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interests: [],
    availableDays: [],
    comments: "",
    status: "pending",
    newsletter: false,
    date: serverTimestamp(),
  });

  const [isInterestsOpen, setIsInterestsOpen] = useState(false);
  const [isDaysOpen, setIsDaysOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        // Get the fetched data
        const fetchedActivities = await fetchedData("Activities");

        // Set the fetched data
        setActivities(fetchedActivities);

        // log error if failed
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadActivities();
  }, []);

  // Handles form fields input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Populate the interests array in the formData
  const toggleInterest = (value) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value],
    }));
  };

  // Populate the days array in the formData
  const toggleDay = (value) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(value)
        ? prev.availableDays.filter((d) => d !== value)
        : [...prev.availableDays, value],
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // all the errors
  const newErrors = {};
  // validate the form fields
  const validateForm = () => {
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "A valid Nigerian phone number is required.";
    }

    if (formData.interests.length === 0) {
      newErrors.interests = "Please select at least one volunteer opportunity.";
    }

    if (formData.availableDays.length === 0) {
      newErrors.availableDays = "Please select at least one available day";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      try {
        // Send a POST request to the api with volunteer data object as payload
        const response = await fetch("api/submitForm", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            formType: "volunteerForm",
            formData: formData,
          }),
        });

        const data = await response.json(); // get the response as json

        // If the mail did not send successfully
        if (!response.ok) {
          // various types of errors will be handled here
          if (data.error === "Validation Error") {
            data.details.forEach((issue) => {
              newErrors[issue.field] = issue.message;
            });
          }
        }
        // Call a success function
        setShowThankYou(true); // Show thank you message

        // Set a timeout for thank you message
        setTimeout(() => {
          setShowThankYou(false);
        }, 3000);
      } catch (error) {
        console.error("Error adding volunteer: ", error);
      } finally {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          interests: [],
          availableDays: [],
          comments: "",
          status: "pending",
          newsletter: false,
          date: serverTimestamp(),
        });
        setSubmitting(false); //Hide loading indicator
      }
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      // setFormData({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   phone: "",
      //   interests: [],
      //   availableDays: [],
      //   comments: "",
      //   newsletter: false,
      //   date: serverTimestamp(),
      // });
      // setSubmitting(false);
    }
  };

  const renderPills = (options, selectedValues, toggleFunction) => {
    return selectedValues.map((value) => {
      const option = options.find((o) => o.value === value); // find the value of every option
      return (
        //return a blue pill representing a selected value
        <span
          key={value}
          className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
        >
          {option.label}
          <button
            type="button"
            onClick={() => toggleFunction(value)}
            className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            <X size={14} />
          </button>
        </span>
      );
    });
  };

  return (
    <div className="mb-20">
      <div className="flex flex-col mb-10">
        <HeroSection
          className="object-[50%_75%]"
          title="Volunteer"
          description=""
          imageUrl={`${mediaBaseUrl}/images/dbf-volunteer-herosection-image.jpg`}
          alt="Get Involved image"
        />
      </div>
      {/* Content Sections */}
      <div className="content-div p-4 mb-20">
        <div className="mb-16">
          {/* <ContentCard content={content} /> */}
          <p className="text-lg text-gray-600 mx-auto">
            Join us in making a difference. At DavidBukola Development
            Foundation, we believe everyone has the power to bring positive
            change. Whether you are looking to donate, volunteer, explore a
            meaningful career or participate in our events, there are countless
            ways to support our mission. Together, we can make a world of
            difference. Get involved today!
          </p>
        </div>

        <div className="flex flex-col">
          {/* Form section */}
          <Card
            className={`shadow-md ${
              submitting && "blur-sm" //blurs the form while submitting
            } transition duration-300`}
          >
            {submitting && ( //displays loading spinner in the center while submitting
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                <LoadingSpinner />
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-2xl">Volunteer Form</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> We currently only accept volunteers
                  located in Nigeria.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* First Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Label className="text-gray-600" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={(e) => {
                      //TODO: convert this to function???
                      //check if the value in the form is a valid email
                      if (!validateEmail(e.target.value)) {
                        setErrors({
                          ...errors,
                          email: "Please enter a valid email", //set an error for invalid emails
                        });
                      } else {
                        const { email, ...restErrors } = errors;
                        setErrors(restErrors); //set the original state of the error without the email error
                      }
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  {/* Phone Number Input */}
                  <Label htmlFor="phone">Phone Number*</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  {/* Volunteer Interests */}
                  <Label>Volunteer opportunities you're interested in</Label>
                  {errors.interests && (
                    <p className="text-red-500 text-sm">{errors.interests}</p>
                  )}
                  <div className="relative">
                    <div className="flex items-center p-2 border rounded-md">
                      <Collapsible
                        open={isInterestsOpen}
                        onOpenChange={setIsInterestsOpen}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            {formData.interests.length === 0
                              ? "Select opportunities"
                              : "Add more"}
                            <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="absolute z-10 w-full left-0 bg-white border rounded-md mt-1 p-2 shadow-lg">
                          {loading ? (
                            <LoadingSpinner />
                          ) : (
                            activities.map(
                              (
                                option //maps all the activities as checkboxes
                              ) => (
                                <div
                                  key={option.value}
                                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                                >
                                  <Checkbox //checkbox with each activity
                                    id={option.value}
                                    checked={formData.interests.includes(
                                      option.value
                                    )}
                                    onCheckedChange={() =>
                                      toggleInterest(option.value)
                                    }
                                  />
                                  <Label htmlFor={option.value}>
                                    {option.label}
                                  </Label>
                                </div>
                              )
                            )
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                      {/* renders all the selected activities as pills */}
                      <div className="flex flex-wrap gap-2 ml-2">
                        {renderPills(
                          activities,
                          formData.interests,
                          toggleInterest
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Days Available */}
                <div className="space-y-2">
                  <Label>Available Days</Label>
                  {errors.availableDays && (
                    <p className="text-red-500 text-sm">
                      {errors.availableDays}
                    </p>
                  )}
                  <div className="relative">
                    <div className="flex items-center p-2 border rounded-md">
                      <Collapsible
                        open={isDaysOpen}
                        onOpenChange={setIsDaysOpen}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            {formData.availableDays.length === 0
                              ? "Select days"
                              : "Add more"}
                            <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="absolute z-10 w-full left-0 bg-white border rounded-md mt-1 p-2 shadow-lg">
                          {daysOfWeek.map(
                            (
                              day //maps all the days of the week as selectable options in the dropdown
                            ) => (
                              <div
                                key={day.value}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                              >
                                <Checkbox // checkbox with each day
                                  id={day.value}
                                  checked={formData.availableDays.includes(
                                    day.value
                                  )}
                                  onCheckedChange={() => toggleDay(day.value)}
                                />
                                <Label htmlFor={day.value}>{day.label}</Label>
                              </div>
                            )
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                      <div className="flex flex-wrap gap-2 ml-2">
                        {/* renders all the selected activities as pills */}
                        {renderPills(
                          daysOfWeek,
                          formData.availableDays,
                          toggleDay
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Comments */}
                <div className="space-y-2">
                  <Label htmlFor="comments">Additional Comments (If any)</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows={4}
                    className="focus-visible:ring-blue-500"
                  />
                </div>

                {/* Receive newsletter checkbox */}
                <div className="flex items-center space-x-2 relative">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        newsletter: checked,
                      }))
                    }
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Receive updates/notifications about dbf
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.phone ||
                    !formData.email ||
                    !formData.availableDays.length ||
                    !formData.interests.length ||
                    !validateEmail(formData.email) ||
                    submitting
                  }
                  className="w-full bg-blue-500 hover:bg-blue-700"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {showThankYou && ( //Thank you Card after submission
        <ThankYouMessageOnFormSuccess
          showThankYou={showThankYou}
          // Sends a function to set show thank you back to false)
          closeThankYou={() => {
            setShowThankYou(false);
          }}
          message={"Thank you for volunteering!"}
          extraMessage={"Your support helps us make a difference."}
        />
      )}
    </div>
  );
}
