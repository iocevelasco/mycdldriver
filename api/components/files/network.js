const express = require('express');
const jwt = require('jsonwebtoken');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const config = require('../../config');
const controller = require('../user/controller');

const fs = require('fs');

router.post('/', storage.single('logo'), function (req, res) {
    const logo = req.file;
    if(logo){
        const fileUrl = logo ? config.publicRoute + config.filesRoute + '/' + logo.filename : '';
        try{
            const token = req.header('Authorization').replace('Bearer ', '');
            console.log('[ TOKEN ]', token);
            console.log('[ JWT_KEY ]', config.JWT_KEY);
            const data = jwt.verify(token, config.JWT_KEY);
            if(data._id){
                controller.setPhoto(data._id, fileUrl)
                .then((data) => {
                    response.success(req, res, {'file': fileUrl}, 201);
                })
                .catch(e => {
                    response.error(req, res, 'Error interno', 500, e);
                });
            }
        }catch(e){
            console.log(e);
        }
        response.success(req, res, {'file': fileUrl}, 201);
    }else{
        response.error(req, res, 'informacion invalida', 500);
    }
});

router.post('/delete', function (req, res) {
    const foto = req.body.foto;
    console.log(foto);
    try{
        fs.unlinkSync("." + foto);
        response.success(req, res, "delete success", 201);
    }catch(e){
        console.log(e);
        response.error(req, res, 'informacion invalida', 500);
    }
});

module.exports = router;