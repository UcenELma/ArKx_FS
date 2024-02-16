const Post = require('../models/post');

const getAllPosts = (req, res) => {
  const posts = Post.getAllPosts();
  res.json(posts);
};

const createPost = (req, res) => {
  Post.createPost(req.body);
  res.status(201).send('Post created');
};

const deletePost = (req, res) => {
    Post.deletePost(req.params.id);
    res.status(200).send('Post deleted');
  };
  
const updatePost = (req, res) => {
    Post.updatePost(req.params.id, req.body);
    res.status(200).send('Post updated');
  };
  
module.exports = { getAllPosts, createPost, deletePost, updatePost };
