import { z } from "zod";
// Note: `date` is excluded in these schema's because it's handled by Firebase on the server side
// I am honestly thinking phone number should go except for volunteers, or at least made optional
// Validating phone number poses a problem for different countries because not every country might use the same phone number format

export const userFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  // phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  roles: z.array(z.string()).min(1, "At least one role is required"),
  newsletter: z.boolean().default(false),
});

export const volunteerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone Number is required")
    .regex(
      /^(0)?[7-9][0-1]\d{8}$/,
      "Please enter a valid Nigerian Phone Number"
    ),
  //   phone: z.string().min(1, "Phone Number is required"),
  interests: z.array(z.string()).min(1, "At least one interest is required"),
  availableDays: z.array(z.string()).min(1, "At least one day is required"),
  comments: z.string().optional(),
  status: z.string().default("pending"),
  newsletter: z.boolean().default(false),
});

export const eventVolunteerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone Number is required")
    .regex(
      /^(0)?[7-9][0-1]\d{8}$/,
      "Please enter a valid Nigerian Phone Number"
    ),
  event_name: z.string().min(1, "Event name is required"),
  event_id: z.string().min(1, "Event ID is required"),
});

export const anonymousDonationFormSchema = z.object({
  paymentMethod: z.string().min(1, "Payment method is required"),
  amount: z.number().min(1, "Amount must be at least 1"),
  country: z.string().min(1, "Country is required"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().default("Anonymous"), // Default value
  lastName: z.string().default("Anonymous"), // Default value
});

export const donationFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  amount: z.number().min(1, "Amount must be at least 1"),
  country: z.string().min(1, "Country is required"),
});

export const testimonyFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  occupation: z.string().min(1, "Occupation is required"),
  testimonial: z.string().min(1, "Testimonial is required"),
});

export const newsletterFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().default("Newsletter Subscriber"), // Default value
  lastName: z.string().default(""), // Default value
});
