// controllers/postController.js
const { Post, posts } = require('../models/postModel');

const getAllPosts = (req, res) => {
  res.json(posts);
};

const getPostById = (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

const createPost = (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post(posts.length + 1, title, content);
  posts.push(newPost);
  res.json(newPost);
};

const updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const post = posts.find((p) => p.id === postId);

  if (post) {
    post.title = title;
    post.content = content;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

const deletePost = (req, res) => {
  const postId = req.params.id;
  const index = posts.findIndex((p) => p.id === postId);

  if (index !== -1) {
    const deletedPost = posts.splice(index, 1)[0];
    res.json(deletedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
