import React, { useState } from "react";
import "./Upload.css";
import { Link } from "react-router-dom";

import upload_area from "../../assets/upload_area.svg";
import shape from "../../assets/shape-blue.png";

const Upload = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const userId = localStorage.getItem("user-id");

  useEffect(() => {
    fetch(`https://daily-do-server.vercel.app/auth/update/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://your-server.com/auth/update/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      data.success
        ? res.send("Profile updated successfully")
        : res.send("Failed to update profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <img class="background" src={shape} alt="" />
      <h4 className="upload-header">Update Yoyr Profile on Here!</h4>
      <form onsubmit={handleSubmit} className="upload-field">
        <p>Username</p>
        <input
          className="username"
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          placeholder="New Username"
        />
        <p>E-Mail</p>
        <input
          className="email"
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="New E-Mail Address"
        />
        <button id="submit-button" type="submit">
          Submit
        </button>
        <Link to="/dashboard">
          <button id="cancel-button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default Upload;
