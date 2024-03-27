const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')




const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // res.render('Login.ejs', { alert: errors.array() })
        res.json(errors)
    }
    else {
        let finduser = await User.findOne({ email: req.body.email });

        if (finduser) {
            let isMatch = await bcrypt.compare(req.body.password, finduser.password);
            if (isMatch) {
                let user = { email: req.body.email, password: req.body.password };
                jwt.sign({ user }, "secret@123", (err, token) => {
                    if (err) {
                        res.status(401).json({ Error: err });
                        console.log(err);
                    }
                    else {
                        res.json({ Token: token })
                    }
                })
                return;
            }
            else {
                res.json({ message: "password incorrect" })
            }

        }
        else {
            res.json({ message: "email or password incorrect !!!!" });
        }

    }
}

const AddUser = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        res.render('Signup.ejs', { alert: errors.array() })
    }
    else {
        let hashPassword = bcrypt.hashSync(req.body.password, 10);
        let newUser = new User;
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = hashPassword;
        await newUser.save();
        console.log('new user added !!!');
    }
}

const getUsers = (req, res) => {
    jwt.verify(req.token, 'secret@123', (err, user) => {
        if (err) {
            res.status(403)
        }
        else {
            res.send(user);
        }
    })
}


module.exports = { AddUser, login, getUsers };