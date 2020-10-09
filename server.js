const express = require('express');
const next = require('next');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const router_front = require("./network/routes"); 
const router_api = require("./api/network/routes");
const config = require('./api/config');
const db = require('./api/db');
const bodyParser = require('body-parser');
var passport = require('passport');
require('./passport')(passport);

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
      server.use(express.session({ secret: config.JWT_KEY }));

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
        server.use(express.errorHandler());
      }

      router_api(server);
      router_front(server, dev, nextApp);

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
        failureRedirect: '/login'
      }),
      function(req, res) {
        res.redirect('/');
      });
      server.listen(config.port, (err) => {
        if (err) throw err;
        console.log(`Listening on http://localhost:${config.port}`);
      });
    });
}
