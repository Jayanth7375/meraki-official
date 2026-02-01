import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    day: String,
    period: {
      type: String, // e.g. "1", "2", "Lab"
      required: true
    },
    status: {
      type: String,
      enum: ["present", "absent", "od"],
      required: true,
    },
  },
  { timestamps: true }
);

// avoid duplicate attendance for same period of same day
attendanceSchema.index(
  { studentId: 1, courseId: 1, date: 1, period: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", attendanceSchema);
