const express = require('express');
const router = express.Router();
const canvasAPI = require('../api/canvasAPI');
const isAuthenticated = require('../middleware/isAuthenticated'); // Ensure this middleware is properly set up

// Route for the home page
router.get('/', (req, res) => {
    // Pass the actual user object if available
    res.render('pages/index', { title: 'Home - EduPlanner', user: req.user });
});

// Route for viewing calendars
router.get('/view-calendars', isAuthenticated, (req, res) => {
    // Ensure only authenticated users can access this page
    res.render('pages/viewCalendars', { title: 'View Calendars - EduPlanner', user: req.user });
});

// Route for editing calendars
router.get('/edit-calendars', isAuthenticated, (req, res) => {
    // Ensure only authenticated users can access this page
    res.render('pages/editCalendars', { title: 'Edit Calendars - EduPlanner', user: req.user });
});

// Route for listing courses
router.get('/courses', isAuthenticated, async (req, res) => {
    try {
        const courses = await canvasAPI.getCourses();
        // Pass courses along with the user context
        res.render('pages/courses', { courses, title: 'Courses - EduPlanner', user: req.user });
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        res.status(500).send('Error fetching courses');
    }
});

module.exports = router;
