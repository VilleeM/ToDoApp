const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth');
const {User} = require('../models/user');
const {validate} = require('../models/todo');


router.get('/', auth, async (req, res) => {
    const {_id} = res.locals;
    const user = await User.findById({_id: _id});
    if (!user) return res.status(400).send(`No user found with id: ${_id}`);

    res.status(200).send(_.pick(user, ['_id', 'username', 'todos']))
});

router.post('/todo', auth, async (req, res) => {
    const {_id} = res.locals;
    const validatedToDo = validate(req.body);
    if (validatedToDo.error !== null) {
        res.status(400).send(validatedToDo.error.details[0].message)
    } else {
        await User.findOneAndUpdate({_id: _id},
            {$push: {todos: validatedToDo.value,  $position : 1}},
            {new: true})
            .then((user) => res.status(201).send(_.omit(user.toObject(), ['password'])))
            .catch(_ => res.status(404).send());
    }
});


router.put('/todo/:id', auth, async (req, res) => {
    const {_id} = res.locals;
    const todoId = req.params.id;
    const validatedToDo = validate(req.body);

    if (validatedToDo.error !== null) {
        res.status(400).send(validatedToDo.error.details[0].message)
    } else {
        await User.findOneAndUpdate(
            {_id: _id, 'todos._id': todoId},
            {
                "$set": {
                    "todos.$.content": req.body.content,
                    "todos.$.done": req.body.done
                },
            },
            {new: true}
        ).then((user) => res.status(200).send(_.omit(user.toObject(), ['password'])))
            .catch(_ => res.status(404).send());

    }
});


router.delete('/todo/:id', auth, async (req, res) => {
    const id = req.user._id;
    const todoId = req.params.id;

    await User.findOneAndUpdate(
        {_id: id},
        {$pull: {todos: {_id: todoId}}},
        {new: true}
    ).then((user) => res.status(200).send(_.omit(user.toObject(), ['password'])))
        .catch(_ => res.status(404).send());

});


module.exports = router;
