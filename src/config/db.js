const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.error('Database connection failed. Exiting now...', err);
        process.exit(1);
    }
};

module.exports = connectDB;
