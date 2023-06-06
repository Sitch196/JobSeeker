import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/companies/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("login failed");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("login error", error);
    }

    console.log("Logged in...");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Login:
        <input type="text" name="email" value={email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Log In</button>
      <br />
      <p>
        Don't have an account? Create one <Link to="/signup">here</Link>.
      </p>
    </form>
  );
};

export default Login;
