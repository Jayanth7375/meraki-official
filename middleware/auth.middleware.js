import jwt from "jsonwebtoken";

/* =========================
   BASE TOKEN VERIFICATION
========================= */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, department, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* =========================
   ADMIN ACCESS
========================= */
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access denied" });
    }
    next();
  });
};

/* =========================
   FACULTY ACCESS  ✅ NEW
========================= */
export const verifyFaculty = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "faculty") {
      return res.status(403).json({ message: "Faculty access denied" });
    }
    next();
  });
};

/* =========================
   STUDENT ACCESS (FOR LATER)
========================= */
export const verifyStudent = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Student access denied" });
    }
    next();
  });
};
