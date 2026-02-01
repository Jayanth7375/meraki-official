import express from "express";
import {
    submitApplication,
    getAllApplications,
    updateApplicationStatus,
} from "../controllers/application.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public Route
router.post("/", submitApplication);

// Admin Routes
router.get("/", verifyToken, verifyAdmin, getAllApplications);
router.put("/:id/status", verifyToken, verifyAdmin, updateApplicationStatus);

export default router;
