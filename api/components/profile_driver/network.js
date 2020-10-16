const express = require('express');
const storage = require('../../middelware/saveFile');
const auth = require('../../middelware/auth');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

/**
 * @api {get} /driver getDriverList
 * @apiGroup Driver
 * @apiVersion 1.0.0
 * @apiSuccess {Object[]} driver Datos del conductor registrado
 * @apiSuccess {Id} driver._id ID de conductor
 * @apiSuccess {Number} driver.cdl Numero de identificacion del conductor
 * @apiSuccess {Date} driver.birthDate Fecha de nacimiento del conductor
 * @apiSuccess {String} driver.imageCdl Url de la imagen de la licencia del conductor
 * @apiSuccess {Number} driver.sex Sexo del conductor
 * @apiSuccess {String} driver.habilities Habilidades del conductor
 * @apiSuccess {String} driver.description Descripcion del conductor
 * @apiSuccess {Object[]} driver.user Listado de datos del conductor
 * @apiSuccess {Id} driver.user._id ID del usuario
 * @apiSuccess {String} driver.user.name Nombre del usuario
 * @apiSuccess {String} driver.user.lastname Apellido del usuario
 * @apiSuccess {String} driver.user.photo Url de la imagen del usuario
 * @apiSuccess {Date} driver.user.date Fecha de registro del usuario
 * @apiSuccess {String} driver.user.email Correo electronico del usuario
 * @apiSuccess {String} driver.user.password Clave cifrada electronico del usuario
 * @apiSuccess {Object[]} driver.user.tokens Listado de tokens de seguridad registrados por el usuario
 * @apiSuccess {Id} driver.user.tokens._id ID del token
 * @apiSuccess {String} driver.user.tokens.token Token de seguridad
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "error": 0,
  "mensaje": [
    {
      "_id": "5f735483938ab21aa0cb13dd",
      "cdl": 16134236,
      "birthDate": "1985-05-21T06:28:57.779Z",
      "imageCdl": "/public/files/RHyJbGRuQtNSFrdZrAONpU84_bGlrf_aoNAkaeSdRBPFfJj7RtO4mrUKOTjT_M1L.jpg",
      "sex": 1,
      "habilities": "Manejo muy bien la bicicleta",
      "description": "Me he caido muy poco",
      "user": {
        "_id": "5f72d42900e63838cce64756",
        "name": "Erick",
        "lastname": "Hernandez",
        "email": "takashi.onimaru@gmail.com",
        "password": "$2a$08$Yc/sqrnErDnpwoCSkfuGWOOq0exC4n7CEXCy5rKyz/Z5/G.2.c2E6",
        "photo": "/public/files/d1fMhe9_efe_lXtntP-fReUycKThnRdNVWjM4k9UcEpHtA-X59CCK3sYTgVnDXCo.jpg",
        "date": "2020-09-29T06:28:57.779Z",
        "tokens": [
          {
            "_id": "5f7353e6938ab21aa0cb13dc",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyZDQyOTAwZTYzODM4Y2NlNjQ3NTYiLCJpYXQiOjE2MDEzOTM2Mzh9.qzb15XXY8iPW8TSZptXHIotMGVXogWm-adGf0pVK8AE"
          }
        ],
        "__v": 5
      },
      "__v": 0
    }
  ]
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', function (req, res) {
    const filter = req.query.cdl || null;
    controller.getDriver(filter)
    .then((driverList) => {
        response.success(req, res, driverList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

/**
 * @api {post} /driver AddNewDriver 
 * @apiGroup Driver
 * @apiVersion 1.0.0
 * @apiParam {String} cdl Numero de idntificacion del conductor
 * @apiParam {Date} birthDate Decha de nacimiento del conductor
 * @apiParam {File} imageCdl Imagen de la licencia del conductor
 * @apiParam {Number} sex Sexo del conductor
 * @apiParam {String} habilities Habilidades del conductor
 * @apiParam {String} description Descripcion del conductor
 * @apiSuccess {Object[]} driver Datos del conductor registrado
 * @apiSuccess {Number} driver.cdl Numero de identificacion del conductor
 * @apiSuccess {Date} driver.birthDate Fecha de nacimiento del conductor
 * @apiSuccess {String} driver.imageCdl Url de la imagen de la licencia del conductor
 * @apiSuccess {Number} driver.sex Sexo del conductor
 * @apiSuccess {String} driver.habilities Habilidades del conductor
 * @apiSuccess {String} driver.description Descripcion del conductor
 * @apiSuccess {Id} driver.user Id del usuario asociado
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "error": 0,
  "mensaje": {
    "_id": "5f7376d9e6153a2910ceba5b",
    "cdl": 15540621,
    "birthDate": "1985-05-21T06:28:57.779Z",
    "imageCdl": "/public/files/e7yqayb96JVmZm3dRPi42koddNQx-ogL9VRAXY-ZT8XmQb2PzbeiSJsNp8jUoGIA.jpg",
    "sex": 0,
    "habilities": "Manejo muy bien la bicicleta",
    "description": "Me he caido muy poco",
    "user": "5f72d42900e63838cce64756",
    "__v": 0
  }
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', storage.single('imageCdl'), function (req, res) {
    controller.addDriver(req.body, req.user, req.file)
    .then((fullDriver) => {
        response.success(req, res, fullDriver, 201);
    }).catch(e => {
        response.error(req, res, 'informacion invalida', 400, e);
    });
});

/**
 * @api {delete} /driver/:id DeleteDriver 
 * @apiGroup Driver
 * @apiVersion 1.0.0
 * @apiHeader {String} token Token de acceso de usuario.
 * @apiParam {Id} _id ID de usuario
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "error": 0,
  "mensaje": "Usuario 5f72ba72f5aa7224d8cc9ee2 eliminado"
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', auth, function (req, res) {
  controller.deleteDriver(req.params.id)
      .then(() => {
          response.success(req, res, `Driver ${req.params.id} eliminado`, 200);
      })
      .catch(e => {
          response.error(req, res, 'Error interno', 500, e);
      });
});

module.exports = router;