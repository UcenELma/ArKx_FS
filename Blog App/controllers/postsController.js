const fs = require('fs');
const path = require('path');
const postsFilePath = path.join(__dirname, '../posts.json');

const readPostsFromFile = () => {
  const data = fs.readFileSync(postsFilePath);
  return JSON.parse(data);
};

const writePostsToFile = (postsData) => {
  const jsonData = JSON.stringify(postsData, null, 2);
  fs.writeFileSync(postsFilePath, jsonData);
};

const postsController = {
  getAllPosts: (req, res) => {
    const posts = readPostsFromFile();
    res.json(posts);
  },

  getPostById: (req, res) => {
    const id = req.params.id;
    const posts = readPostsFromFile();
    const post = posts.find((p) => p.id === Number(id));

    if (!post) {
      res.status(404).send('Post not found');
    } else {
      res.json(post);
    }
  },

  createPost: (req, res) => {
    const { title, post } = req.body;

    if (!title || !post) {
      return res.status(400).json({ message: 'Title and post content are required' });
    }

    const newPost = {
      id: Date.now(), // Use timestamp as a unique ID
      title: title,
      post: post,
    };

    const posts = readPostsFromFile();
    posts.push(newPost);
    writePostsToFile(posts);

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
