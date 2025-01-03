import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Get the request - The testimony data object
    const body = await req.json();
    console.log("api/BODY", body);
    // Create and Set the testimony data variables required
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      phoneCode,
      paymentMethod,
      amount,
      city,
      country,
      newsletter,
    } = body; //1................................................................

    // Validate the input
    if (
      !firstName ||
      !lastName ||
      !email ||
      !paymentMethod ||
      !amount ||
      !country
    ) {
      //2................................................................
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
      subject: "New Donation Form Submission", // Email subject //3...............................
      html: `
    <table>
      <tr>
        <td><strong>First Name:</strong></td>
        <td>${firstName}</td>
      </tr>
      <tr>
        <td><strong>Last Name:</strong></td>
        <td>${lastName}</td>
      </tr>
      <tr>
        <td><strong>Email:</strong></td>
        <td>${email}</td>
      </tr>
      <tr>
        <td><strong>Amount:</strong></td>
        <td>${amount}</td>
      </tr>
      <tr>
        <td><strong>Payment Method:</strong></td>
        <td>${paymentMethod}</td>
      </tr>
      <tr>
        <td><strong>Phone Number:</td>
        <td>${phoneCode}</td>
        <span>${phoneNumber}</span>
      </tr>
      <tr>
        <td><strong>City:</strong></td>
        <td>${city}</td>
      </tr>
      <tr>
        <td><strong>Country:</strong></td>
        <td>${country}</td>
      </tr>
      <tr>
        <td><strong>Newsletter:</strong></td>
        <td>${newsletter}</td>
      </tr>
    </table>
  `, // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error.message);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
