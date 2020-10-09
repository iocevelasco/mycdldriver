const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./api/config');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
    });
    
    passport.use(new GoogleStrategy({
		clientID: config.oauth.google.clientID,
		clientSecret: config.oauth.google.clientSecret,
		callbackURL: config.oauth.google.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
		process.nextTick(function() {
		  console.log(profile);
		  return done(null, profile);
		});
	  }
    ));
};