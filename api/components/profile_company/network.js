const express = require('express');
const auth = require('../../middelware/auth');
const storage = require('../../middelware/saveFile');
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

router.post('/', storage.single('imageCdl'), function (req, res) {

    controller.addCompany(req.body, req.user)
    .then((fullCompany) => {
        response.success(req, res, fullCompany, 201);
    }).catch(e => {
        response.error(req, res, 'informacion invalida', 400, e);
    });
});

router.delete('/:id', auth, function (req, res) {
    controller.deleteCompany(req.params.id)
        .then(() => {
            response.success(req, res, `Compañia ${req.params.id} eliminada`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
  });

module.exports = router;