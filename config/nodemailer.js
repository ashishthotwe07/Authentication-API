import nodemailer from "nodemailer"; // Importing nodemailer for email sending functionality
import ejs from "ejs"; // Importing ejs for rendering email templates
import path from "path"; // Importing path for working with file paths
import dotenv from "dotenv"; // Importing dotenv to load environment variables
dotenv.config(); // Loading environment variables

// Determine the directory of the current module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail as the email service
  host: "smtp.gmail.com", // Gmail SMTP server
  port: 587, // Port for SMTP
  secure: false, // Secure connection (TLS) is not required
  auth: {
    user: process.env.USER_EMAIL, // User email retrieved from environment variables
    pass: process.env.USER_PASS, // User password retrieved from environment variables
  },
});

export default transporter; // Export the transporter for use in other files
