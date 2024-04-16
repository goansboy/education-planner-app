const express = require('express');
const router = express.Router();
const { getCourses, getCourseAssignments } = require('../api/canvasAPI');

// Route to display all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await getCourses();
        res.render('courses', { courses }); // Assuming you have a 'courses.ejs' in views/pages
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        res.status(500).send('Failed to load courses');
    }
});

router.get('/courses/:id/assignments', async (req, res) => {
    try {
        const assignments = await getCourseAssignments(req.params.id);
        res.render('assignments', { assignments, courseId: req.params.id }); // Assuming you have an 'assignments.ejs'
    } catch (error) {
        console.error(`Failed to fetch assignments for course ${req.params.id}:`, error);
        res.status(500).send('Failed to load assignments');
    }
});

module.exports = router;
