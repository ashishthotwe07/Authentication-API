// routes/userRoutes.js

import express from "express";
import {
  UserSignIn,
  UserSignUp,
  test,
  updateUser,
  verifyEmail,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", UserSignUp);
router.post("/signin", UserSignIn);
router.put("/update", verifyToken, updateUser);
router.get("/verify/:token", verifyEmail);
router.get("/test", verifyToken, test);

export default router;
