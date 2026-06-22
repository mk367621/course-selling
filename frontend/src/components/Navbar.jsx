import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <h1 className="text-blue-600 text-2xl font-bold">Coursehub</h1>
      <div className="flex gap-4 items-center">
        <Link className="hover:text-blue-600 transition-colors" to="/login">
          Login
        </Link>

        <Link className="hover:text-blue-600 transition-colors" to="/signup">
          Sign up
        </Link>

        <Link className="hover:text-blue-600 transition-colors" to="/courses">
          courses
        </Link>

        <Link className="hover:text-blue-600 transition-colors" to="/purchases">
          purchases
        </Link>

        <button
          className="bg-red-500 px-3 py-1 text-white hover:bg-red-600 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
