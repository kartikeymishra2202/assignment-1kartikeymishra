// PostForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PostForm = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (postId) {
      axios
        .get(`http://localhost:3000/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
        });
    }
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = postId
      ? `http://localhost:3000/api/posts/${postId}`
      : `http://localhost:3000/api/posts`;
    const method = postId ? "PUT" : "POST";

    axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { title, content },
    })
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">{postId ? "Update" : "Create"} Post</button>
    </form>
  );
};

export default PostForm;
