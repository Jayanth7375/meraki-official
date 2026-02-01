import express from "express";
import {
  createStaff,
  getStaffs,
  updateStaff,
  deleteStaff,
  getPublicStaff
} from "../controllers/staff.controller.js";

import {
  verifyToken,
  verifyAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/public", getPublicStaff);

// ADMIN PROTECTED
router.get("/", verifyToken, verifyAdmin, getStaffs);
router.post("/", verifyToken, verifyAdmin, createStaff);
router.put("/:id", verifyToken, verifyAdmin, updateStaff);
router.delete("/:id", verifyToken, verifyAdmin, deleteStaff);

export default router;
