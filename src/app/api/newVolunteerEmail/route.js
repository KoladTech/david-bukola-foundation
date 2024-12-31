import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    // Extract data from the request body
    const {
      firstName,
      lastName,
      email,
      phone,
      interests,
      availableDays,
      comments,
    } = body;

    // Validate the input
    if (!firstName || !email || !phone || !interests || !availableDays) {
      return new Response(
        JSON.stringify({ message: "Fill all mandatory fields" }),
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

    // Configure the email options
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.NEXT_PUBLIC_FOUNDATION_EMAIL,
      subject: "New Volunteer Form Submission",
      text: `Name: ${firstName} ${lastName || ""}\nEmail: ${email}\n`,
      html: `<!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          h2 {
            color: #007bff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
          }
          .section {
            margin-bottom: 20px;
          }
          .label {
            font-weight: bold;
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Volunteer Application</h2>
          <p>We have received a new volunteer application. Here are the details:</p>

          <div class="section">
            <p><span class="label">Name:</span> ${firstName} ${
        lastName || ""
      }</p>
            <p><span class="label">Email:</span> ${email}</p>
            <p><span class="label">Phone:</span> ${phone}</p>
          </div>

          <div class="section">
            <p><span class="label">Available Days:</span></p>
            <ul>
              ${availableDays.map((day) => `<li>${day}</li>`).join("")}
            </ul>
            <p><span class="label">Interests:</span></p>
            <ul>
              ${interests.map((interest) => `<li>${interest}</li>`).join("")}
            </ul>
          </div>

          ${
            comments
              ? `<div class="section">
                  <p><span class="label">Comments:</span> ${comments}</p>
                </div>`
              : ""
          }
        </div>
      </body>
    </html>
  `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

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
