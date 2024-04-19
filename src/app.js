const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const calendarRoutes = require('./routes/calendarRoutes');
require('./config/passport')(passport);
require('dotenv').config({ path: 'C:/Users/austi/OneDrive/Desktop/EduPlanner/.env' });
const app = express();


const connectDB = require('./config/db');

// Middlewares
app.use((req, res, next) => {
    res.locals.user = req.user; // req.user is defined if a user is authenticated
    next();
});
// Serve static files from node_modules
app.use('/scripts', express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Setup session with MongoDB storage
app.use(session({
    secret: 'yourSecretKey',  // This should be an environment variable
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,  // Ensure your MongoDB URI is sourced from environment variables
        collectionName: 'sessions'  // This is optional and defaults to 'sessions'
    })
}));


// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use('/', calendarRoutes);
app.use('/', require('./routes/canvasRoutes'));
app.use('/', require('./routes/index'));
app.use(authRoutes);


console.log('Connecting to MongoDB at URI:', process.env.MONGODB_URI);
connectDB(); //Connect to database

// Setting EJS as the template engine
app.set('view engine', 'ejs');

// Routes



// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
