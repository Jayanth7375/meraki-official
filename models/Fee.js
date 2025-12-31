import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
        amount: { type: Number, required: true },
        description: { type: String, required: true }, // e.g., "Semester 1 Fee"
        dueDate: { type: Date, required: true },
        status: {
            type: String,
            enum: ["pending", "paid", "overdue"],
            default: "pending"
        },
        transactionId: { type: String }, // Optional, if paid
        paidAt: { type: Date },
    },
    { timestamps: true }
);

export default mongoose.model("Fee", feeSchema);
