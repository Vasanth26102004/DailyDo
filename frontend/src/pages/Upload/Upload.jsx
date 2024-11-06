import React, { useState } from "react";
import "./Upload.css";
import { Link } from "react-router-dom";

import upload_area from "../../assets/upload_area.svg";
import shape from "../../assets/shape-blue.png";

const Upload = () => {
  const [image, setImage] = useState(false);
  const [newUser, setNewUser] = useState({
    image: "",
    username: "",
    email: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const imagehandler = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      // Prepare form data for image upload
      const formData = new FormData();
      formData.append("user", image);
  
      // Upload image
      const uploadResponse = await fetch(`https://daily-do-server.vercel.app/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
  
      const uploadData = await uploadResponse.json();
  
      if (!uploadData.success) {
        alert("Image upload failed");
        return;
      }
  
      // If image upload is successful, proceed with profile update
      const userId = localStorage.getItem("user-id");
      const updatedUser = { ...newUser, image: uploadData.image_url }; // Add image URL to user data
  
      const updateResponse = await fetch(`https://daily-do-server.vercel.app/auth/update/${userId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      const updateData = await updateResponse.json();
  
      if (updateData.success) {
        alert("Profile Updated");
      } else {
        alert("Profile update failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="upload-container">
      <img class="background" src={shape} alt="" />
      <h4 className="upload-header">Update Yoyr Profile on Here!</h4>
      <form className="upload-field">
        <p>Profile Picture</p>
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="upload-thumbnail"
            alt="Upload Area"
          />
        </label>
        <input
          onChange={imagehandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
        <p>Username</p>
        <input
          className="username"
          type="text"
          name="username"
          value={newUser.username}
          onChange={changeHandler}
          placeholder="New Username"
        />
        <p>E-Mail</p>
        <input
          className="email"
          type="email"
          name="email"
          value={newUser.email}
          onChange={changeHandler}
          placeholder="New E-Mail Address"
        />
        <button id="submit-button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <Link to="/dashboard">
          <button id="cancel-button" type="cancel">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Upload;
