const express = require('express');
const app = express();
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add JSON Web Token for authentication

const users = require('./users');
const posts = []; // Array to store blog posts
const secretKey = 'your-secret-key'; // Replace with a secure secret key
const port = 1212;

app.use(express.json());

// Middleware for authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Get users
app.get('/users', (req, res) => {
    res.json(users);
});

// Create users
app.post('/users', async (req, res) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = { username: req.body.username, password: hashedPassword };
        users.push(user);

        saveUsersToFile();

        res.json({ message: 'User created successfully', user }).status(201);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

// Save users to file
function saveUsersToFile() {
    const usersJSON = JSON.stringify(users, null, 2);
    fs.writeFileSync('users.json', usersJSON);
}

// User login
app.post('/users/login', async (req, res) => {
    const user = users.find((user) => user.username === req.body.username);
    if (user == null) {
        return res.status(400).send('Username is incorrect');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign(user, secretKey);
            res.json({ accessToken });
        } else {
            return res.status(400).send('Password is incorrect');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

// Get all posts
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts);
});

// Add a new post
app.post('/posts', authenticateToken, (req, res) => {
    const newPost = { title: req.body.title, content: req.body.content };
    posts.push(newPost);
    res.json({ message: 'Post added successfully', post: newPost }).status(201);
});

// Update a post
app.put('/posts/:postId', authenticateToken, (req, res) => {
    const postId = req.params.postId;
    // Implement logic to update the post with postId
    res.json({ message: 'Post updated successfully' });
});

// Delete a post
app.delete('/posts/:postId', authenticateToken, (req, res) => {
    const postId = req.params.postId;
    // Implement logic to delete the post with postId
    res.json({ message: 'Post deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
