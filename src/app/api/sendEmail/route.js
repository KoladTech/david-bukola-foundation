import nodemailer from "nodemailer";

export async function POST(req) {
  const nodemailer = require("nodemailer");
  try {
    // Get the request - The testimony data object
    const body = await req.json();

    // Create and Set the testimony data variables required
    const { firstName, lastName, email, occupation, testimonial } = body;

    // Validate the input
    if (!firstName || !lastName || !email || !occupation || !testimonial) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }
    // Create a Nodemailer transporter to handle the mail sending
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use the appropriate email service
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USERNAME, // Your email address
        pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD, // Your email password or app password
      },
    });

    // Configure the email options
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`, // Sender info
      to: process.env.NEXT_PUBLIC_FOUNDATION_EMAIL, // Your foundation's email
      subject: "New Testimony Submission", // Email subject
      text: ` First Name: ${firstName} 
              Last Name: ${lastName}
              Email: ${email}
              Occupation: ${occupation}
              Testimonial: ${testimonial}`, // Plain text content
      html: ` <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h2 style="color: #555;">New Testimony Submission</h2>
                <p><strong>First Name:</strong> ${firstName}</p> 
                <p><strong>Last Name:</strong> ${lastName}</p> 
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Occupation:</strong> ${occupation}</p>
                <p><strong>Testimonial:</strong></p>
                <p style="margin-left: 20px;">${testimonial}</p> 
              </div> `, // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
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
