import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import home_img from "../../assets/homeimg1.png";
import shape from "../../assets/shape-blue.png";

const Home = () => {
    const authToken = localStorage.getItem("user-id");

  return (
    <div className="home-container">
      <img className="background" src={shape} alt="" />
      <img id="img" src={home_img} alt="" />
      <h1 className="home-header">
        Gets things with <span>Daily-Do</span>
      </h1>
      <p className="home-description">
        Labore deserunt proident aliqua eu ipsum culpa culpa anim. Tempor in ea
        reprehenderit Lorem voluptate Lorem culpa dolor anim. Eu quis ipsum amet
        occaecat occaecat consectetur enim quis aliqua.
      </p>
      <Link onClick={changePage} to={authToken ? "/dashboard" : "/profile"}>
        <button className="starter-btn">Get Started</button>
      </Link>
    </div>
  );
};

export default Home;
