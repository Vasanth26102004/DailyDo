import React, { useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";

import login_img from "../../assets/loginimg1.png";
import shape from "../../assets/shape-blue.png";

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const userName = localStorage.getItem("user-name");
  const userEmail = localStorage.getItem("e-mail");

  const { username, email, password } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return setErrorMessage("Please fill in all required fields.");
    }

    try {
      const response = await fetch(
        `https://daily-do-server.vercel.app/auth/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("user-id", responseData.user._id);
        localStorage.setItem("user-name", responseData.user.name);
        localStorage.setItem("e-mail", responseData.user.email);
        navigate("/dashboard");
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
      const response = await fetch(
        `https://daily-do-server.vercel.app/auth/signup`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );
      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("user-id", responseData.user._id);
        localStorage.setItem("user-name", responseData.user.name);
        localStorage.setItem("e-mail", responseData.user.email);
        navigate("/dashboard");
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

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-id");
    localStorage.removeItem("user-name");
    localStorage.removeItem("e-mail");
    window.location.replace("/");
  };
  return (
    <div className="profile-container">
      <img class="background" src={shape} alt=""/>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        <p className="error-message">{"  "}</p>
      )}
      <h2>{!isLogin ? "Welcome to On Board!" : "Welcome Back!"}</h2>
      {!isLogin ? (
        <p id="text">Let's Help to meet up your Tasks.</p>
      ) : (
        <img id="img" src={login_img} alt="" />
      )}
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
      {isLogin ? <p className="forget">Forget password?</p> : ""}
      <Link to="/dashboard">
      <button className="loginsignup-btn" onClick={submitForm}>
        {isLogin ? "Login" : "Register"}
      </button>
      </Link>
      <p className="loginsignup-login">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <span onClick={() => setIsLogin(false)}>Sign In</span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span onClick={() => setIsLogin(true)}>Sign Up</span>
          </>
        )}
      </p>
    </div>
  );
};

export default Profile;
