import React, { useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useTaskCounts } from "./../Home/Home.jsx";

const Profile = () => {
  const { totalTaskCount, taskDoneCount, taskCount } = useTaskCounts();

  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const userName = localStorage.getItem("user-name");
  const userEmail = localStorage.getItem("e-mail");

  const { username, email, password } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const imagehandler = (e) => {
    setImage(e.target.files[0]);
  };

  const setProfile = async () => {
    let responseData;
    let email = localStorage.getItem("e-mail");
    let formData = new FormData();
    formData.append("product", image);

    await fetch("https://daily-do-server.vercel.app/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      body:{ email, formData},
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      let image = responseData.image_url;
      
      await fetch('https://daily-do-server.vercel.app/auth/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          imageLink: image,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Profile Updated") : alert("Failed");
        });
    }
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

  const getInitial = () => {
    console.log(userName);
    if (userName) {
      return userName.charAt(0).toUpperCase();
    } else {
      console.log("Username not found in local storage.");
      return null;
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
    <div className="profile-content">
      {userName && userEmail ? (
        <div className="userProfile">
          <div className="userProfile-pic">
            <label htmlFor="file-input">
              <img
                onChange={setProfile}
                src={image ? URL.createObjectURL(image) : upload_area}
                className="userProfile-thumnail"
                alt=""
              />
            </label>
            <input
              onChange={imagehandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>
          <p className="userName">{userName}</p>
          <p className="email">{userEmail}</p>
          <div>
            <p>Total Tasks:{taskCount}</p>
            <p>Total Tasks for Today:{totalTaskCount}</p>
            <p>Total Task Done for Today:{taskDoneCount}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Profile;
