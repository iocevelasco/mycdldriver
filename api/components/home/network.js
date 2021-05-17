const express = require('express');
const auth = require('../../middelware/auth');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', function (req, res) {
  controller.getDashboardAdmin()
    .then((dashboard) => {
      switch (dashboard.status) {
        case 200:
          response.success(req, res, dashboard.message, 200);
          break;
        default:
          response.error(req, res, dashboard.message, dashboard.status, dashboard.detail);
      }

    }).catch(e => {
      console.log(e);
      response.error(req, res, 'Unexpected network Error', 500, e);
    });
});

module.exports = router;