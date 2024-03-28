const express = require('express')
const verifyToken = (req, res, next) => {
    let HeaderToken = req.headers['authorization'];
    console.log(typeof HeaderToken);
    if (HeaderToken) {
        let token = HeaderToken.split(' ')[1];
        console.log(token);
        req.token = token;
        next()
    }
    else (
        res.status(401).json({ message: 'you have to log in first ' })
    )
}

module.exports = verifyToken