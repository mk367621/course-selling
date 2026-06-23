import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import PrimaryButton from "../components/PrimaryButton";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastType, setToastType] = useState("success");
  const navigate = useNavigate();
  function handleLogin() {
    

    if (!email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    setMessage("");
    const userData = {
      email,
      password,
    };
    setLoading(true);
    axios
      .post(`${API_URL}/user/signin`, userData)
      .then((response) => {
        console.log(response.data);

        localStorage.setItem("token", response.data.token);
        setToastType("success");
        setToast("Login successful");
        setLoading(false);
        setTimeout(() => {
          navigate("/courses");
        }, 1000);

        
      })
      .catch((err) => {
        console.log(err.response?.data);
        setLoading(false);
        setMessage(err.response?.data?.message || "Invalid email or password");
      });
  }
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);
  return (
    <div className=" flex  min-h-screen justify-center items-center">
      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-lg flex flex-col gap-6 w-105">
        <h1 className="text-3xl font-semibold text-center text-slate-900">
          Login
        </h1>
        <input
          className="w-full border border-slate-300 bg-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          value={email}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border border-slate-300 bg-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
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
        {toast && <Toast message={toast} type={toastType} />}
      </div>
    </div>
  );
}

export default Login;
