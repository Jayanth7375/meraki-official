import Course from "../models/Course.js";
import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";
import Assignment from "../models/Assignment.js";
import Material from "../models/Material.js";
import Fee from "../models/Fee.js";
import Announcement from "../models/Announcement.js";

/* =======================
   FACULTY DASHBOARD
======================= */
export const facultyDashboard = async (req, res) => {
  try {
    const { id } = req.user;

    // Filter by Faculty ID
    const courses = await Course.find({ faculty: id });
    const courseIds = courses.map(c => c._id);

    const students = await Student.find({
      courses: { $in: courseIds }
    }).distinct("_id");

    res.json({
      totalCourses: courses.length,
      totalStudents: students.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =======================
   FACULTY COURSES
======================= */
export const getFacultyCourses = async (req, res) => {
  try {
    const { id } = req.user;

    // Filter strictly by Faculty ID (Explicit Assignment)
    const courses = await Course.find({ faculty: id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =======================
   STUDENTS BY COURSE
======================= */
export const getStudentsByCourse = async (req, res) => {
  try {
    const students = await Student.find({
      courses: req.params.courseId
    }).select("name rollNo department");

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =======================
   SAVE ATTENDANCE
======================= */
export const saveAttendance = async (req, res) => {
  try {
    const { courseId, date, day, period, records } = req.body;
    console.log("SAVE ATTENDANCE BODY:", { courseId, date, day, period, recordsCount: records?.length });

    for (const r of records) {
      await Attendance.findOneAndUpdate(
        {
          studentId: r.studentId,
          courseId,
          date,
          period: String(period), // Ensure Cast to String
        },
        {
          studentId: r.studentId,
          courseId,
          facultyId: req.user.id,
          date,
          day,
          period: String(period),
          status: r.status,
        },
        { upsert: true, new: true }
      );
    }
    res.json({ message: "Attendance saved successfully" });
  } catch (err) {
    console.error("SAVE ATTENDANCE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =======================
   ASSIGNMENTS
======================= */
export const addAssignment = async (req, res) => {
  try {
    const { title, description, courseId, dueDate } = req.body;
    const assignment = await Assignment.create({
      title,
      description,
      course: courseId,
      department: req.user.department,
      faculty: req.user.id,
      dueDate
    });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    // Filter by Faculty ID
    const assignments = await Assignment.find({
      faculty: req.user.id
    }).populate("course", "name");
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =======================
   MATERIALS
======================= */
export const addMaterial = async (req, res) => {
  try {
    const { title, description, courseId, link } = req.body;
    const material = await Material.create({
      title,
      description,
      course: courseId,
      department: req.user.department,
      faculty: req.user.id,
      link
    });
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMaterials = async (req, res) => {
  try {
    // Filter by Faculty ID
    const materials = await Material.find({
      faculty: req.user.id
    }).populate("course", "name");
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/* =======================
   FEES
======================= */
export const addFee = async (req, res) => {
  try {
    const { studentId, amount, description, dueDate } = req.body;

    // Validate student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const fee = await Fee.create({
      student: studentId,
      amount,
      description,
      dueDate,
      status: "pending"
    });

    res.status(201).json({ message: "Fee added successfully", fee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =======================
   ANNOUNCEMENTS
======================= */
export const addAnnouncement = async (req, res) => {
  try {
    const { title, content, priority } = req.body;
    const announcement = await Announcement.create({
      title,
      content,
      priority: priority || 'Normal',
      department: req.user.department,
      faculty: req.user.id
    });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    // Fetch announcements for the faculty's department
    const announcements = await Announcement.find({
      department: req.user.department
    }).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

