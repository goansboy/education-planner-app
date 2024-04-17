// src/routes/calendarRoutes.js
const express = require('express');
const router = express.Router();
const Calendar = require('../models/Calendars');
const isAuthenticated = require('../middleware/isAuthenticated'); // Assuming you have an auth middleware


// Get all calendars for the current user
router.get('/view-calendars', isAuthenticated, async (req, res) => {
    try {
        const calendars = await Calendar.find({ owner: req.user._id }).exec();
        console.log("Calendars fetched: ", calendars);  // Log the calendars to ensure they're fetched
        if (!calendars) {
            throw new Error('No calendars found');
        }
        res.render('pages/viewCalendars', {
            title: 'View Your Calendars - EduPlanner',
            user: req.user,
            calendars: calendars
        });
    } catch (error) {
        console.error('Failed to fetch calendars:', error);
        res.status(500).render('errorPage', { message: 'Failed to load calendars' });
    }
});


// Post route to create a new calendar
router.post('/calendars', isAuthenticated, async (req, res) => {
    try {
        const newCalendar = new Calendar({
            name: req.body.name,
            owner: req.user._id // Assumes req.user is populated from session
        });
        await newCalendar.save();
        res.status(201).json(newCalendar);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Get all calendars for a user
router.get('/calendars', isAuthenticated, async (req, res) => {
    try {
        const calendars = await Calendar.find({ owner: req.user._id });
        res.status(200).json(calendars);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Add an event to a specific calendar
router.post('/calendars/:calendarId/events', isAuthenticated, async (req, res) => {
    try {
        const calendar = await Calendar.findById(req.params.calendarId);
        if (!calendar) {
            return res.status(404).json({ message: "Calendar not found" });
        }
        calendar.events.push(req.body);
        await calendar.save();
        res.status(201).json(calendar);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Post route to create a new calendar
router.post('/calendars', isAuthenticated, async (req, res) => {
    try {
        // Create a new calendar object using the form data
        const newCalendar = new Calendar({
            name: req.body.calName,
            owner: req.user._id  // Assuming req.user is populated from session
        });

        // Save the new calendar to the database
        await newCalendar.save();

        // Redirect to the view calendars page or somewhere relevant
        res.redirect('/view-calendars');
    } catch (error) {
        console.error('Failed to create new calendar:', error);
        res.status(500).send('Error creating new calendar');
    }
});

module.exports = router;
