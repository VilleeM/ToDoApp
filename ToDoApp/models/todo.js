const mongoose = require('mongoose');
const Joi = require('joi');


const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    content: {
        type: String,
    },
    done: {
        type: Boolean,
    },
}, {
    timestamps: true
});

function validateToDo(todo) {
    const toDoSchema = {
        content: Joi.string().min(1).max(255).required(),
        done: Joi.boolean().required()
    };
    return Joi.validate(todo, toDoSchema);
}

exports.validate = validateToDo;
exports.toDoSchema = toDoSchema;
