import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../HomePage.css";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container-top">
      <h2 className="gradient-text">Welcome to HomePage</h2>

      <div className="container">
        <p>Visit The DashBoard Page :</p>
        <Link to={"/dashboard"} className="link">
          <button className="home-button">DashBoard</button>
        </Link>
      </div>

      <br />
      <br />
      <div className="container">
        <p>Want To LogOut Of This Application :</p>
        <button className="home-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
