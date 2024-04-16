const express = require('express');
const passport = require('passport');
const User = require('../models/User');  // Import the User model correctly
const router = express.Router();

// Register route
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save(err => {
        if (err) return res.status(500).json(err);
        res.redirect('/login');
    });
});

// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true // Optionally enable flash messages
}));

router.get('/login', (req, res) => {
    res.render('pages/login', { title: 'Login' });  
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
