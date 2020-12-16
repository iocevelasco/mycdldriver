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

router.get('/customlist', function (req, res) {
    controller.getCustomList()
    .then((customList) => {
        response.success(req, res, customList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/myjobs', auth(), function (req, res) {
    let query = {};
    if(req.user.typeUser == 1){
        query = {driver: req.user._id};
    }else{
        query = {company: req.user.company};
    }
    controller.getJobsApply(query)
    .then((customList) => {
        response.success(req, res, customList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/applys', auth(2), function (req, res) {
    let query = {company: req.user.company};
    controller.getCompanyJobsApply(query)
    .then((list) => {
        response.success(req, res, list, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.get('/staff', auth(2), function (req, res) {
    let query = {company: req.user.company};
    controller.getCompanyStaffApply(query)
    .then((list) => {
        response.success(req, res, list, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/detail', function (req, res) {
    let apply = {
        id: req.body.id
    };
    if(req.body.driver){
        apply.driver = req.body.driver;
    }
    controller.getJob(apply)
    .then((jobList) => {
        response.success(req, res, jobList, 200);
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

router.post('/apply', auth(1), function (req, res) {
    req.body.driver = req.user._id;
    controller.applyJob(req.body)
    .then((Job) => {
        switch(Job.status){
            case 200:
                response.success(req, res, Job.message, Job.status);
                break;
            case 500:
                response.error(req, res, Job.message, Job.status);
                break;
        }
    }).catch(e => {
        console.log(e);
        response.error(req, res, 'Unexpected Error', 500);
    });
});

router.patch('/change_status', auth(2), function (req, res) {
    const data = req.body;
    controller.setStatus(data.id, data.status)
    .then((Job) => {
        switch (Job.status){
            case 200:
                response.success(req, res, Job.message, 200);
                break;
            case 500:
                response.error(req, res, Job.message, 500);
                break;
            default:
                response.success(req, res, Job.message, 200);
                break;
        }
    }).catch(e => {
        console.log(e);
        response.error(req, res, 'Unexpected Error', 500);
    });
});

router.patch('/change_rank', auth(2), function (req, res) {
    const data = req.body;
    if(data.ranking < 0 || data.ranking > 5){
        response.error(req, res, "Invalid rank", 500);
        return;
    }
    controller.setRating(data.id, data.ranking, data.commnet)
    .then((Job) => {
        console.log('[ RESPONSE ]', Job);
        switch (Job.status){
            case 200:
                response.success(req, res, Job.message, 200);
                break;
            default:
                response.error(req, res, Job.message, Job.status, Job.detail);
                break;
        }
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
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