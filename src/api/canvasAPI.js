const axios = require('axios');
require('dotenv').config();

const api = axios.create({
    baseURL: process.env.CANVAS_API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${process.env.CANVAS_API_TOKEN}`
    }
});

/**
 * Fetch a user's courses from Canvas.
 */
const getCourses = async () => {
    try {
        const response = await api.get('/courses');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return null;
    }
};

/**
 * Fetch assignments for a specific course.
 */
const getCourseAssignments = async (courseId) => {
    try {
        const response = await api.get(`/courses/${courseId}/assignments`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching assignments for course ${courseId}:`, error);
        return null;
    }
};

module.exports = {
    getCourses,
    getCourseAssignments
};
