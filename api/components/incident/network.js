const express = require('express');
const auth = require('../../middelware/auth');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.post('/', auth(2), function (req, res) {
  controller.setIncident(req.body, req.user)
    .then((incident) => {
      switch (incident.status) {
        case 201:
          response.success(req, res, incident.message, 201);
          break;
        default:
          response.error(req, res, incident.message, incident.status);
      }

    }).catch(e => {
      response.error(req, res, 'Unexpected network Error', 500, e);
    });
});

router.get('/:id', auth(2), function (req, res) {
  controller.getIncident(req.params.id)
    .then((incident) => {
      switch (incident.status) {
        case 200:
          response.success(req, res, incident.message, 200);
          break;
        default:
          response.error(req, res, incident.message, incident.status);
      }
    }).catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.delete('/:id', auth(2), function (req, res) {
  controller.deleteIncident(req.params.id)
    .then((incident) => {
      switch (incident.status) {
        case 200:
          response.success(req, res, incident.message, 200);
          break;
        default:
          response.error(req, res, incident.message, incident.status);
          break;
      }
    }).catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e);
    });
});

module.exports = router;