const express = require('express');
const passport = require('passport');
const User = require('../models/User');  // Import the User model correctly
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/login');  // Redirect to login page after successful registration
    } catch (error) {
        if (error.code === 11000) {  // Check for duplicate key error code
            return res.status(400).render('pages/register', {
                message: 'Username already taken. Please try another.',
                title: 'Register - EduPlanner'
            });
        }
        // Handle other types of errors
        res.status(500).json({ message: "Error registering new user", error });
    }
});

router.get('/register', (req, res) => {
    // Ensure a default message is set, even if it's an empty string.
    res.render('pages/register', { title: 'Register', message: '' });
});


// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.get('/login', (req, res) => {
    res.render('pages/login', { title: 'Login' });  
});

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error('Logout failed', err);
            return res.status(500).send('Logout failed');
        }
        // If there is a session, destroy it:
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) {
                    console.error('Failed to destroy the session during logout', err);
                    return res.status(500).send('Failed to destroy the session');
                }
                res.redirect('/'); // Redirect to the homepage or a login page after logout
            });
        } else {
            res.redirect('/');
        }
    });
});


module.exports = router;
