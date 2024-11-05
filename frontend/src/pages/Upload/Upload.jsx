import React, { useState } from "react";
import "./Upload.css";
import { Link } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
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

  return (
    <div className="upload-container">
      <form className="upload-field">
        <div className="upload-area">
          <label htmlFor="file-input">
            <img
              src={file ? URL.createObjectURL(file) : "upload_area.png"}
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
        </div>
        <p>Username</p>
        <input
          className="username"
          type="text"
          name="username"
          value={newTask.description}
          onChange={changeHandler}
          placeholder="New Username"
        />
        <p>E-Mail</p>
        <input
          className="email"
          type="email"
          name="email"
          value={newTask.description}
          onChange={changeHandler}
          placeholder="Describe your TaskNew E-Mail Address"
        />
        <button id="submit-button" type="submit">
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
