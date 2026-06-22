import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  function handleSignup() {
    if (!email || !password) {
      console.log("Please fill all fields");
      return;
    }

    axios
      .post("http://localhost:3000/user/signup", {
        email,
        password,
      })
      .then((response) => {
        setMessage(response.data.message);
        navigate("/login");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  }
  return (
    <div className=" flex  min-h-screen justify-center items-center">
      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-lg flex flex-col gap-6 w-105">
        <>
          <h1 className="text-3xl font-semibold text-center text-slate-900">
            Create Account
          </h1>

          <p className="text-center text-slate-500 text-sm">
            Join CourseHub and start learning today
          </p>
        </>

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
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200"
          onClick={handleSignup}
        >
          Sign up
        </button>
        <p className="text-center text-sm text-slate-500">{message}</p>
      </div>
    </div>
  );
}

export default Signup;
