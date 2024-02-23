// routes/userRoutes.js

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

const router = express.Router();

router.post("/signup", UserSignUp);
router.post("/signin", UserSignIn);
router.put("/update", verifyToken, updateUser);
router.get("/signout", UserSignOut);
router.delete("/delete", verifyToken, deleteUser);
router.get("/verify/:token", verifyEmail);

export default router;
