import React from "react";
import './Navbar.css';
import home from "../../assets/home.png";
import alltask from "../../assets/list.png";
import addtask from "../../assets/add.png";
import setting from "../../assets/setting.png";
import profile from "../../assets/profile.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="my-tasks">
        <div className="home-btn">
        <Link to="/">
        <img width="40px" className="home-btn" src={home} alt="" />
          </Link>
        </div>
        <div className="all-task">
          <Link to="/tasklist">
          <img width="40px" className="task-btn" src={alltask} alt="" />
          </Link>
        </div>
        <div className="add-task">
          <Link to="/addtask">
          <img width="50px" className="add-btn" src={addtask} alt="" />
          </Link>
        </div>
        <div className="setting">
        <Link to="/settings">
          <img width="40px" className="setting-btn" src={setting} alt="" />
          </Link>
        </div>
        <div className="loginsignup">
        <Link to="/profile">
        <img width="40px" className="profile-btn" src={profile} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
