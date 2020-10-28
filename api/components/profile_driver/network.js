const express = require('express');
const storage = require('../../middelware/saveFile');
const auth = require('../../middelware/auth');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

/**
 * @api {get} /driver getDriverList
 * @apiGroup Driver
 * @apiDescription Ignorar este metodo debe modificarse, no es definitivo
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
 * @apiVersion 2.0.0
 * @apiParam {Object[]} base Datos basicos de usuario
 * @apiParam {String} base.name Nombre del usuario
 * @apiParam {String} base.lastname Apellido del usuario
 * @apiParam {String} base.typeUser Tipo de usuario (1-> Driver | 2-> Company)
 * @apiParam {String} base.photo Foto del usuario
 * @apiParam {String} base.email Correo electronico del usuario (unico)
 * @apiParam {Number} base.google_id ID de usuario de google cuando se loguea desde esa red social
 * @apiParam {Number} base.facebook_id ID de usuario de facebook cuando se loguea desde esa red social
 * @apiParam {Number} dln Numero de licencia del conductor 
 * @apiParam {Date} expDateDln Fecha de vencimiento de la licencia 
 * @apiParam {Date} birthDate Fecha de nacimiendo del conductor 
 * @apiParam {Number} areaCode Codigo de area del telefono 
 * @apiParam {Number} phoneNumber Numero de telefono 
 * @apiParam {Number} sex Sexo del usuario (1-> Hombre | 2-> Mujer | 3-> Otro) 
 * @apiParam {Number} experience Años de experiencia  
 * @apiParam {String} address Direccion fisica de habitacion 
 * @apiParam {Number} zipCode Zip Code 
 * @apiParam {String} description Descripcion breve de la empresa  
 * @apiParamExample {json} Ejemplo de peticion
 * {
    "base": {
      "name": "Pedro",
      "lastname": "Perez",
      "typeUser": 1,
      "photo": "https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c",
      "email": "pedro.perez@gmail.com",
      "google_id": 107579238748342099879,
      "facebook_id": 10158547873184036
    },
    "dln": 14258369,
    "expDateDln": "2025-05-21T06:28:57.779Z",
    "birthDate": "1985-05-21T06:28:57.779Z",
    "areaCode": 212,
    "phoneNumber": 4145689,
    "sex": 1,
    "experience": 5,
    "address": "Venezuela",
    "zipCode": "10548",
    "description": "Donec sit amet fringilla libero, in dictum neque"
  }
 * @apiSuccess {Object[]} user Datos basicos de usuario
 * @apiSuccess {Id} user._id ID del usuario registrado
 * @apiSuccess {String} user.name Nombre del usuario
 * @apiSuccess {String} user.lastname Apellido del usuario
 * @apiSuccess {Number} user.typeUser Tipo de usuario (1-> Driver | 2-> Company)
 * @apiSuccess {String} user.photo Foto del usuario
 * @apiSuccess {Number} user.google_id ID de usuario de google cuando se loguea desde esa red social
 * @apiSuccess {Number} user.facebook_id ID de usuario de facebook cuando se loguea desde esa red social
 * @apiSuccess {String} user.email Correo electronico del usuario
 * @apiSuccess {Date} user.date Fecha de regitro del conductor 
 * @apiSuccess {String} user.token Token de seguridad 
 * @apiSuccess {Object[]} driver Datos del usuario asociados al rol de conductor
 * @apiSuccess {Id} driver._id ID de conductor 
 * @apiSuccess {Number} driver.dln Numero de licencia del conductor 
 * @apiSuccess {String} driver.imageDln Url de la foto del la licencia 
 * @apiSuccess {Date} driver.expDateDln Fecha de vencimiento de la licencia 
 * @apiSuccess {Date} driver.birthDate Fecha de nacimiendo del conductor 
 * @apiSuccess {Number} driver.areaCode Codigo de area del telefono 
 * @apiSuccess {Number} driver.phoneNumber Numero de telefono 
 * @apiSuccess {Number} driver.sex Sexo del usuario (1-> Hombre | 2-> Mujer | 3-> Otro) 
 * @apiSuccess {Number} driver.experience Años de experiencia 
 * @apiSuccess {String} driver.address Direccion fisica de habitacion  
 * @apiSuccess {Number} driver.zipCode Zip Code 
 * @apiSuccess {String} driver.description Descripcion breve de la empresa 
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "error": 0,
    "mensaje": {
      "user": {
        "_id": "5f95ea6f84ada2278899d071",
        "name": "Pedro",
        "lastname": "Perez",
        "typeUser": 1,
        "photo": "https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c",
        "google_id": "107579238748342090000",
        "facebook_id": "10158547873184036",
        "email": "pedro.perez@gmail.com",
        "date": "2020-10-25T21:13:19.437Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk1ZWE2Zjg0YWRhMjI3ODg5OWQwNzEiLCJpYXQiOjE2MDM2NjAzOTl9.6QpKf1byRLCgk7uXWjfYygzQwhAGz8MmdvsTkRplms4"
      },
      "driver": {
        "_id": "5f95ea6e84ada2278899d070",
        "dln": 14258369,
        "imageDln": "",
        "expDateDln": "2025-05-21T06:28:57.779Z",
        "birthDate": "1985-05-21T06:28:57.779Z",
        "areaCode": 212,
        "phoneNumber": 4145689,
        "sex": 1,
        "experience": 5,
        "address": "Venezuela",
        "zipCode": 10548,
        "description": "Donec sit amet fringilla libero, in dictum neque",
        "__v": 0
      }
    }
  }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', storage.single('imageDln'), function (req, res) {
    controller.addDriver(req.body, req.user, req.file)
    .then((fullDriver) => {
        response.success(req, res, fullDriver, 201);
    }).catch(e => {
        response.error(req, res, 'informacion invalida', 400, e);
    });
});

/**
 * @api {patch} /driver UpdateDriver 
 * @apiGroup Driver
 * @apiVersion 1.0.0
 * @apiHeader {Bearer} token Token de acceso de usuario.
 * @apiParam {Object[]} base Datos basicos de usuario
 * @apiParam {String} base.name Nombre del usuario
 * @apiParam {String} base.lastname Apellido del usuario
 * @apiParam {Number} dln Numero de licencia del conductor 
 * @apiParam {Date} expDateDln Fecha de vencimiento de la licencia 
 * @apiParam {Date} birthDate Fecha de nacimiendo del conductor 
 * @apiParam {Number} areaCode Codigo de area del telefono 
 * @apiParam {Number} phoneNumber Numero de telefono 
 * @apiParam {Number} sex Sexo del usuario (1-> Hombre | 2-> Mujer | 3-> Otro) 
 * @apiParam {Number} experience Años de experiencia  
 * @apiParam {String} address Direccion fisica de habitacion 
 * @apiParam {Number} zipCode Zip Code 
 * @apiParam {String} description Descripcion breve de la empresa  
 * @apiParamExample {json} Ejemplo de peticion
 * {
    "base": {
      "name": "Pedro",
      "lastname": "Perez"
    },
    "dln": 14258369,
    "expDateDln": "2025-05-21T06:28:57.779Z",
    "birthDate": "1985-05-21T06:28:57.779Z",
    "areaCode": 212,
    "phoneNumber": 4145689,
    "sex": 1,
    "experience": 5,
    "address": "Venezuela",
    "zipCode": 10548,
    "description": "Donec sit amet fringilla libero, in dictum neque"
  }
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "error": 0,
    "mensaje": true
  }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.patch('/:id', auth(1), storage.single('imageDln'), function (req, res){
    controller.updateDriver(req.params.id, req.body, req.file)
        .then((data) => {
          response.success(req, res, data, 200);
        })
        .catch(e => {
          console.log(e);
          response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;