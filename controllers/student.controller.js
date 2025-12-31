import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Attendance from "../models/Attendance.js";
import Assignment from "../models/Assignment.js";
import Material from "../models/Material.js";
import Fee from "../models/Fee.js";

export const getStudentDashboard = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user.id }).populate({
            path: "courses",
            select: "name description department",
        });

        if (!student) {
            return res.status(404).json({ message: "Student profile not found" });
        }

        res.json({
            name: student.name,
            rollNo: student.rollNo,
            department: student.department,
            courses: student.courses,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to load student dashboard" });
    }
};

/* =======================
   COURSE REGISTRATION
======================= */
export const getAvailableCourses = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user.id });
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Find courses in Student's Dept that are NOT in their enrolled list
        const courses = await Course.find({
            department: student.department,
            _id: { $nin: student.courses }
        });

        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const student = await Student.findOne({ user: req.user.id });

        if (!student.courses.includes(courseId)) {
            student.courses.push(courseId);
            await student.save();
        }

        res.json({ message: "Enrolled successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =======================
   ATTENDANCE
======================= */
export const getMyAttendance = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user.id });
        if (!student) return res.status(404).json({ message: "Student not found" });

        const attendance = await Attendance.find({ studentId: student._id })
            .populate("courseId", "name")
            .sort({ date: -1 });

        res.json(attendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =======================
   FEES
======================= */
export const getMyFees = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user.id });
        if (!student) return res.status(404).json({ message: "Student not found" });

        const fees = await Fee.find({ student: student._id }).sort({ dueDate: 1 });
        res.json(fees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =======================
   ASSIGNMENTS & MATERIALS
======================= */
export const getMyAssignments = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user.id });
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Get assignments for student's enrolled courses or department
        const assignments = await Assignment.find({
            course: { $in: student.courses }
        }).populate("course", "name").populate("faculty", "name");

        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMyMaterials = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user.id });
        if (!student) return res.status(404).json({ message: "Student not found" });

        const materials = await Material.find({
            course: { $in: student.courses }
        }).populate("course", "name").populate("faculty", "name");

        res.json(materials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
