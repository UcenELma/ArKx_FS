const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1919;

const postsRoutes = require('./routes/postsRoutes');

//
//const errorController = require('./controllers/errorController');

app.use(bodyParser.json());


app.use('/posts', postsRoutes);

// 
//Error handling middleware
//app.use(errorController.handleNotFound);
// app.get('/incorrect-route', (req, res) => {
//   res.send('This route intentionally does not exist');
// });

//app.use(errorController.handleServerError);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
