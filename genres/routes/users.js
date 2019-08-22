const {User, validateUser} = require('../models/user'); 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
   const user = await User.findById(req.user._id).select('-password');
   res.send(user);
})

router.post('/', async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let user = await User.findOne({ email: req.body.email });
        if(user) res.status(400).send('User already registered');

        user = new User(pick(req.body, ['name', 'email', 'password']));

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(pick(user, ['_id', 'name', 'email']));

    } catch(err) {
        res.status(400).send(err)
    }
    
});

module.exports = router;