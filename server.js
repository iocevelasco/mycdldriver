const express = require('express');
const next = require('next');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const router_front = require("./network/routes"); 
const router_api = require("./api/network/routes");
const config = require('./api/config');
const db = require('./api/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MemcachedStore = require('connect-memjs')(session);
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const dev = config.dev;
db(config.dbUrl);

// Multi-process to utilize all CPU cores.
if (!dev && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const nextApp = next({ dir: '.', dev });

  nextApp.prepare()
    .then(() => {
      const server = express();
      server.use(bodyParser.json());
      
      server.use(session({
        secret: 'ClydeIsASquirrel',
        resave: 'false',
        saveUninitialized: 'false',
        /*store: new MemcachedStore({
          servers: [process.env.MEMCACHIER_SERVERS],
          prefix: '_session_'
        })*/
      }));

      if (!dev) {
        // Enforce SSL & HSTS in production
        server.use(function(req, res, next) {
          var proto = req.headers["x-forwarded-proto"];
          if (proto === "https") {
            res.set({
              'Strict-Transport-Security': 'max-age=31557600' // one-year
            });
            return next();
          }
          res.redirect("https://" + req.headers.host + req.url);
        });
      }else {
        //server.use(express.errorHandler());
      }

      //CONFIGURACION PASSPORT
      passport.serializeUser(function(user, done) {
        done(null, user);
      });
      passport.deserializeUser(function(obj, done) {
        done(null, obj);
      });
      server.use(passport.initialize());
      server.use(passport.session());
        
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
      passport.use(new FacebookStrategy({
        clientID			: config.oauth.facebook.clientID,
        clientSecret	: config.oauth.facebook.clientSecret,
        callbackURL	 : config.oauth.facebook.callbackURL,
        profileFields : ['id', 'displayName', /*'provider',*/ 'photos']
      }, function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done(null, profile);
      }));
      //CONFIGURACION PASSPORT

      //AUTENTICACION
      server.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
      });
      server.get('/auth/google', passport.authenticate('google', {
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
        ]
      }),
      function(req, res) {});
      server.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/'
      }),
      function(req, res) {
        res.redirect('/profile');
      });

      server.get('/auth/facebook', passport.authenticate('facebook'));
      server.get('/auth/facebook/callback', passport.authenticate('facebook',
        { successRedirect: '/profile', failureRedirect: '/' }
      ));

      const restrictAccess = (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect("/");
        next();
      };
      server.use("/profile", restrictAccess);
      //AUTENTICACION

      router_api(server);
      router_front(server, dev, nextApp);

      server.listen(config.port, (err) => {
        if (err) throw err;
        console.log(`Listening on http://localhost:${config.port}`);
      });
    });
}
