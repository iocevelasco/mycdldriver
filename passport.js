const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});
};