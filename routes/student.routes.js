import express from "express";
import {
    getStudentDashboard,
    getMyAttendance,
    getMyFees,
    getMyAssignments,
    getMyMaterials,
    getAvailableCourses,
    enrollCourse
} from "../controllers/student.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", verifyToken, getStudentDashboard);
router.get("/attendance", verifyToken, getMyAttendance);
router.get("/fees", verifyToken, getMyFees);
router.get("/assignments", verifyToken, getMyAssignments);
router.get("/materials", verifyToken, getMyMaterials);
router.get("/available-courses", verifyToken, getAvailableCourses);
router.post("/enroll-course", verifyToken, enrollCourse);

export default router;
