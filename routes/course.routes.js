import express from "express";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/public", getCourses);

// ADMIN PROTECTED
router.get("/", verifyToken, verifyAdmin, getCourses);
router.post("/", verifyToken, verifyAdmin, addCourse);
router.put("/:id", verifyToken, verifyAdmin, updateCourse);
router.delete("/:id", verifyToken, verifyAdmin, deleteCourse);

export default router;
