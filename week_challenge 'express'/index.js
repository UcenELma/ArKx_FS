const express = require("express");
const app = express();
const PORT = 1919;

const postRoutes = require('./routes/postRoutes');


app.use(express.json());
app.use('/posts', postRoutes);


app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})