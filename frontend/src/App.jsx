import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Courses from "./pages/Courses.jsx";
import Purchases from "./pages/Purchases.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CreateCourse from "./pages/CreateCourse.jsx";
import AdminCourses from "./pages/AdminCourses.jsx";
import EditCourse from "./pages/EditCourse.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/purchases" element={<Purchases />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-course" element={<CreateCourse />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/edit-course/:id" element={<EditCourse />} />
      </Routes>
    </>
  );
}

export default App;
