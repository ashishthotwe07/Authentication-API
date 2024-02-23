import mongoose from "mongoose"; // Importing Mongoose for MongoDB interaction
import dotenv from "dotenv"; // Importing dotenv to load environment variables
dotenv.config(); // Loading environment variables

// Retrieve MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Attempt to establish connection to MongoDB using the provided URI
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB"); // Log success message if connection is successful
  } catch (error) {
    console.error("MongoDB connection error:", error); // Log error message if connection fails
  }
};

export default connectDB; // Export the connectDB function for use in other files
