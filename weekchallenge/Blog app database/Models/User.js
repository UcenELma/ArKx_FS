const express = require('express');
const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;


const createUser = new Schema({
    name: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
});

let User = mongoose.model('User', createUser);

module.exports = User;