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
    <div>
      <h1>Signup page</h1>
      <br />
      <br />
      <input
        value={email}
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        value={password}
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleSignup}>Sign up</button>
      <p>{message}</p>
    </div>
  );
}

export default Signup;
