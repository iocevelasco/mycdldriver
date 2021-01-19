const express = require('express');
const jwt = require('jsonwebtoken');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const config = require('../../config');
const controller = require('../user/controller');
const aws = require('aws-sdk');

const fs = require('fs');

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
  region: config.s3.region
});
const s3 = new aws.S3();

router.post('/', storage.single('logo'), function (req, res) {
    const logo = req.file;

    var params = {
        ACL: 'public-read',
        Bucket: config.s3.bucketName,
        Body: fs.createReadStream(req.file.path),
        Key: `${req.file.filename}`
    };
    console.log('s3 params', params);

    s3.upload(params, (err, data) => {
        if (err) {
            response.error(req, res, 'Error occured while trying to upload to S3 bucket', 500, err);
        }
        if (data) {
            fs.unlinkSync(req.file.path);
            const locationUrl = data.Location;
            try{
                const token = req.header('Authorization').replace('Bearer ', '');
                const data = jwt.verify(token, config.JWT_KEY);
                if(data._id){
                    controller.setPhoto(data._id, locationUrl)
                    .then((data) => {
                        response.success(req, res, {'file': locationUrl}, 201);
                    })
                    .catch(e => {
                        response.error(req, res, 'Error interno', 500, e);
                    });
                }
            }catch(e){
                
            }
            response.success(req, res, {'file': locationUrl}, 201);
        }
    });
});

router.post('/delete', function (req, res) {
    const foto = req.body.foto;
    const params = { 
        Bucket: config.s3.bucketName, 
        Key: foto 
    };
    s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);  // error
        else     console.log('Borrado');                 // deleted
    });
    try{
        fs.unlinkSync("." + foto);
        response.success(req, res, "delete success", 201);
    }catch(e){
        console.log(e);
        response.error(req, res, 'informacion invalida', 500);
    }
});

module.exports = router;