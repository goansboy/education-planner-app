const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, { message: 'Incorrect username.' });

                user.comparePassword(password, function (err, isMatch) {
                    if (err) return done(err);
                    if (isMatch) return done(null, user);
                    return done(null, false, { message: 'Incorrect password.' });
                });
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
