import Department from "../models/Department.js";

// ================= CREATE =================
export const createDepartment = async (req, res) => {
  try {
    const { name, code, description } = req.body;

    // validation
    if (!name || !code || !description) {
      return res
        .status(400)
        .json({ message: "Name, Code and description are required" });
    }

    // duplicate check
    const exists = await Department.findOne({ $or: [{ name: name.trim() }, { code: code.trim() }] });
    if (exists) {
      return res
        .status(409)
        .json({ message: "Department name or code already exists" });
    }

    const dept = await Department.create({
      name: name.trim(),
      code: code.trim(),
      description: description.trim(),
    });

    res.status(201).json(dept);
  } catch (err) {
    console.error("Create Department Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= READ =================
export const getDepartments = async (req, res) => {
  try {
    const depts = await Department.find().sort({ createdAt: -1 });
    res.status(200).json(depts);
  } catch (err) {
    console.error("Fetch Departments Error:", err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};

// ================= UPDATE =================
export const updateDepartment = async (req, res) => {
  try {
    const { name, code, description } = req.body;

    if (!name || !code || !description) {
      return res
        .status(400)
        .json({ message: "Name, Code and description are required" });
    }

    const updatedDept = await Department.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        code: code.trim(),
        description: description.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedDept) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(updatedDept);
  } catch (err) {
    console.error("Update Department Error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

// ================= DELETE =================
export const deleteDepartment = async (req, res) => {
  try {
    const deleted = await Department.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted" });
  } catch (err) {
    console.error("Delete Department Error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};
