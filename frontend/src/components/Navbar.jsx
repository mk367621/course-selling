import { NavLink, Link, useNavigate } from "react-router-dom";
import React from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-200">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
          C
        </div>

        <h1 className="text-slate-900 text-2xl font-semibold">CourseHub</h1>
      </div>
      <div className="flex gap-8 items-center">
        {!token && (
          <Link
            className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
            to="/login"
          >
            Login
          </Link>
        )}

        {!token && (
          <Link
            className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
            to="/signup"
          >
            Sign up
          </Link>
        )}

        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-medium"
              : "text-slate-600 hover:text-slate-900 transition-colors duration-200"
          }
        >
          Courses
        </NavLink>

        {token && (
          <NavLink
            to="/purchases"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-medium"
                : "text-slate-600 hover:text-slate-900 transition-colors duration-200"
            }
          >
            Purchases
          </NavLink>
        )}

        {token && (
          <button
            className="border border-slate-300 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
