const express = require('express');
const auth = require('../../middelware/auth');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.post('/', auth(2), function (req, res) {
    controller.setArticle(req.body, req.user)
      .then((service) => {
        switch (service.status) {
          case 201:
            response.success(req, res, service.message, 201);
            break;
          default:
            response.error(req, res, service.message, service.status);
        }
  
      }).catch(e => {
          console.log(e);
        response.error(req, res, 'Unexpected network Error', 500, e);
      });
});

router.get('/', function (req, res) {
    controller.getArticles()
      .then((data) => {
        switch (data.status) {
          case 200:
            response.success(req, res, data.message, 200);
            break;
          default:
            response.error(req, res, data.message, data.status);
        }
  
      }).catch(e => {
          console.log(e);
        response.error(req, res, 'Unexpected network Error', 500, e);
      });
});

router.get('/:id', function (req, res) {
    controller.getArticle(req.params.id)
      .then((service) => {
        switch (service.status) {
          case 201:
            response.success(req, res, service.message, 201);
            break;
          default:
            response.error(req, res, service.message, service.status);
        }
  
      }).catch(e => {
          console.log(e);
        response.error(req, res, 'Unexpected network Error', 500, e);
      });
});

router.get('/category/:id', function (req, res) {
    controller.getCategory(req.params.id)
      .then((service) => {
        switch (service.status) {
          case 201:
            response.success(req, res, service.message, 201);
            break;
          default:
            response.error(req, res, service.message, service.status);
        }
  
      }).catch(e => {
          console.log(e);
        response.error(req, res, 'Unexpected network Error', 500, e);
      });
});

router.patch('/', auth(2), function (req, res) {
    controller.updateArticle(req.body)
      .then((service) => {
        switch (service.status) {
          case 200:
            response.success(req, res, service.message, 200);
            break;
          default:
            response.error(req, res, service.message, service.status);
        }
  
      }).catch(e => {
        response.error(req, res, 'Unexpected network Error', 500, e);
      });
});

router.delete('/:id', auth(2), function (req, res) {
    controller.deleteArticle(req.params.id)
      .then((service) => {
        switch (service.status) {
          case 200:
            response.success(req, res, service.message, 200);
            break;
          default:
            response.error(req, res, service.message, service.status);
        }
  
      }).catch(e => {
        response.error(req, res, 'Unexpected network Error', 500, e);
      });
});

module.exports = router;