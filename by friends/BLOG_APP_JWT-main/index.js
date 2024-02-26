const express = require('express');
const app = express();
//const router = require("./routes/postRoutes")

app.use(express.json())

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/postRoutes'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
















// const bodyParser = require('body-parser');
// app.use(bodyParser.json());