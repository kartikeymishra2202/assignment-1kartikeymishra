import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
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
        console.log(err);
      });
  };
  return (
    <div>
      <h2>Welcome to my Application</h2>
      <p>This is the homepage content.</p>
      <button className="home">
        {" "}
        <Link to={"/dashboard"}>DashBoard</Link>{" "}
      </button>
      <br />
      <br />
      <button className="home" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
