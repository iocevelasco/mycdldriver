const express = require('express');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const config = require('../../config');
const fs = require('fs');

router.post('/', storage.single('logo'), function (req, res) {
    const logo = req.file;
    if(logo){
        const fileUrl = logo ? config.publicRoute + config.filesRoute + '/' + logo.filename : '';
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