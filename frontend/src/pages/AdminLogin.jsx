import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
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
    <div className=" flex  min-h-screen justify-center items-center">
      <div className="border p-6 rounded-lg shadow-md flex flex-col gap-8 w-96">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <input
          className="border p-2 rounded-md"
          value={email}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter password"
        />

        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
