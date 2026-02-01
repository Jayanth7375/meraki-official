import express from "express";
import User from "../models/User.js";
import Staff from "../models/Staff.js";
import Course from "../models/Course.js";
import Department from "../models/Department.js";

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const staffCount = await Staff.countDocuments();
    const courseCount = await Course.countDocuments();
    const deptCount = await Department.countDocuments();
    const studentCount = await User.countDocuments({ role: "student" });

    res.json({
      staffCount,
      courseCount,
      deptCount,
      studentCount,
      activities: [],
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
});

export default router;
