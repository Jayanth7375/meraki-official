import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Staff from "../models/Staff.js";
import Course from "../models/Course.js";
import Department from "../models/Department.js";

dotenv.config();

const departmentsList = [
    { name: "Computer Science", code: "CSE", description: "Computer Science Department" },
    { name: "Electronics", code: "ECE", description: "Electronics Department" },
    { name: "Mechanical", code: "MECH", description: "Mechanical Department" },
    { name: "Civil", code: "CIVIL", description: "Civil Department" },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear DB
        await User.deleteMany({});
        await Student.deleteMany({});
        await Staff.deleteMany({});
        await Course.deleteMany({});
        await Department.deleteMany({});

        console.log("Cleared existing data.");

        // 1. Create Departments
        const createdDepartments = await Department.insertMany(departmentsList);
        console.log(`Seeded ${createdDepartments.length} Departments.`);

        // 2. Create Admin
        const adminPass = await bcrypt.hash("admin123", 10);
        await User.create({
            name: "Super Admin",
            email: "admin@college.com",
            password: adminPass,
            role: "admin",
        });
        console.log("Seeded Admin (admin@college.com / admin123)");

        // 3. Create Faculty & Staff
        for (const dept of createdDepartments) {
            const password = await bcrypt.hash("faculty123", 10);
            const user = await User.create({
                name: `Faculty ${dept.code}`,
                email: `faculty.${dept.code.toLowerCase()}@college.com`,
                password,
                role: "faculty",
                department: dept.code,
            });

            await Staff.create({
                user: user._id,
                name: user.name,
                role: "Assistant Professor",
                department: dept.code,
                email: user.email,
                phone: "9876543210",
            });
            console.log(`Seeded Faculty for ${dept.code}`);
        }

        // 4. Create Courses
        const courses = [];
        for (const dept of createdDepartments) {
            const course = await Course.create({
                name: `Intro to ${dept.name}`,
                department: dept.code,
                description: `Fundamental concepts of ${dept.name}`,
            });
            courses.push(course);
        }
        console.log(`Seeded ${courses.length} Courses.`);

        // 5. Create Students
        for (let i = 1; i <= 10; i++) {
            const password = await bcrypt.hash("student123", 10);
            const user = await User.create({
                name: `Student ${i}`,
                email: `student${i}@college.com`,
                password,
                role: "student",
            });

            const randomDept = createdDepartments[Math.floor(Math.random() * createdDepartments.length)];

            await Student.create({
                user: user._id,
                name: user.name,
                rollNo: `2024${1000 + i}`,
                department: randomDept.code,
                courses: [courses[Math.floor(Math.random() * courses.length)]._id],
            });
        }
        console.log("Seeded 10 Students.");

        process.exit();
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seed();
