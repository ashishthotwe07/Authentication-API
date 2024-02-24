// Import required modules
import dotenv from "dotenv"; // Load environment variables from .env file
import express from "express"; 
import cookieParser from "cookie-parser"; // Parse Cookie header and populate req.cookies
import connectDB from "./config/db.config.js"; // Import function to connect to the database
import userRouter from "./routes/user.routes.js"; // Import router for user-related routes

// Load environment variables from .env file
dotenv.config();
// connect to db
connectDB();

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Define a port for the server to listen on
const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/v1/users", userRouter); // Use userRouter for handling user-related routes

// Define a route handler for the root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to My API! Version 1.0!"); // Send a simple response to indicate that the server is running
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log a message indicating that the server is running
});
