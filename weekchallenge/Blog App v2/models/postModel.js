// models/postModel.js
const posts = [];

class Post {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

module.exports = {
  Post,
  posts,
};
