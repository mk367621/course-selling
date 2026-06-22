import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div>
      <Link to="/login">Login</Link> {"  "}
      <Link to="/signup">Sign up</Link>
      {"  "}
      <Link to="/courses">courses</Link>
      {"   "}
      <Link to="/purchases">purchases</Link> {"  "}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
