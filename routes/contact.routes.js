import express from "express";
import { submitQuery, getQueries, deleteQuery } from "../controllers/contact.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.post("/", submitQuery);

// Admin Only
router.get("/", verifyAdmin, getQueries);
router.delete("/:id", verifyAdmin, deleteQuery);

export default router;
