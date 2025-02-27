import admin from "@/lib/firebase/firebaseAdmin";
import nodemailer from "nodemailer";
import { formatObjectKeyToTitle } from "@/lib/utils";
import {
  volunteerFormSchema,
  eventVolunteerFormSchema,
  anonymousDonationFormSchema,
  donationFormSchema,
  testimonyFormSchema,
  newsletterFormSchema,
} from "./formSchema";

// Define form configurations
const formConfig = {
  volunteerForm: {
    collection: "Volunteers",
    schema: volunteerFormSchema,
    role: "volunteer",
  },
  eventVolunteerForm: {
    collection: "Volunteers",
    schema: eventVolunteerFormSchema,
    role: "eventVolunteer",
  },
  anonymousDonationForm: {
    collection: "Donations",
    schema: anonymousDonationFormSchema,
    role: "donor",
  },
  donationForm: {
    collection: "Donations",
    schema: donationFormSchema,
    role: "donor",
  },
  testimonyForm: {
    collection: "Testimonials",
    schema: testimonyFormSchema,
    role: "testifier",
  },
  newsletterForm: {
    collection: "Users",
    schema: newsletterFormSchema,
  },
};

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
    pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
  },
});

export async function POST(req) {
  try {
    const firestore = admin.firestore();
    const { formType, formData } = await req.json();

    // Validate form type and data
    if (!formType || !formData) {
      return new Response(
        JSON.stringify({ message: "Form type and data are required" }),
        { status: 400 }
      );
    }

    const formConfigEntry = formConfig[formType];

    if (!formConfigEntry) {
      return new Response(
        JSON.stringify({
          error: "Invalid form type provided",
          message: "Invalid form type provided",
        }),
        { status: 400 }
      );
    }

    // Validate required fields
    // const missingFields = validationRules.filter((field) => !formData[field]);
    // if (missingFields.length > 0) {
    //   return new Response(
    //     JSON.stringify({
    //       message: `Missing required fields: ${missingFields.join(", ")}`,
    //     }),
    //     { status: 400 }
    //   );
    // }
    const validatedData = formConfigEntry.schema.parse(formData);

    // Check if email exists in the database
    const usersRef = firestore.collection("Users");
    // const usersRef = firestore.collection("TestCollection");
    const snapshot = await usersRef
      .where("email", "==", validatedData.email)
      .get();

    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   phone,
    //   newsletter,
    //   ...remainingFormData
    // } = validatedData;

    const { newsletter, email, ...remainingFormData } = validatedData;
    // initialize a userId variable to be added to the form type
    let userId;

    if (!snapshot.empty) {
      // Email already exists
      const userDoc = snapshot.docs[0];
      userId = userDoc.id;

      // Check if the user already has the incoming role
      // donors, volunteers, testimonials, will ideally want to donate more than once.
      // People can donate multiple times to the same event if they want, and even testify
      // since testimonials have to be approved but they ideally can't volunteer more than
      // once for the same event, or as a general volunteer

      if (formConfigEntry.role === "volunteer") {
        return new Response(
          JSON.stringify({
            error: "User already has this role",
            message: `You are already registered as a ${formConfigEntry.role}`,
          }),
          { status: 400 }
        );
      } else if (formConfigEntry.role === "eventVolunteer") {
        const volunteersRef = firestore.collection("Volunteers");
        const volunteerSnapshot = await volunteersRef
          .where("eventId", "==", validatedData.eventId)
          .get();
        if (!volunteerSnapshot.empty) {
          return new Response(
            JSON.stringify({
              error: "User already has this role",
              message: `You are already registered as a volunteer for this event!`,
            }),
            { status: 400 }
          );
        }
      }

      //This is commented out for now because only emails will be added to the users collection
      //   if (userData.roles && userData.roles.includes(formConfigEntry.role)) {
      //     return new Response(
      //       JSON.stringify({
      //         error: "User already has this role",
      //         message: `You are already registered as a ${formConfigEntry.role}`,
      //       }),
      //       { status: 400 }
      //     );
      //   } else {
      //     // Add the new role to the user
      //     await userDoc.ref.update({
      //       roles: admin.firestore.FieldValue.arrayUnion(formConfigEntry.role),
      //     });
      //   }
    } else {
      // Create a new user
      const userDocRef = await usersRef.add({
        email,
        date: admin.firestore.FieldValue.serverTimestamp(),
        newsletter,
        // firstName,
        // lastName,
        // phone,
        // roles: [formConfigEntry.role],
      });
      userId = userDocRef.id;
    }

    // Add form data to the appropriate collection
    // const collectionRef = firestore.collection("TestCollection");
    const collectionRef = firestore.collection(formConfigEntry.collection);
    await collectionRef.add({
      // firstName,
      // lastName,
      // phone,
      userId,
      email,
      date: admin.firestore.FieldValue.serverTimestamp(),
      ...remainingFormData,
    });

    // Send email notification
    const emailSubject = `New ${formatObjectKeyToTitle(formType)} Submission`;
    const emailBody = `
      <html>
        <body>
          <h2>${formatObjectKeyToTitle(formType)} Submission</h2>
          <ul>
            ${Object.entries(formData)
              .filter(
                ([key, value]) =>
                  !(value && value._methodName === "serverTimestamp")
              )
              .map(
                ([key, value]) => `
                <li>
                  <strong>${formatObjectKeyToTitle(key)}:</strong>
                  ${Array.isArray(value) ? value.join(", ") : value}
                </li>
              `
              )
              .join("")}
          </ul>
        </body>
      </html>
    `;

    const mailOptions = {
      from: `"${formData.firstName || "Anonymous"}" <${formData.email}>`,
      to: process.env.NEXT_PUBLIC_FOUNDATION_EMAIL,
      subject: emailSubject,
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);

    // Return success response
    return new Response(
      JSON.stringify({ message: "Form submitted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error processing form submission:", error);

    // Handle Zod validation errors
    if (error.name === "ZodError") {
      return new Response(
        JSON.stringify({
          error: "Validation Error",
          message: "Invalid form data",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."), // Field path (e.g., "phone")
            message: issue.message, // Error message (e.g., "Please enter a valid Nigerian Phone Number") - You can set specific errors in the schema
            code: issue.code, // Error code (e.g., "invalid_string")
          })),
        }),
        { status: 400 }
      );
    }

    // Handle Firestore errors
    if (error.code && error.code.startsWith("firestore/")) {
      return new Response(
        JSON.stringify({
          error: "Database Error",
          message: "An error occurred while accessing the database",
          details: {
            code: error.code, // Firestore error code
            message: error.message, // Firestore error message
          },
        }),
        { status: 500 }
      );
    }

    // Handle Nodemailer errors
    if (error.code && error.code.startsWith("EMAIL_")) {
      return new Response(
        JSON.stringify({
          error: "Email Error",
          message: "An error occurred while sending the email",
          details: {
            code: error.code, // Nodemailer error code
            message: error.message, // Nodemailer error message
          },
        }),
        { status: 500 }
      );
    }

    // Handle generic errors
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: "An unexpected error occurred",
        details: {
          message: error.message, // Generic error message
        },
      }),
      { status: 500 }
    );
  }
}
