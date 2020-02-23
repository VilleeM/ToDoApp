const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/todo', auth, async (req, res) => {
    const {_id} = res.locals;
    const user = await User.findById({_id: _id});

    user.todos = user.todos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    const todos = user.todos.filter(todo => !todo.done);
    const todosCompleted = user.todos.filter(todo => todo.done);

    res.render('todo', {'todos': todos, 'todosCompleted': todosCompleted});
});

router.get('/register', async (req, res) => {
    const {error} = req.query;
    res.render('register', {error: error});
});

router.get('/login', async (req, res) => {
    try {
        const {jwtToken} = req.cookies;
        jwt.verify(jwtToken, process.env.jwtSecret);
        res.redirect('/todo');
    } catch (err) {
        const {error} = req.query;
        res.render('login', {error: error});
    }
});


module.exports = router;
