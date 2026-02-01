
import mongoose from "mongoose";
import dotenv from "dotenv";
import Department from "../models/Department.js";

dotenv.config();

const listDepts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const depts = await Department.find();
        console.log("ALL DEPARTMENTS:", JSON.stringify(depts, null, 2));
        process.exit();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}
listDepts();
