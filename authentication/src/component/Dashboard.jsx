// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => setPosts(posts.filter((post) => post._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <PostForm postId={editingPostId} />
      <h3>Your Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <button onClick={() => setEditingPostId(post._id)}>Edit</button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
