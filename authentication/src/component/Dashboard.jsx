import React, { useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/verify")
      .then((res) => {
        if (res.data.status) {
          // User is verified
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  return <div>Dash Board here !!</div>;
};

export default Dashboard;
