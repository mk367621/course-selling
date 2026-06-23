import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { API_URL } from "../config";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function handleLogin() {
    

    if (!email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    setMessage("");
    const adminData = {
      email,
      password,
    };
    setLoading(true);
    axios
      .post(`${API_URL}/admin/signin`, adminData)
      .then((response) => {
        console.log(response.data);

        localStorage.setItem("adminToken", response.data.token);
        setLoading(false);
        navigate("/admin/dashboard");

        
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.response?.data?.message || "Invalid email or password");
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
          {message && (
            <p className="text-red-500 text-sm font-medium">{message}</p>
          )}

          <PrimaryButton onClick={handleLogin}>
            {loading ? "Logging in..." : "Login"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
