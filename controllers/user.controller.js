import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

// Function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="text-align: center; color: #333;">Welcome to Our Platform!</h2>
        <p style="text-align: center;">Thank you for signing up with us. To complete your registration, please click the button below to verify your email address.</p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="http://localhost:8000/api/users/verify/${verificationToken}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
        </div>
        <p style="text-align: center; margin-top: 20px;">If you did not sign up for our platform, you can ignore this email.</p>
        <p style="text-align: center;">Best Regards,<br>Your Platform Team</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Email Verification", // Email subject
      html: htmlContent, // Email body with verification link
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error; // Throw error to handle it in the caller function
  }
};

export const UserSignUp = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Check if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar:
        avatar ||
        "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg", // Use provided avatar or default avatar from model
    });

    // Save the new user to the database
    await newUser.save();

    // Generate verification token
    const verificationToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d", // Token expires in 1 day
      }
    );

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="text-align: center; color: #333;">Welcome to Our Platform!</h2>
        <p style="text-align: center;">Hi ${name},</p>
        <p style="text-align: center;">Thank you for signing up with us. To complete your registration, please click the button below to verify your email address.</p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="${verificationLink}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
        </div>
        <p style="text-align: center; margin-top: 20px;">If you did not sign up for our platform, you can ignore this email.</p>
        <p style="text-align: center;">Best Regards,<br>Your Platform Team</p>
      </div>
    `;

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Return a success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering user",
    });
  }
};

export const UserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });
    // Return success response with token
    return res.status(200).json({
      success: true,
      message: "User signed in successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while signing in user",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    const userId = req.userId;

    // Check if required fields are present
    if (!userId || (!name && !email && !password && !avatar)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: No update data provided",
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user data
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (avatar) user.avatar = avatar;

    // Save updated user data
    await user.save();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating user",
    });
  }
};

export const test = async (req, res) => {
  res.send("sucess");
  console.log("helllo bhai ", req.userId);
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required for email verification",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Update user's verification status
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Mark the user's email as verified
    user.emailVerified = true;
    await user.save();

    // Send response indicating successful verification
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while verifying email",
    });
  }
};

export const UserSignOut = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    console.error("Error signing out user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while signing out user",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Clear the token cookie after deleting user
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser: {
        _id: deletedUser._id,
        name: deletedUser.name,
        email: deletedUser.email,
        avatar: deletedUser.avatar,
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting user",
    });
  }
};
