"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LoadingSpinner from "@/components/loadingSpinner";
import { X } from "lucide-react";

export default function VolunteerForm({ onClose, event, closeForm, thankYou }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
    event_name: event.title,
    event_id: event.id,
    status: "pending",
    newsletter: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
      newErrors.phone = "Phone number is required.";
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
        const response = await fetch("api/submitForm", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            formType: "eventVolunteerForm",
            formData: formData,
          }),
        });

        const data = await response.json(); // get the response as json

        // If the mail did not send successfully
        if (!response.ok) {
          if (data.error === "Validation Error") {
            data.details.forEach((issue) => {
              newErrors[issue.field] = issue.message;
            });
          }
          // various types of errors will be handled here
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
          comments: "",
          event_name: event.title,
          event_id: event.id,
          status: "pending",
          newsletter: false,
        });
        setSubmitting(false); //Hide loading indicator
      }

      onClose();
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <Card className="relative h-auto max-w-md shadow-md transition duration-300">
        <div ref={closeForm}>
          <CardHeader className="border">
            <CardTitle className="text-lg font-bold sm:text-2xl">
              Volunteer for {event.title}
            </CardTitle>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
            >
              <X size={24} />
            </button>
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
                  !formData.lastName ||
                  !formData.phone ||
                  !formData.email ||
                  !validateEmail(formData.email) ||
                  submitting
                }
                className="w-full bg-blue-500 hover:bg-blue-700"
              >
                {submitting ? <LoadingSpinner size="sm" /> : "Submit"}
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
