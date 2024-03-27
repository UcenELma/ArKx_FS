const express = require('express');
const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;


const createUser = new Schema({
    name: {
        type: String, 
        required: true 
    },
    email: {
        type: String,
        unique: true, 
        required: true, 
        lowercase: true,
        trim: true 
    },
    password: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
});

let User = mongoose.model('User', createUser);

module.exports = User;