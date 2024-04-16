// src/routes/calendarRoutes.js
const express = require('express');
const router = express.Router();
const Calendar = require('../models/Calendar');
const { isLoggedIn } = require('../middleware/auth'); // Assuming you have an auth middleware

// Post route to create a new calendar
router.post('/calendars', isLoggedIn, async (req, res) => {
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
router.get('/calendars', isLoggedIn, async (req, res) => {
    try {
        const calendars = await Calendar.find({ owner: req.user._id });
        res.status(200).json(calendars);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Add an event to a specific calendar
router.post('/calendars/:calendarId/events', isLoggedIn, async (req, res) => {
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

module.exports = router;
