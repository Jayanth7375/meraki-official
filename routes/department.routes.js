import express from "express";
import {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment
} from "../controllers/department.controller.js";

import {
  verifyToken,
  verifyAdmin
} from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC READ
// PUBLIC READ
router.get("/", getDepartments);
router.get("/public", getDepartments);

// ADMIN ONLY
router.post("/", verifyToken, verifyAdmin, createDepartment);
router.put("/:id", verifyToken, verifyAdmin, updateDepartment);
router.delete("/:id", verifyToken, verifyAdmin, deleteDepartment);

export default router;
