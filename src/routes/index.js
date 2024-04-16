const express = require('express');
const router = express.Router();
const canvasAPI = require('../api/canvasAPI');

// Route for the home page
router.get('/', (req, res) => {
    // Passing both userName and title
    res.render('pages/index', { title: 'Home - EduPlanner', userName: 'User' });
});

// Route for viewing calendars
router.get('/view-calendars', (req, res) => {
    // Include a title when rendering the view
    res.render('pages/viewCalendars', { title: 'View Calendars - EduPlanner' });
});

// Route for editing calendars
router.get('/edit-calendars', (req, res) => {
    // Include a title when rendering the view
    res.render('pages/editCalendars', { title: 'Edit Calendars - EduPlanner' });
});

// Route for listing courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await canvasAPI.getCourses();
        // Passing courses and a title to the rendered view
        res.render('pages/courses', { courses, title: 'Courses - EduPlanner' });
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        res.status(500).send('Error fetching courses');
    }
});

module.exports = router;
