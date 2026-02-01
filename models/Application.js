import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        department: {
            type: String,
            required: true,
        },
        marks: {
            type: String, // Can be "450/500" or just "90%"
            required: true,
        },
        cutoff: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
