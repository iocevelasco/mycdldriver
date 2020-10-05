const express = require('express');
const next = require('next');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const router_front = require("./network/routes"); 
const router_api = require("./api/network/routes");
const config = require('./api/config');
const db = require('./api/db');
const bodyParser = require('body-parser');

const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const uid = require('uid-safe');
const authRoutes = require("./auth-routes");

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
      }

      const sessionConfig = {
        secret: uid.sync(18),
        cookie: {},
        resave: false,
        saveUninitialized: true
      };
      if (server.get('env') === 'production') {
        console.log("Entrando en el bucle de produccion");
        sessionConfig.cookie.secure = true;
        sessionConfig.proxy = true;
        server.set('trust proxy', 1);
      }
      server.use(session(sessionConfig));
      const auth0Strategy = new Auth0Strategy(
        {
          domain: config.auth0.domain,
          clientID: config.auth0.clientID,
          clientSecret: config.auth0.clientSecret,
          callbackURL: config.auth0.callbackURL,
          passReqToCallback: true
        },
        function(req, accessToken, refreshToken, extraParams, profile, done) {
          return done(null, profile);
        }
      );
      passport.use(auth0Strategy);
      passport.serializeUser((user, done) => done(null, user));
      passport.deserializeUser((user, done) => done(null, user));
      server.use(passport.initialize());
      server.use(passport.session());
      server.use(authRoutes);
      const restrictAccess = (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect("/login");
        next();
      };
      server.use("/profile", restrictAccess);

      router_api(server);
      router_front(server, dev, nextApp);

      server.listen(config.port, (err) => {
        if (err) throw err;
        console.log(`Listening on http://localhost:${config.port}`);
      });
    });
}
