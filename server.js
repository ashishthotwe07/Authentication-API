// Import required modules
import dotenv from "dotenv"; // Load environment variables from .env file
import express from "express";
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";

// Load environment variables from .env file
dotenv.config();
// connect to db
connectDB();

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


app.use(cookieParser());
// Define a port for the server to listen on
const PORT = process.env.PORT || 3000;



// Routes
app.use('/api/users', userRouter);
// Define a route handler
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
