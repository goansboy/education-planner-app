// src/routes/calendarRoutes.js
const express = require('express');
const router = express.Router();
const Calendar = require('../models/Calendars');
const isAuthenticated = require('../middleware/isAuthenticated');

// Get all calendars for the current user
router.get('/view-calendars', isAuthenticated, async (req, res) => {
    try {
        const calendars = await Calendar.find({ owner: req.user._id }).exec();
        console.log("Calendars fetched: ", calendars);
        if (!calendars || calendars.length === 0) {
            return res.status(404).render('errorPage', { message: 'No calendars found' });
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

// Get all calendars for a user
router.get('/calendars', isAuthenticated, async (req, res) => {
    try {
        const calendars = await Calendar.find({ owner: req.user._id });
        res.status(200).json(calendars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching calendars', error: error });
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
        res.redirect(`/edit-calendars`);  // Redirect to a view page
    } catch (error) {
        res.status(400).json({ message: "Error adding event", error: error });
    }
});


// Display the form for adding a new event to a specific calendar
router.get('/calendars/:calendarId/add-event', isAuthenticated, async (req, res) => {
    try {
        const calendar = await Calendar.findById(req.params.calendarId);
        if (!calendar) {
            return res.status(404).send('Calendar not found');
        }
        res.render('pages/addEvent', {
            calendar: calendar,
            title: 'Add Event to ' + calendar.name
        });
    } catch (error) {
        console.error('Error displaying add event form:', error);
        res.status(500).send('Error displaying add event form');
    }
});

// Get events for a specific calendar
router.get('/calendars/:calendarId/events', isAuthenticated, async (req, res) => {
    try {
        const calendar = await Calendar.findById(req.params.calendarId).populate('events');
        if (!calendar) {
            return res.status(404).send('Calendar not found');
        }
        res.render('pages/calendarEvents', {
            calendar: calendar,
            events: calendar.events,
            title: 'Manage Events: ' + calendar.name
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Error fetching events');
    }
});

// Post route to create a new calendar
router.post('/calendars', isAuthenticated, async (req, res) => {
    try {
        const newCalendar = new Calendar({
            name: req.body.calName,
            owner: req.user._id
        });
        await newCalendar.save();
        res.redirect('/view-calendars');
    } catch (error) {
        console.error('Failed to create new calendar:', error);
        res.status(500).send('Error creating new calendar');
    }
});

router.get('/edit-calendars', isAuthenticated, async (req, res) => {
    try {
        const calendars = await Calendar.find({ owner: req.user._id });
        res.render('pages/editCalendars', {
            calendars: calendars,
            title: 'Edit Your Calendars'
        });
    } catch (error) {
        console.error('Failed to fetch calendars:', error);
        res.status(500).render('errorPage', { message: 'Failed to load calendars' });
    }
});

// Handling POST request to set a calendar as the main one
router.post('/set-main-calendar', isAuthenticated, async (req, res) => {
    try {
        await Calendar.updateMany({ owner: req.user._id }, { $set: { isMain: false } });
        await Calendar.findByIdAndUpdate(req.body.calendarId, { isMain: true });
        res.redirect('/edit-calendars');
    } catch (error) {
        console.error('Error setting main calendar:', error);
        res.status(500).send('Error setting main calendar');
    }
});

// Get a specific calendar by ID
router.get('/calendars/:calendarId', isAuthenticated, async (req, res) => {
    try {
        const calendar = await Calendar.findById(req.params.calendarId);
        if (!calendar) {
            return res.status(404).send('Calendar not found');
        }
        res.render('pages/calendarDetail', {
            calendar: calendar,
            title: 'Edit Calendar: ' + calendar.name
        });
    } catch (error) {
        console.error('Error fetching calendar:', error);
        res.status(500).send('Error fetching calendar');
    }
});

// Post route to update calendar details
router.post('/calendars/:calendarId', isAuthenticated, async (req, res) => {
    try {
        const updates = { name: req.body.name };
        const calendar = await Calendar.findByIdAndUpdate(req.params.calendarId, updates, { new: true });
        console.log("Updated calendar details:", calendar);
        res.redirect('/calendars/' + req.params.calendarId);
    } catch (error) {
        console.error('Error updating calendar:', error);
        res.status(500).send('Error updating calendar');
    }
});

module.exports = router;
