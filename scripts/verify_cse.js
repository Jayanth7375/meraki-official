import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Course from "../models/Course.js";

dotenv.config();

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const faculty = await User.findOne({ email: "faculty.cse@college.com" });
        console.log("FACULTY FOUND:", faculty ? faculty.email : "Not Found");
        console.log("FACULTY DEPT:", faculty ? `'${faculty.department}'` : "N/A");

        const courses = await Course.find({ department: "CSE" });
        console.log("COURSES FOUND count:", courses.length);
        courses.forEach(c => console.log(`Course: ${c.name}, Dept: '${c.department}'`));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verify();
