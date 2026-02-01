import Staff from "../models/Staff.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

/* GET ALL STAFF */
export const getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find().sort({ createdAt: -1 });
    res.json(staffs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};

/* PUBLIC: Get Staff List (No sensitive info) */
export const getPublicStaff = async (req, res) => {
  try {
    const staff = await Staff.find().select("name department role title email");
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE STAFF */
export const createStaff = async (req, res) => {
  try {
    const { name, role, department, email, phone } = req.body;

    if (!name || !role || !department || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if User exists for auth
    let user = await User.findOne({ email });
    if (!user) {
      // Create default user for this staff
      const hashed = await bcrypt.hash("Staff@123", 10);
      user = await User.create({
        name,
        email,
        password: hashed,
        role: "faculty", // Default role for staff created here
        department,
      });
    }

    const staff = await Staff.create({
      user: user._id,
      name,
      role,
      department,
      email,
      phone,
    });

    res.status(201).json(staff);
  } catch (err) {
    console.error("CREATE STAFF ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE STAFF */
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

/* DELETE STAFF */
export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
