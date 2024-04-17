// middleware/setupDatabase.js
const mongoose = require('mongoose');

module.exports = function connectDB() {
    const dbURI = process.env.MONGODB_URI;
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Database connection successful'))
        .catch(err => console.error('Database connection error:', err));
}
