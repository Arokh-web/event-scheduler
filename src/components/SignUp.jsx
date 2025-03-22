import React, { useState, useContext } from "react";
import { AuthContext } from "../App";

const SignUp = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You are now signed up!");
        window.location.href = "/signin";
      })
      .catch((error) => {
        console.log("Sign-up failed: ", error);
      });
  };

  return (
    <div className="sign-container">
      <h2>SignUp</h2>
      <form className="sign-form" onSubmit={handleCreateUser}>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-style"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-style"
        />
        <button type="submit" className="button-style">
          Create User
        </button>
      </form>
    </div>
  );
};

export default SignUp;
