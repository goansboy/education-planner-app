// src/models/Calendar.js
const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

const calendarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    events: [eventSchema], // Embedding event schema within calendar
    isMain: { type: Boolean, default: false }
});

module.exports = mongoose.model('Calendar', calendarSchema);
