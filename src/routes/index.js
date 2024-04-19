const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated'); // Ensure this middleware is properly set up
const Calendar = require('../models/Calendars');


// src/routes/index.js
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const mainCalendar = await Calendar.findOne({ owner: req.user._id, isMain: true });
        if (mainCalendar) {
            res.render('pages/index', {
                title: 'Home - EduPlanner',
                user: req.user,
                events: mainCalendar.events // Directly pass the events array
            });
        } else {
            // Handle the scenario where no main calendar is found
            res.render('pages/index', {
                title: 'Home - EduPlanner',
                user: req.user,
                events: [] // Pass an empty array
            });
        }
        } catch (error) {
        console.error('Failed to fetch main calendar:', error);
        res.render('pages/index', {
            title: 'Home - EduPlanner',
            user: req.user,
            events: [] // pass an empty array if there was an error
        });
    }
});

// Route for viewing calendars
router.get('/view-calendars', isAuthenticated, (req, res) => {
    // Ensure only authenticated users can access this page
    res.render('pages/viewCalendars', { title: 'View Calendars - EduPlanner', user: req.user });
});


module.exports = router;
