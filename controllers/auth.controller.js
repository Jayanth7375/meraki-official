import User from "../models/User.js";
import Student from "../models/Student.js";
import Staff from "../models/Staff.js";
import Course from "../models/Course.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= STUDENT REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: "student",
      department, // Save User Department
    });

    // AUTO-ENROLL: Find all courses for this department
    const deptCourses = await Course.find({ department });
    const courseIds = deptCourses.map(c => c._id);

    await Student.create({
      user: newUser._id,
      name: newUser.name,
      rollNo: "TEMP" + Date.now(), // Temporary Roll No
      department: department || "General",
      courses: courseIds, // Auto-enroll in all dept courses
    });

    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= LOGIN (ADMIN / STUDENT / FACULTY) ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+department");
    console.log("DEBUG LOGIN: Found User:", user);
    console.log("DEBUG LOGIN: Dept Field:", user ? user.department : "N/A");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        department: user.department || null // ✅ Include department 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department, // Send to frontend too
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE FACULTY (ADMIN ONLY) ================= */
export const createFaculty = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    if (!name || !email || !password || !department) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: "faculty",
      department,
    });

    const newStaff = await Staff.create({
      user: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: "Faculty",
      department: department,
      phone: "0000000000", // Default phone
    });

    res.status(201).json({
      message: "Faculty created successfully",
      faculty: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
