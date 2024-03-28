const express = require('express');
const app = express();
const cors = require('cors');


const router = require('./Routes/Routes');
const port = 2500;
require('./DB/ConnectDB');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/', router)

app.listen(port, () => {
    console.log(`server is runing at http://localhost:${port}`);
});
