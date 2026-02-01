import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        department: { type: String, required: true },
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        link: { type: String, required: true }, // URL to file/resource
    },
    { timestamps: true }
);

export default mongoose.model("Material", materialSchema);
