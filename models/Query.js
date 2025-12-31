import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
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
        },
        phone: {
            type: String,
            trim: true,
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["New", "Read", "Replied"],
            default: "New",
        }
    },
    { timestamps: true }
);

export default mongoose.model("Query", querySchema);
