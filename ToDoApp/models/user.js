const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const {toDoSchema} = require('../models/todo');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    todos: [toDoSchema]
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.jwtSecret);
};


function validateUser(user) {
    const schema = {
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(8).max(1024).required()
    };

    return Joi.validate(user, schema);
}


exports.User = mongoose.model('User', userSchema);
exports.validate = validateUser;

