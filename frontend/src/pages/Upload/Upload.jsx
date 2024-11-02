import React, { useState } from "react";
import "./Upload.css";
import { Link } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
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
          className="description"
          type="text"
          name="description"
          value={newTask.description}
          onChange={changeHandler}
          placeholder="Describe your Task"
        />
        <p>Username</p>
        <input
          className="description"
          type="text"
          name="description"
          value={newTask.description}
          onChange={changeHandler}
          placeholder="Describe your Task"
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
