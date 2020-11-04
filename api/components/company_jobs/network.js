const express = require('express');
const auth = require('../../middelware/auth');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', function (req, res) {
    const filter = null;
    controller.getJob(filter)
    .then((jobList) => {
        response.success(req, res, jobList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.get('/private', auth(2), function (req, res) {
    const filter = req.user.company || null;
    controller.getJob(filter)
    .then((jobList) => {
        response.success(req, res, jobList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/', auth(2), storage.single('logo'), function (req, res) {
    controller.addJob(req.body, req.user.company, req.file)
    .then((Job) => {
        response.success(req, res, Job, 201);
    }).catch(e => {
        console.log(e);
        response.error(req, res, 'informacion invalida', 500);
    });
});

router.patch('/:id', auth(2), storage.single('logo'), function (req, res){
    controller.updateJob(req.params.id, req.body, req.user.company, req.file)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            console.log(e);
            response.error(req, res, e.message, e.status);
        });
});

router.delete('/:id', auth(2), function (req, res) {
    controller.deleteJob(req.params.id, req.user.company)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            console.log(e);
            response.error(req, res, e.message, e.status);
        });
});

module.exports = router;