import { Navigate, Outlet } from "react-router-dom"; // Added imports
import StudentLayout from "../Components/StudentLayout";

const StudentRoute = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    return token && role === "student" ? (
        <StudentLayout /> // Outlet is handled inside Layout
    ) : <Navigate to="/login" replace />;
};

export default StudentRoute;
