const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'posts.json');

const getAllPosts = () => {
  const data = fs.readFileSync(postsPath);
  return JSON.parse(data);
};

const createPost = (post) => {
    const posts = getAllPosts();
    posts.push(post);
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  };
  
const deletePost = (id) => {
    const posts = getAllPosts();
    const updatedPosts = posts.filter(post => post.id !== id);
    fs.writeFileSync(postsPath, JSON.stringify(updatedPosts, null, 2));
  };
  
const updatePost = (id, newPost) => {
    const posts = getAllPosts();
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex > -1) {
      posts[postIndex] = newPost;
      fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    }
  };
  
module.exports = { getAllPosts, createPost, deletePost, updatePost };
