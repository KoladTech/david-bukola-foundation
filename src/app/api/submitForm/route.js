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
    role: "volunteer",
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
        JSON.stringify({ message: "Invalid form type provided" }),
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
    // const usersRef = firestore.collection("Users");
    const usersRef = firestore.collection("TestCollection");
    const snapshot = await usersRef
      .where("email", "==", validatedData.email)
      .get();

    const {
      firstName,
      lastName,
      email,
      phone,
      newsletter,
      date,
      ...remainingFormData
    } = validatedData;

    // initialize a userId variable to be added to the form type
    let userId;

    if (!snapshot.empty) {
      // Email already exists
      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();
      userId = userDoc.id;

      // Check if the user already has the incoming role
      // TODO: donors, volunteers, testimonials, will ideally want to donate more than once
      if (userData.roles && userData.roles.includes(formConfigEntry.role)) {
        return new Response(
          JSON.stringify({ error: "User already has this role" }),
          { status: 400 }
        );
      } else {
        // Add the new role to the user
        await userDoc.ref.update({
          roles: admin.firestore.FieldValue.arrayUnion(formConfigEntry.role),
        });
      }
    } else {
      // Create a new user
      const userDocRef = await usersRef.add({
        firstName,
        lastName,
        email,
        phone,
        newsletter,
        roles: [formConfigEntry.role],
        date,
      });
      userId = userDocRef.id;
    }

    // Add form data to the appropriate collection
    // const collectionRef = firestore.collection(formConfigEntry.collection);
    const collectionRef = firestore.collection("TestCollection");
    await collectionRef.add({
      firstName,
      lastName,
      email,
      phone,
      userId,
      date,
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
    console.error("Error processing form submission:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: error }),
      {
        status: 500,
      }
    );
  }
}
