import { Routes, Route } from "react-router-dom";

// Common Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Public Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Service";
import Contact from "./Pages/Contact";
import Faq from "./Pages/Faq";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";

// Auth Pages
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";

// Admin Pages
import AdminDashboard from "./Pages/AdminDashboard";
import ManageStaff from "./Pages/ManageStaff";
import ManageCourses from "./Pages/ManageCourses";
import ManageDepartments from "./Pages/ManageDepartments";

// Route Protection
import AdminRoute from "./Pages/AdminRoute";
import ManagePages from "./Pages/ManagePages";

function App() {
  return (
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

      {/* ================= AUTH PAGES (NO NAVBAR / FOOTER) ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ================= ADMIN PAGES (PROTECTED) ================= */}

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
        path="/admin/pages"
        element={
          <AdminRoute>
            <ManagePages />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
export default App;