import mongoose from "mongoose";
import dotenv from "dotenv";
import Staff from "../models/Staff.js";
import Department from "../models/Department.js";

dotenv.config();

const debugData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        const departments = await Department.find({});
        console.log("\n=== DEPARTMENTS ===");
        departments.forEach(d => {
            console.log(`Name: '${d.name}', Code: '${d.code}'`);
        });

        const staff = await Staff.find({});
        console.log("\n=== STAFF ===");
        staff.forEach(s => {
            console.log(`Name: '${s.name}', Role: '${s.role}', Dept: '${s.department}'`);
        });

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

debugData();
