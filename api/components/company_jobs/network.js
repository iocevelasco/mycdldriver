const express = require('express');
const auth = require('../../middelware/auth');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', function (req, res) {
    controller.getJob(req.query)
    .then((jobList) => {
        response.success(req, res, jobList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.get('/detail/:id', function (req, res) {
    
    controller.getJob({id: req.params.id})
    .then((jobList) => {
        response.success(req, res, jobList[0], 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.get('/private', auth(2), function (req, res) {
    const filter = {
        company: req.user.company || null
    };
    controller.getJob(filter)
    .then((jobList) => {
        response.success(req, res, jobList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/', auth(2), function (req, res) {
    controller.addJob(req.body, req.user.company)
    .then((Job) => {
        response.success(req, res, Job, 201);
    }).catch(e => {
        console.log(e);
        response.error(req, res, 'Unexpected Error', 500);
    });
});

router.post('/applyjob', auth(1), function (req, res) {
    req.body.user = req.user._id;
    controller.applyJob(req.body)
    .then((Job) => {
        response.success(req, res, Job, 200);
    }).catch(e => {
        console.log(e);
        response.error(req, res, 'Unexpected Error', 500);
    });
});

router.patch('/:id', auth(2), function (req, res){
    controller.updateJob(req.params.id, req.body, req.user.company)
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