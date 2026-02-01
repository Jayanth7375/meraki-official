import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        priority: {
            type: String,
            enum: ["Normal", "High"],
            default: "Normal",
        }
    },
    { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);
