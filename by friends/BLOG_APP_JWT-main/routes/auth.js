const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dataUser = require("../dataUser.json")

router.post('/login', (req, res) => {
	const {username,  password} = req.body
	const user = {name: username, password:password}
	const findUser = dataUser.filter(x => x.name == username && x.password == password)
	if (!findUser[0]) return res.send("username/password wrong")
	const token = jwt.sign(user, "my_scrt")
	res.json({TOKEN:token})
});
module.exports = router;