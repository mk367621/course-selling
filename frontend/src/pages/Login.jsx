import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin() {
    console.log("Button is clicked");

    if (!email || !password) {
      console.log("Please fill up the fields.");
      return;
    }
    const userData = {
      email,
      password,
    };
    axios
      .post("http://localhost:3000/user/signin", userData)
      .then((response) => {
        console.log(response.data);

        localStorage.setItem("token", response.data.token);

        console.log("Token Saved");
      });
  }
  return (
    <div>
      <h1>Login</h1>
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
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter password"
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
