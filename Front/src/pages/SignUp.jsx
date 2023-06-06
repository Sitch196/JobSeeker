import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [founded, setFounded] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      email,
      password,
      passwordConfirm,
      founded,
      size,
      location,
      description,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/companies/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      console.log("Signup successful", data);
    } catch (error) {
      console.error("Signup error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Founded In:
        <input
          type="text"
          value={founded}
          onChange={(e) => setFounded(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Size:
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? Log in <Link to="/login">here</Link>.
      </p>
    </form>
  );
};

export default SignupForm;
