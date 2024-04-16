const Calendar = require('../models/Calendar');

// Create a new calendar
exports.createCalendar = async (req, res) => {
    try {
        const newCalendar = new Calendar({
            name: req.body.name,
            owner: req.user._id, // Assuming you have user authentication
            events: req.body.events
        });
        const savedCalendar = await newCalendar.save();
        res.status(201).json(savedCalendar);
    } catch (error) {
        res.status(400).json({ message: 'Error creating calendar', error: error });
    }
};

// Get all calendars for a user
exports.getCalendars = async (req, res) => {
    try {
        const calendars = await Calendar.find({ owner: req.user._id });
        res.json(calendars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching calendars', error: error });
    }
};

// Get a single calendar by ID
exports.getCalendarById = async (req, res) => {
    try {
        const calendar = await Calendar.findById(req.params.id);
        if (!calendar) {
            return res.status(404).json({ message: 'Calendar not found' });
        }
        res.json(calendar);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the calendar', error: error });
    }
};

// Update a calendar
exports.updateCalendar = async (req, res) => {
    try {
        const updatedCalendar = await Calendar.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Returns the updated document
        );
        res.json(updatedCalendar);
    } catch (error) {
        res.status(400).json({ message: 'Error updating calendar', error: error });
    }
};

// Delete a calendar
exports.deleteCalendar = async (req, res) => {
    try {
        const deletedCalendar = await Calendar.findByIdAndDelete(req.params.id);
        res.json({ message: 'Calendar deleted', deletedCalendar });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting calendar', error: error });
    }
};
