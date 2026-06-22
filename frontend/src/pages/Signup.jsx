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
      <div className="border p-6 rounded-lg shadow-md flex flex-col gap-8 w-96">
        <h1 className="text-2xl font-bold text-center">Signup</h1>

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
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleSignup}
        >
          Sign up
        </button>
        <p className="text-center text-sm">{message}</p>
      </div>
    </div>
  );
}

export default Signup;
