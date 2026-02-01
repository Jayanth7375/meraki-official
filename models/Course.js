import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String, // ✅ STRING, not ObjectId
      required: true,
      trim: true,
    },
    credits: {
      type: Number,
      default: 4, // Default to 4 periods/hours
      min: 1,
      max: 10
    },
    description: {
      type: String,
      default: "",
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
