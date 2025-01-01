"use client";

import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ContentCard from "@/components/ContentCard";
import { ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "@/firebase/firebaseConfig";
import LoadingSpinner from "@/components/loadingSpinner";

const volunteerOptions = [
  { value: "orphanage-visits", label: "Orphanage Visits" },
  { value: "food-drives", label: "Food Drives" },
  { value: "community-cleanups", label: "Community Cleanups" },
  { value: "education-support", label: "Education Support" },
  { value: "medical-outreach", label: "Medical Outreach" },
];

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
  let content = `Join us in making a difference. At DavidBukola Development Foundation, we believe everyone has the power to bring positive change. Whether you are looking to donate, volunteer, explore a meaningful career or participate in our events, there are countless ways to support our mission. 
Together, we can make a world of difference. Get involved today!
`;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interests: [],
    availableDays: [],
    comments: "",
    newsletter: false,
    date: serverTimestamp(),
  });

  const [isInterestsOpen, setIsInterestsOpen] = useState(false);
  const [isDaysOpen, setIsDaysOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(true);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleInterest = (value) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value],
    }));
  };

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

  // validate the form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
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
        // Send a POST request to the api with testimony data object as payload
        const response = await fetch("api/newVolunteerEmail", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        // If the mail did not send succesfully
        if (!response.ok) {
          console.log("Error while sending email");
          return;
        }

        // Add to firestore
        const collectionRef = collection(db, "Volunteers"); //get the testimonial collection
        const docRef = await addDoc(collectionRef, formData); //add a new document to the collection
        // check for existence of that volunteer
        // Call a success function
      } catch (error) {
        console.log("Error adding volunteer: ", error);
      } finally {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          interests: [],
          availableDays: [],
          comments: "",
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
      const option = options.find((o) => o.value === value);
      return (
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
    <div className="container mx-auto p-4 py-12 mb-10">
      <div className="mx-auto">
        <div className="flex flex-col">
          <HeroSection
            className=""
            title="Volunteer"
            description=""
            imageUrl="/images/get_involved_hero_section_image.jpeg"
            alt="Get Involved image"
          />
        </div>
        {/* Content Sections */}
        <div className="flex flex-col space-y-10 mb-28">
          <div>
            <ContentCard content={content} />
          </div>
        </div>

        <Card
          className={`shadow-md ${
            submitting && "blur-sm"
          } transition duration-300`}
        >
          {submitting && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
              <LoadingSpinner />
            </div>
          )}

          <CardHeader>
            <CardTitle className="text-2xl">Volunteer Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
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
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          {formData.interests.length === 0
                            ? "Select opportunities"
                            : "Add more"}
                          <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="absolute z-10 w-full left-0 bg-white border rounded-md mt-1 p-2 shadow-lg">
                        {volunteerOptions.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                          >
                            <Checkbox
                              id={option.value}
                              checked={formData.interests.includes(
                                option.value
                              )}
                              onCheckedChange={() =>
                                toggleInterest(option.value)
                              }
                            />
                            <Label htmlFor={option.value}>{option.label}</Label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                    <div className="flex flex-wrap gap-2 ml-2">
                      {renderPills(
                        volunteerOptions,
                        formData.interests,
                        toggleInterest
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Available Days</Label>
                {errors.availableDays && (
                  <p className="text-red-500 text-sm">{errors.availableDays}</p>
                )}
                <div className="relative">
                  <div className="flex items-center p-2 border rounded-md">
                    <Collapsible open={isDaysOpen} onOpenChange={setIsDaysOpen}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          {formData.availableDays.length === 0
                            ? "Select days"
                            : "Add more"}
                          <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="absolute z-10 w-full left-0 bg-white border rounded-md mt-1 p-2 shadow-lg">
                        {daysOfWeek.map((day) => (
                          <div
                            key={day.value}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                          >
                            <Checkbox
                              id={day.value}
                              checked={formData.availableDays.includes(
                                day.value
                              )}
                              onCheckedChange={() => toggleDay(day.value)}
                            />
                            <Label htmlFor={day.value}>{day.label}</Label>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                    <div className="flex flex-wrap gap-2 ml-2">
                      {renderPills(
                        daysOfWeek,
                        formData.availableDays,
                        toggleDay
                      )}
                    </div>
                  </div>
                </div>
              </div>

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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, newsletter: checked }))
                  }
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Receive updates/notifications about dbf
                </Label>
              </div>

              <Button
                type="submit"
                disabled={
                  !formData.firstName ||
                  !formData.phone ||
                  !formData.email ||
                  !formData.availableDays.length ||
                  !formData.interests.length ||
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
  );
}
