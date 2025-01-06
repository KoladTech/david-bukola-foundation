import nodemailer from "nodemailer";
import { formatObjectKeyToTitle } from "@/lib/utils";

export async function POST(req) {
  try {
    // Get the request body from the request
    const body = await req.json();

    // Extract form type and form data
    const { formType, formData } = body;

    if (!formType || !formData) {
      return new Response(
        JSON.stringify({ message: "Form type and data are required" }),
        { status: 400 }
      );
    }

    // Define validation rules for different forms
    const validationRules = {
      volunteerForm: [
        "firstName",
        "email",
        "phone",
        "interests",
        "availableDays",
      ],
      eventVolunteerForm: [
        "firstName",
        "email",
        "phone",
        "event_name",
        "event_id",
      ],
      donateForm: [
        "firstName",
        "lastName",
        "email",
        "paymentMethod",
        "amount",
        "country",
      ],
      // Add more forms here
    };

    const requiredFields = validationRules[formType];

    // const validateForm = (formData, requiredFields) => {
    //   return requiredFields.every((field) => {
    //     if (field === "newsletter") {
    //       return formData[field] !== undefined; // Accept `false` as valid
    //     }
    //     return formData[field]; // Check for truthy values for other fields
    //   });
    // };

    // const requiredFields = validateForm();

    if (!requiredFields) {
      return new Response(
        JSON.stringify({ message: "Invalid form type provided" }),
        { status: 400 }
      );
    }

    // Validate the form data
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        }),
        { status: 400 }
      );
    }

    // Create the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
      },
    });

    // Generate dynamic email content
    const emailSubject = ``;
    // const emailBody = `
    //   <html>
    //     <body>
    //       <h2>${formatObjectKeyToTitle(formType)} Submission</h2>
    //       <ul>
    //         ${Object.entries(formData)
    //           .map(([key, value]) => {
    //             const formattedValue =
    //               typeof value === "object" ? formatTimestamp(value) : value;
    //             return `
    //               <li>
    //                 <strong>${formatObjectKeyToTitle(key)}:</strong> ${
    //               Array.isArray(formattedValue)
    //                 ? formattedValue.join(", ")
    //                 : formattedValue
    //             }
    //               </li>`;
    //           })
    //           .join("")}
    //       </ul>
    //     </body>
    //   </html>
    // `;
    const emailBody = `
  <html>
    <body>
      <h2>${formatObjectKeyToTitle(formType)} Submission</h2>
      <ul>
        ${Object.entries(formData)
          .filter(
            ([key, value]) =>
              !(value && value._methodName === "serverTimestamp")
          ) // Skip serverTimestamp objects
          .map(([key, value]) => {
            return `
              <li>
                <strong>${formatObjectKeyToTitle(key)}:</strong>
                ${Array.isArray(value) ? value.join(", ") : value}
              </li>
            `;
          })
          .join("")}
      </ul>
    </body>
  </html>
`;

    // Configure the email options
    const mailOptions = {
      from: `"${formData.firstName || "Anonymous"}" <${formData.email}>`,
      to: process.env.NEXT_PUBLIC_FOUNDATION_EMAIL,
      subject: emailSubject,
      html: emailBody,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return responses
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
