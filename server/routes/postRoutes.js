import express from "express";
import { Post } from "../models/post.js";
import { verifyUser } from "./user.js";

const router = express.Router();

// Create a new post
router.post("/posts", verifyUser, async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({
    title,
    content,
    author: req.user.id,
  });
  await newPost.save();
  res.json({ status: true, message: "Post created", post: newPost });
});

// Get all posts
router.get("/posts", verifyUser, async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.json(posts);
});

// Get a single post
router.get("/posts/:id", verifyUser, async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "username"
  );
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
});

// Update a post
router.put("/posts/:id", verifyUser, async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (post.author.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this post" });
  }
  post.title = title;
  post.content = content;
  await post.save();
  res.json({ status: true, message: "Post updated", post });
});

// Delete a post
router.delete("/posts/:id", verifyUser, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (post.author.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this post" });
  }
  await Post.findByIdAndDelete(req.params.id);
  //   await post.remove();
  res.json({ status: true, message: "Post deleted" });
});

// Like a post
router.post("/posts/:id/like", verifyUser, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  post.likes += 1;
  await post.save();
  res.json({ status: true, message: "Post liked", post });
});

// Add a comment to a post
router.post("/posts/:id/comment", verifyUser, async (req, res) => {
  const { content } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const comment = {
    user: req.user.id,
    content,
  };
  post.comments.push(comment);
  await post.save();
  res.json({ status: true, message: "Comment added", post });
});

export { router as PostRoute };
