const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const app = express();
const passport = require('passport');
require('./config/passport')(passport);
require('dotenv').config({ path: 'C:/Users/austi/OneDrive/Desktop/EduPlanner/.env' });

const connectDB = require('./config/db');

console.log(path.join(__dirname, 'public'));  // This will print the absolute path used for the static files

// Middlewares
app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secret', // Choose a strong secret for session encryption
    resave: false,
    saveUninitialized: false
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());


console.log('Connecting to MongoDB at URI:', process.env.MONGODB_URI);
connectDB(); //Connect to database

// Setting EJS as the template engine
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/canvasRoutes'));
app.use('/', require('./routes/index'));
app.use(authRoutes);


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
