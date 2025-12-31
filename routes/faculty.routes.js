import express from "express";
import {
  facultyDashboard,
  getFacultyCourses,
  getStudentsByCourse,
  saveAttendance,
  addAssignment,
  getAssignments,
  addMaterial,
  getMaterials,
  addFee,
  addAnnouncement,
  getAnnouncements
} from "../controllers/faculty.controller.js";
import { verifyFaculty } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", verifyFaculty, facultyDashboard);
router.get("/courses", verifyFaculty, getFacultyCourses);
router.get("/courses/:courseId/students", verifyFaculty, getStudentsByCourse);
router.post("/attendance", verifyFaculty, saveAttendance);

// New Features
router.post("/assignments", verifyFaculty, addAssignment);
router.get("/assignments", verifyFaculty, getAssignments);
router.post("/materials", verifyFaculty, addMaterial);
router.get("/materials", verifyFaculty, getMaterials);
router.post("/fees", verifyFaculty, addFee); // Added Fee Route

export default router;

router.post('/announcements', verifyFaculty, addAnnouncement);
router.get('/announcements', verifyFaculty, getAnnouncements);

