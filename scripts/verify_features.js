import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Fee from "../models/Fee.js";
import Assignment from "../models/Assignment.js";
import Material from "../models/Material.js";
import Course from "../models/Course.js";

dotenv.config();

const verifyFeatures = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        // 1. Check if Fees exist
        const fees = await Fee.find();
        console.log("Total Fees:", fees.length);

        // 2. Create a dummy Fee if none
        if (fees.length === 0) {
            const student = await Student.findOne();
            if (student) {
                await Fee.create({
                    student: student._id,
                    amount: 50000,
                    description: "Semester 1 Tuition",
                    dueDate: new Date("2025-01-15")
                });
                console.log("Created dummy Fee for student:", student.name);
            }
        }

        // 3. Check Assignments
        const assignments = await Assignment.find();
        console.log("Total Assignments:", assignments.length);

        // 4. Check Materials
        const materials = await Material.find();
        console.log("Total Materials:", materials.length);

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

verifyFeatures();
