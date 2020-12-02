const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/state', function (req, res) {
    controller.getStates()
    .then((state) => {
        switch (state.status){
            case 200:
                response.success(req, res, state.result, 200);
                break;
            case 400:
                response.error(req, res, state.message, state.status, state.detail);
                break;
            case 404:
                response.error(req, res, state.message, state.status, state.detail);
                break;
            default:
                response.success(req, res, state, 200);
                break;
        }
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.get('/cities/:id', function (req, res) {
    controller.getCities(req.params.id)
    .then((cities) => {
        switch (cities.status){
            case 200:
                response.success(req, res, cities.result, 200);
                break;
            case 400:
                response.error(req, res, cities.message, cities.status, cities.detail);
                break;
            case 404:
                response.error(req, res, cities.message, cities.status, cities.detail);
                break;
            default:
                response.success(req, res, cities, 200);
                break;
        }
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

module.exports = router;
