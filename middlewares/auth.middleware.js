import jwt from "jsonwebtoken"; // Importing jsonwebtoken for token verification
import User from "../models/user.model.js"; // Importing the User model
import dotenv from "dotenv"; // Importing dotenv for loading environment variables
dotenv.config(); // Loading environment variables

// Middleware function to verify JWT token
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token; // Extracting token from request cookies

  // If no token is provided in the request, return unauthorized
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    // Verify the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Storing the user ID from the decoded token in the request object

    // Check if the user exists in the database
    const user = await User.findById(decoded.userId);
    if (!user) {
      // If user does not exist, return unauthorized
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    // If user exists, proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error in verifyToken middleware:", error); // Logging any errors to the console
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};
