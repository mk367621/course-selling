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
    <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-sm">C</span>
        </div>

        <div>
          <h1 className="text-slate-900 font-bold text-xl leading-none">
            CourseHub
          </h1>

          <p className="text-xs text-slate-500 mt-0.5">Learn • Build • Grow</p>
        </div>
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
              ? "text-indigo-600 font-semibold"
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
            className="
  px-4
  py-2
  rounded-xl
  bg-slate-100
  text-slate-700
  font-medium
  hover:bg-slate-200
  transition-all
  duration-200
"
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
