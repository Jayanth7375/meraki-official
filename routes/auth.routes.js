import express from "express";
import {
  register,
  login,
  createFaculty
} from "../controllers/auth.controller.js";

import {
  verifyToken,
  verifyAdmin
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Student register
router.post("/register", register);

// Login (admin / student / faculty)
router.post("/login", login);

// Admin creates faculty
router.post(
  "/create-faculty",
  verifyToken,
  verifyAdmin,
  createFaculty
);

export default router;
