import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Staff from "../models/Staff.js";
import Course from "../models/Course.js";
import Department from "../models/Department.js";
import Attendance from "../models/Attendance.js";
import Fee from "../models/Fee.js";
import Material from "../models/Material.js";
import Assignment from "../models/Assignment.js";

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding...");

        // CLEAR DB
        await User.deleteMany({});
        await Student.deleteMany({});
        await Staff.deleteMany({});
        await Course.deleteMany({});
        await Department.deleteMany({});
        await Attendance.deleteMany({});
        await Fee.deleteMany({});
        await Material.deleteMany({});
        await Assignment.deleteMany({});

        console.log("Database cleared.");

        // 1. Create Department
        const cseDept = await Department.create({
            name: "Computer Science",
            code: "CSE",
            description: "Department of Computer Science and Engineering",
        });

        // 2. Create Users (Admin, Faculty, Student)
        const salt = await bcrypt.genSalt(10);
        // Password must contain at least 1 letter and 1 number (from Login.jsx regex)
        const hashedPassword = await bcrypt.hash("student123", salt);

        const adminUser = await User.create({
            name: "Admin User",
            email: "admin@college.com",
            password: hashedPassword,
            role: "admin",
        });

        const facultyUser = await User.create({
            name: "John Faculty",
            email: "faculty@college.com",
            password: hashedPassword,
            role: "faculty",
            department: "Computer Science",
        });

        const studentUser = await User.create({
            name: "Alice Student",
            email: "student@college.com",
            password: hashedPassword,
            role: "student",
            department: "Computer Science",
        });

        // 3. Create Staff/Faculty Profile
        const facultyProfile = await Staff.create({
            user: facultyUser._id,
            name: facultyUser.name,
            email: facultyUser.email,
            department: "Computer Science", // Passed as String
            role: "Professor",
            phone: "9876543210", // Added Phone
        });

        // 4. Create Course
        const reactCourse = await Course.create({
            name: "Advanced React",
            code: "CS101",
            department: "Computer Science", // Passed as String
            description: "Deep dive into React.js",
            credits: 4,
            faculty: facultyUser._id,
        });

        // 5. Create Student Profile
        const studentProfile = await Student.create({
            user: studentUser._id,
            name: studentUser.name,
            rollNo: "CSE2025001",
            department: "Computer Science", // Passed as String
            courses: [reactCourse._id],
        });

        // 6. Create Attendance
        await Attendance.create({
            studentId: studentProfile._id,
            courseId: reactCourse._id,
            facultyId: facultyProfile._id,
            date: "2025-01-10",
            day: "Monday",
            period: "1", // Added Period
            status: "present",
        });
        await Attendance.create({
            studentId: studentProfile._id,
            courseId: reactCourse._id,
            facultyId: facultyProfile._id,
            date: "2025-01-11",
            day: "Tuesday",
            period: "2", // Added Period
            status: "absent",
        });

        // 7. Create Fees
        await Fee.create({
            student: studentProfile._id,
            amount: 50000,
            description: "Semester 1 Tuition",
            dueDate: new Date("2025-02-01"),
            status: "pending",
        });

        // 8. Create Material
        await Material.create({
            title: "React Hooks Guide",
            description: "PDF guide for hooks",
            department: "Computer Science",
            course: reactCourse._id,
            faculty: facultyUser._id,
            link: "https://react.dev/learn",
        });

        // 9. Create Assignment
        await Assignment.create({
            title: "Build a Todo App",
            description: "Create a todo app using useState and useEffect",
            department: "Computer Science",
            course: reactCourse._id,
            faculty: facultyUser._id,
            dueDate: new Date("2025-01-20"),
        });

        console.log("Seed Data Injected Successfully!");
        console.log("Credentials:");
        console.log("Student: student@college.com / student123");
        console.log("Faculty: faculty@college.com / student123");
        console.log("Admin:   admin@college.com / student123");

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
