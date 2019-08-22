const {User} = require('../models/user'); 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) res.status(400).send('Invaild email');

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword) res.status(400).send('Invaild password');
    const token = user.generateAuthToken();
    res.send(token);

});

function validate(req) {
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(1024).required()
    }

    return Joi.validate(req, schema)
  }

module.exports = router;