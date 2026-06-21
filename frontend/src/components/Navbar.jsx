import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
  return (
    <div>
      <Link to="/login">Login</Link> {"  "}
      <Link to="/signup">Sign up</Link>
      {"  "}
      <Link to="/courses">courses</Link>
      {"   "}
      <Link to="/purchases">purchases</Link>
    </div>
  );
}

export default Navbar;
