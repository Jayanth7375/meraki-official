import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";

dotenv.config();

const debug = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const faculty = await User.find({ role: "faculty" });
        console.log("\n--- FACULTY USERS ---");
        faculty.forEach(f => {
            console.log(`Email: ${f.email}, Dept: '${f.department}', ID: ${f._id}`);
        });

        const courses = await Course.find({});
        console.log("\n--- COURSES ---");
        courses.forEach(c => {
            console.log(`Name: ${c.name}, Dept: '${c.department}', FacultyId Field?: ${c.facultyId}`);
        });

        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

debug();
