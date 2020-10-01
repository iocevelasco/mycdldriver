const express = require('express');
const auth = require('../../middelware/auth');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', function (req, res) {
    const filter = req.query.legalNumber || null;
    controller.getCompany(filter)
    .then((companyList) => {
        response.success(req, res, companyList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/', auth, function (req, res) {

    controller.addCompany(req.body, req.user)
    .then((fullCompany) => {
        response.success(req, res, fullCompany, 201);
    }).catch(e => {
        response.error(req, res, 'informacion invalida', 400, e);
    });
});

module.exports = router;