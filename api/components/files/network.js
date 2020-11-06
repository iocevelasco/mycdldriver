const express = require('express');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const config = require('../../config');

router.post('/', storage.single('logo'), function (req, res) {
    const logo = req.file;
    if(logo){
        const fileUrl = logo ? config.publicRoute + config.filesRoute + '/' + logo.filename : '';
        response.success(req, res, {'file': fileUrl}, 201);
    }else{
        response.error(req, res, 'informacion invalida', 500);
    }
});

module.exports = router;