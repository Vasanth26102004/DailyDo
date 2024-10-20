import React, { useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return setErrorMessage("Please fill in all required fields.");
    }

    try {
      const response = await fetch(`https://daily-do-server.vercel.app/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("user-id", responseData.user._id);
        localStorage.setItem("user-name", responseData.user.name);
        navigate("/");
      } else {
        setErrorMessage(responseData.errors || "Authentication failed.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !username) {
      return setErrorMessage("Please fill in all required fields.");
    }

    try {
      const response = await fetch(`https://daily-do-server.vercel.app/auth/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
 console.log()
      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("user-id", responseData.user._id);
        localStorage.setItem("user-name", responseData.user.name);
        navigate("/");
      } else {
        setErrorMessage(responseData.errors || "Authentication failed.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const submitForm = () => {
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="profile-content">
      <div className="loginsignup-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="loginsignup-field">
          {!isLogin && (
            <input
              name="username"
              value={username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              required={!isLogin}
            />
          )}
          <input
            name="email"
            value={email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            name="password"
            value={password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button onClick={submitForm}>Continue</button>
        <p className="loginsignup-login">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="terms" id="terms" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;