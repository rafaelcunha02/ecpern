const users = require('express').Router();
const db = require('../models');
const { User } = db;

//GET ALL USERS

users.get('/', async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json(error);
    }
});



//GET USER BY ID
users.get('/id/:id', async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


//GET USER BY USERNAME

users.get('/:username', async (req, res) => {
    try {
        const user = await User.getUserByUsername(req.params.username);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


users.post('/change-email', async (req, res) => {
    try {
        const user = await User.getUserById(req.body.id);
        if (user) {
            user.email = req.body.email;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = users;
