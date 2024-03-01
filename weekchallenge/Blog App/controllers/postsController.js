
const fs = require('fs');
const path = require('path');
const posts = require('../posts');

const postsController = {
  getAllPosts: (req, res) => {
    res.json(posts);
  },

  getPostById: (req, res) => {
    const id = req.params.id;
    const post = posts.find((p) => p.id === parseInt(id));

    if (!post) {
      res.status(404).send('Post not found');
    } else {
      res.json(post);
    }
  },

  createPost: (req, res) => {
    const { title, post } = req.body;

    // if (!title || !post) {
    //   return res.status(400).json({ message: 'Title and post content are required' });
    // }

    const maxId = posts.reduce((max, post) => (post.id > max ? post.id : max), 0);
    const newPost = {
      id: maxId + 1,
      title: title,
      post: post,
    };
    posts.push(newPost);

    
    const postsPath = path.join(__dirname, '../posts.json');
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

    res.status(201).json(posts);
  },

  updatePost: (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, post } = req.body;
    const existingPost = posts.find((post) => post.id === postId);

    if (existingPost) {
      existingPost.id = postId;
      existingPost.title = title;
      existingPost.post = post;
      res.json(existingPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  },

  deletePost: (req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
      posts.splice(index, 1);
      res.json(posts);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  },
};

module.exports = postsController;
