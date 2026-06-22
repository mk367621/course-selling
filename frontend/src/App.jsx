import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Courses from "./pages/Courses.jsx";
import Purchases from "./pages/Purchases.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import UserProtectedRoute from "./components/UserProtectedRoute.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CreateCourse from "./pages/CreateCourse.jsx";
import AdminCourses from "./pages/AdminCourses.jsx";
import EditCourse from "./pages/EditCourse.jsx";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar.jsx";
import AdminPublicRoute from "./components/AdminPublicRoute.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/purchases"
          element={
            <UserProtectedRoute>
              <Purchases />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/admin/login"
          element={
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/create-course"
          element={
            <AdminProtectedRoute>
              <CreateCourse />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminProtectedRoute>
              <AdminCourses />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-course/:id"
          element={
            <AdminProtectedRoute>
              <EditCourse />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
