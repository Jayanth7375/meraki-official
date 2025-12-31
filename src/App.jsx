import { Routes, Route } from "react-router-dom";

// Common Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";

// Public Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Service";
import Contact from "./Pages/Contact";
import Faq from "./Pages/Faq";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import Admissions from "./Pages/Admissions";
import PublicCourses from "./Pages/PublicCourses";
import PublicStaff from "./Pages/PublicStaff";
import PublicDepartments from "./Pages/PublicDepartments";

// Auth Pages
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";

// Admin Pages
import AdminDashboard from "./Pages/AdminDashboard";
import ManageStaff from "./Pages/ManageStaff";
import ManageCourses from "./Pages/ManageCourses";
import ManageDepartments from "./Pages/ManageDepartments";
import ManageApplications from "./Pages/ManageApplications";
import ManageQueries from "./Pages/ManageQueries";

// Route Protection
import AdminRoute from "./Pages/AdminRoute";
import FacultyRoute from "./routes/FacultyRoute";
import StudentRoute from "./routes/StudentRoute";

// Faculty Pages
import FacultyDashboard from "./Pages/faculty/FacultyDashboard";
import FacultyStudents from "./Pages/faculty/FacultyStudents";
import FacultyCourses from "./Pages/faculty/FacultyCourses";
import FacultyAnnouncements from "./Pages/faculty/FacultyAnnouncements";
import FacultyProfile from "./Pages/faculty/FacultyProfile";
import FacultyAssignments from "./Pages/faculty/FacultyAssignments";
import FacultyMaterials from "./Pages/faculty/FacultyMaterials";
import FacultyFees from "./Pages/faculty/FacultyFees";
import FacultyAttendance from "./Pages/faculty/FacultyAttendance";

// Student Pages
import StudentDashboard from "./Pages/student/StudentDashboard";
import StudentAttendance from "./Pages/student/StudentAttendance";
import StudentFees from "./Pages/student/StudentFees";
import StudentAssignments from "./Pages/student/StudentAssignments";
import StudentMaterials from "./Pages/student/StudentMaterials";

function App() {
  return (
    <>
      {/* 🔥 AUTO SCROLL FIX */}
      <ScrollToTop />

      <Routes>
        {/* ================= PUBLIC PAGES ================= */}

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <Services />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route
          path="/faq"
          element={
            <>
              <Navbar />
              <Faq />
              <Footer />
            </>
          }
        />

        <Route
          path="/privacy"
          element={
            <>
              <Navbar />
              <Privacy />
              <Footer />
            </>
          }
        />

        <Route
          path="/terms"
          element={
            <>
              <Navbar />
              <Terms />
              <Footer />
            </>
          }
        />

        <Route
          path="/admissions"
          element={
            <>
              <Navbar />
              <Admissions />
              <Footer />
            </>
          }
        />

        {/* ACADEMICS */}
        <Route
          path="/academics/courses"
          element={
            <>
              <Navbar />
              <PublicCourses />
              <Footer />
            </>
          }
        />
        <Route
          path="/academics/staff"
          element={
            <>
              <Navbar />
              <PublicStaff />
              <Footer />
            </>
          }
        />
        <Route
          path="/academics/departments"
          element={
            <>
              <Navbar />
              <PublicDepartments />
              <Footer />
            </>
          }
        />

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ================= ADMIN (PROTECTED) ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/staff"
          element={
            <AdminRoute>
              <ManageStaff />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <AdminRoute>
              <ManageCourses />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/departments"
          element={
            <AdminRoute>
              <ManageDepartments />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <ManageApplications />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/queries"
          element={
            <AdminRoute>
              <ManageQueries />
            </AdminRoute>
          }
        />

        {/* ================= FACULTY (PROTECTED + LAYOUT) ================= */}
        <Route path="/faculty" element={<FacultyRoute />}>
          <Route index element={<FacultyDashboard />} />
          <Route path="students" element={<FacultyStudents />} />
          <Route path="attendance" element={<FacultyAttendance />} />
          <Route path="courses" element={<FacultyCourses />} />
          <Route path="assignments" element={<FacultyAssignments />} />
          <Route path="materials" element={<FacultyMaterials />} />
          <Route path="fees" element={<FacultyFees />} />
          <Route path="announcements" element={<FacultyAnnouncements />} />
          <Route path="profile" element={<FacultyProfile />} />
        </Route>

        {/* ================= STUDENT (PROTECTED) ================= */}
        <Route path="/student" element={<StudentRoute />}>
          <Route index element={<StudentDashboard />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="fees" element={<StudentFees />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="materials" element={<StudentMaterials />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
