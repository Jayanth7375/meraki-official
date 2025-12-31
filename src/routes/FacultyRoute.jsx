import { Navigate, Outlet } from "react-router-dom";
import FacultyLayout from "../Components/FacultyLayout";

const FacultyRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("FacultyRoute check:", { token, role });

  if (!token || role !== "faculty") {
    return <Navigate to="/login" replace />;
  }

  return (
    <FacultyLayout>
      <Outlet />
    </FacultyLayout>
  );
};

export default FacultyRoute;
