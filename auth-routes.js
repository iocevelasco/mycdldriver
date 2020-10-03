const express = require("express");
const passport = require("passport");
const config = require('./api/config');

const router = express.Router();

router.get("/login", passport.authenticate("auth0", {
  scope: "openid email profile"
}), (req, res) => res.redirect("/profile"));

router.get("/callback", (req, res, next) => {
  passport.authenticate("auth0",  (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();

  res.redirect(`https://${config.auth0.domain}/logout?client_id=${config.auth0.clientID}&returnTo=${config.auth0.baseURL}`);
});

module.exports = router;
