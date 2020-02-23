const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');


router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    console.log(error)
    if (error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({username: req.body.username});
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['username', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = user.generateAuthToken();

    user.save()
        .then(() => res.status(200).cookie('jwtToken', token).send())
        .catch((err) =>
            res.status(400).send(err.message));

});

module.exports = router;
