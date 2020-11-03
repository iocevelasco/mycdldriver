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
const userController = require('./api/components/user/controller');
const MemcachedStore = require('connect-memjs')(session);
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const axios = require('axios');

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
      
      

      if (!dev) {
        server.use(session({
          secret: 'ClydeIsASquirrel',
          resave: 'false',
          saveUninitialized: 'false',
           store: new MemcachedStore({
             servers: config.memcached,
             prefix: '_session_'
           })
        }));
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
        server.use(session({
          secret: 'ClydeIsASquirrel',
          resave: 'false',
          saveUninitialized: 'false'
        }));
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
            userController.loginProviderUser(profile.id, profile.emails[0].value, 1)
            .then((fullUser) => {
              console.log(fullUser);
              return done(null, fullUser);
            })
            .catch(e => {
              newUser = {
                "name": profile.name.givenName,
                "lastname": profile.name.familyName,
                "google_id": profile.id,
                "photo": profile.photos[0].value,
                "email": profile.emails[0].value,
                "typeUser": 0
              };
              console.log(newUser);
              return done(null, newUser);
            });
          });
        }
      ));
      passport.use(new FacebookStrategy({
        clientID			: config.oauth.facebook.clientID,
        clientSecret	: config.oauth.facebook.clientSecret,
        callbackURL	  : config.oauth.facebook.callbackURL,
        profileFields : ['id', 'displayName', 'emails', 'photos']
      }, function(accessToken, refreshToken, profile, done) {
        userController.loginProviderUser(profile.id, profile.emails[0].value, 2)
        .then((fullUser) => {
          return done(null, fullUser);
        })
        .catch(e => {
          newUser = {
            "name": profile.name.givenName,
            "lastname": profile.name.familyName,
            "facebook_id": profile.id,
            "photo": profile.photos[0].value,
            "email": profile.emails[0].value,
            "typeUser": 0
          };
          return done(null, newUser);
        });
      }));
      //CONFIGURACION PASSPORT

      //AUTENTICACION
      server.get('/logout', async (req, res) => {
        try{
          const header = {
            headers: { Authorization: `Bearer ${req.session.passport.user.token}` }
          };
          await axios.post(config.host + ':' + config.port + '/api/user/logoutall', {}, header);
        }catch(e){
          console.log('[ logout ]', e);
        }
        
        req.logout();
        res.redirect('/');
      });
      server.get('/deleteuser', async (req, res) => {
        try{
          let cabecera = {
            headers: { Authorization: `Bearer ${req.session.passport.user.token}` }
          };
          console.log('header', cabecera);
          const result = await axios.delete(config.host + ':' + config.port + '/api/user/' + req.session.passport.user._id , {}, cabecera);
          console.log('result', result);
          req.logout();
          res.redirect('/');
        }catch(e){
          console.log('[ deleteUser ]', e);
        }
      });
      server.get('/auth/google', passport.authenticate('google', {
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
        ]
      }),
      function(req, res) {});
      server.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/error'
      }),
      function(req, res) {
        if(req.session.passport.user.typeUser === 1){
          res.redirect('/userProfile/driver/profile');
        }else if(req.session.passport.user.typeUser === 2){
          res.redirect('/userProfile/company');
        }else{
          res.redirect('/userProfile');
        }
      });

      server.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));
      server.get('/auth/facebook/callback', passport.authenticate('facebook', { 
        failureRedirect: '/error' }
      ),
      function(req, res) {
        if(req.session.passport.user.typeUser === 1){
          res.redirect('/userProfile/driver');
        }else if(req.session.passport.user.typeUser === 2){
          res.redirect('/userProfile/company');
        }else{
          res.redirect('/userProfile');
        }
      });

      const restrictAccess = (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect("/");
        next();
      };
      server.use("/userProfile", restrictAccess);
      //AUTENTICACION

      router_api(server);
      router_front(server, dev, nextApp);

      server.listen(config.port, (err) => {
        if (err) throw err;
        console.log(`Listening on http://localhost:${config.port}`);
      });
    });
}
