import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";


function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleLogin() {
    console.log("Button is clicked");

    if (!email || !password) {
      console.log("Please fill up the fields.");
      return;
    }
    const adminData = {
      email,
      password,
    };
    axios
      .post("http://localhost:3000/admin/signin", adminData)
      .then((response) => {
        console.log(response.data);

        localStorage.setItem("adminToken", response.data.token);
        navigate("/admin/dashboard");

        console.log("Token Saved");
      });
  }
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 text-center">
            Admin Login
          </h1>

          <p className="text-slate-500 text-center mt-2">
            Access your CourseHub dashboard
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <input
            className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
          />
          
          <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
