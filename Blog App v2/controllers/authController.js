// controllers/authController.js
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  // Check user credentials (e.g., username and password)
  const { username, password } = req.body;

  // Replace this with your authentication logic
  if (username === 'example' && password === 'password') {
    const user = { username: 'example' };

    // Generate a JWT token
    const token = jwt.sign(user, 'your-secret-key');

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  login,
};
