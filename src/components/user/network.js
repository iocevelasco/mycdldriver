const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', function (req, res) {
    const filterUsers = req.query.user || null;
    controller.getUsers(filterUsers)
    .then((userList) => {
        response.success(req, res, userList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/', function (req, res) {
    
    controller.addUser(req.body)
    .then((fullUser) => {
        response.success(req, res, fullUser, 201);
    }).catch(e => {
        response.error(req, res, 'informacion invalida', 400, e);
    });
    
});

router.patch('/:id', function (req, res){
    controller.updateUser(req.params.id, req.body)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

router.delete('/:id', function (req, res) {
    controller.deleteUser(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;