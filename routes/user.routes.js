// Importing necessary modules and controllers
import express from "express";
import {
  UserSignIn,
  UserSignOut,
  UserSignUp,
  deleteUser,
  updateUser,
  verifyEmail,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

// Creating an Express router instance
const router = express.Router();

// Routes for user authentication and management
router.post("/signup", UserSignUp); // Route for user signup
router.post("/signin", UserSignIn); // Route for user signin
router.put("/update", verifyToken, updateUser); // Route for updating user details
router.get("/signout", UserSignOut); // Route for user signout
router.delete("/delete", verifyToken, deleteUser); // Route for deleting user account
router.get("/verify/:token", verifyEmail); // Route for verifying user email

// Exporting the router for use in the application
export default router;
