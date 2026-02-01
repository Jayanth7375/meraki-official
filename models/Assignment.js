import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        department: { type: String, required: true }, // Links to Faculty Dept
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        dueDate: { type: Date, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);
