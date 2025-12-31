import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/Course.js";
import User from "../models/User.js";

dotenv.config();

const debugCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        const courses = await Course.find({});
        console.log("\n=== COURSES ===");
        courses.forEach(c => {
            console.log(`Course: '${c.name}', Dept: '${c.department}', FacultyID: '${c.faculty || "UNASSIGNED"}'`);
        });

        const users = await User.find({ role: "faculty" });
        console.log("\n=== FACULTY USERS ===");
        users.forEach(u => {
            console.log(`User: '${u.name}', ID: '${u._id}', Dept: '${u.department}'`);
        });

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

debugCourses();
