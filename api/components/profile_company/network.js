const express = require('express');
const auth = require('../../middelware/auth');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

/**
 * @api {post} /company AddNewCompany
 * @apiGroup Company
 * @apiVersion 2.0.0
 * @apiParam {Object[]} base Datos basicos de usuario
 * @apiParam {String} base.name Nombre del usuario
 * @apiParam {String} base.lastname Apellido del usuario
 * @apiParam {String} base.typeUser Tipo de usuario (1-> Driver | 2-> Company)
 * @apiParam {String} base.photo Foto del usuario
 * @apiParam {String} base.email Correo electronico del usuario (unico)
 * @apiParam {Number} base.google_id ID de usuario de google cuando se loguea desde esa red social
 * @apiParam {String} base.facebook_id ID de usuario de facebook cuando se loguea desde esa red social
 * @apiParam {String} tradename Nombre de la compañia 
 * @apiParam {String} legalNumber Numero de registro de la empresa 
 * @apiParam {String} address Direccion fisica de la empresa 
 * @apiParam {String} address2 Direccion linea 2 
 * @apiParam {String} description Descripcion breve de la empresa  
 * @apiParam {Number} areaCode Codigo de area del telefono 
 * @apiParam {Number} phoneNumber Numero de telefono 
 * @apiParam {Number} zipCode Zip Code 
 * @apiParam {String} state Id del estado 
 * @apiParam {String} city Id de la ciudad 
 * @apiParamExample {json} Ejemplo de peticion
 * {
    "base": {
      "name": "Pedro",
      "lastname": "Perez",
      "typeUser": 2,
      "photo": "https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c",
      "email": "pedro.perez@gmail.com",
      "google_id": 107579238748342099879,
      "facebook_id": 10158547873184036
    },
	"tradename": "Lorem Ipsum",
	"legalNumber": "V14258369",
	"address": "Miranda - Caracas",
	"address2": "Venezuela",
	"description": "Maecenas consectetur velis",
	"password": "123456789",
	"areaCode": 212,
	"phoneNumber": 4145689,
	"zipCode": 1031,
	"state": "5fc68b66fd5663f19004aca6",
	"city": "5fc6a427fd5663f1900b7813"
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
 * @apiSuccess {Date} user.date Fecha de regitro de la empresa 
 * @apiSuccess {String} user.token Token de seguridad 
 * @apiSuccess {Object[]} company Datos del usuario asociados al rol de empresa
 * @apiSuccess {Id} company._id ID de la empresa 
 * @apiSuccess {String} company.tradename Nombre de la compañia 
 * @apiSuccess {String} company.legalNumber Numero de registro de la empresa 
 * @apiSuccess {Number} company.areaCode Codigo de area del telefono 
 * @apiSuccess {Number} company.phoneNumber Numero de telefono 
 * @apiSuccess {String} company.address Direccion fisica de la empresa  
 * @apiSuccess {String} company.address2 Direccion linea 2  
 * @apiSuccess {Number} company.zipCode Zip Code 
 * @apiSuccess {String} company.description Descripcion breve de la empresa 
 * @apiSuccess {Object[]} company.state Estado donde esta ubicada 
 * @apiSuccess {Id} company.state._id Id del estado 
 * @apiSuccess {String} company.state.stateName Nombre del estado 
 * @apiSuccess {Object[]} company.ciudad Ciudad donde esta ubicada 
 * @apiSuccess {Id} company.ciudad._id Id de la ciudad 
 * @apiSuccess {String} company.ciudad.stateName Nombre de la ciudad 
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "data": {
        "user": {
            "_id": "5fd9424a7dab1f3058a4eab6",
            "name": "Pedro",
            "lastname": "Perez",
            "typeUser": 2,
            "photo": "https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c",
            "google_id": "107579238748342090000",
            "facebook_id": "10158547873184036",
            "email": "pedro.perez@gmail.com",
            "date": "2020-12-15T23:10:02.329Z",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ5NDI0YTdkYWIxZjMwNThhNGVhYjYiLCJpYXQiOjE2MDgwNzM4MDJ9.kAx87hikW46g3CCvDSTYrBw2pItTKF64yEoUgwyW6Xs"
        },
        "company": {
            "_id": "5fd942497dab1f3058a4eab5",
            "tradename": "Lorem Ipsum",
            "legalNumber": "V14258369",
            "areaCode": 212,
            "phoneNumber": "4145689",
            "address": "Miranda - Caracas",
            "address2": "Venezuela",
            "zipCode": "1031",
            "description": "Maecenas consectetur velis",
            "city": {
                "_id": "5fc6a427fd5663f1900b7813",
                "cityName": "Floriston"
            },
            "state": {
                "_id": "5fc68b66fd5663f19004aca6",
                "stateName": "California"
            }
        }
    }
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', function (req, res) {

    controller.addCompany(req.body, req.user)
    .then((fullCompany) => {
        switch (fullCompany.status){
            case 201:
                response.success(req, res, fullCompany.message, fullCompany.status);
                break;
            default:
                response.error(req, res, fullCompany.message, fullCompany.status, fullCompany.detail);
                break;
        }
    }).catch(e => {
        response.error(req, res, 'Unexpected error', 500, e);
    });
});

/**
 * @api {patch} /company UpdateCompany 
 * @apiGroup Company
 * @apiVersion 1.0.0
 * @apiHeader {Bearer} token Token de acceso de usuario.
 * @apiParam {Object[]} base Datos basicos de usuario
 * @apiParam {String} base.name Nombre del usuario
 * @apiParam {String} base.lastname Apellido del usuario
 * @apiParam {String} base.photo Url de la imagen de perfil
 * @apiParam {String} tradename Nombre de la compañia 
 * @apiParam {String} legalNumber Numero de registro de la empresa 
 * @apiParam {Number} areaCode Codigo de area del telefono 
 * @apiParam {Number} phoneNumber Numero de telefono 
 * @apiParam {String} address Direccion fisica de la empresa 
 * @apiParam {String} address2 Direccion linea 2 
 * @apiParam {Number} zipCode Zip Code 
 * @apiParam {String} password Actualizacion de la clave de usuario 
 * @apiParam {String} description Descripcion breve de la empresa 
 * @apiParamExample {json} Ejemplo de peticion
 * {
    "base": {
      "name": "Pedro",
      "lastname": "Perez",
      "photo": "https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c"
    },
    "tradename": "Prueba Pedro",
    "legalNumber": 14258369,
    "areaCode": 212,
    "phoneNumber": 4145689,
    "address": "Venezuela",
    "address2": "Venezuela",
    "description": "Donec sit amet fringilla libero",
    "zipCode": 10548,
    "password": "123456789"
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
 * @apiSuccess {Date} user.date Fecha de regitro de la empresa 
 * @apiSuccess {Object[]} company Datos del usuario asociados al rol de empresa
 * @apiSuccess {Id} company._id ID de la empresa 
 * @apiSuccess {String} company.tradename Nombre de la compañia 
 * @apiSuccess {String} company.legalNumber Numero de registro de la empresa 
 * @apiSuccess {String} company.logo Foto del logo de la empresa 
 * @apiSuccess {Number} company.areaCode Codigo de area del telefono 
 * @apiSuccess {Number} company.phoneNumber Numero de telefono 
 * @apiSuccess {String} company.address Direccion fisica de la empresa  
 * @apiSuccess {String} company.address2 Direccion linea 2  
 * @apiSuccess {Number} company.zipCode Zip Code 
 * @apiSuccess {String} company.description Descripcion breve de la empresa 
 * @apiSuccess {Object[]} company.state Estado donde esta ubicada 
 * @apiSuccess {Id} company.state._id Id del estado 
 * @apiSuccess {String} company.state.stateName Nombre del estado 
 * @apiSuccess {Object[]} company.ciudad Ciudad donde esta ubicada 
 * @apiSuccess {Id} company.ciudad._id Id de la ciudad 
 * @apiSuccess {String} company.ciudad.stateName Nombre de la ciudad 
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "data": {
    "user": {
        "_id": "5fd9424a7dab1f3058a4eab6",
        "name": "Pedro",
        "lastname": "Perez",
        "typeUser": 2,
        "photo": "https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c",
        "google_id": "107579238748342090000",
        "facebook_id": "10158547873184036",
        "email": "pedro.perez@gmail.com",
        "date": "2020-12-15T23:10:02.329Z"
    },
    "company": {
        "_id": "5fd942497dab1f3058a4eab5",
        "tradename": "14258369",
        "legalNumber": "2025-05-21T06:28:57.779Z",
        "areaCode": 212,
        "phoneNumber": "4145689",
        "address": "Venezuela",
        "address2": "Venezuela",
        "description": "Donec sit amet fringilla libero",
        "zipCode": "10548",
        "city": {
            "_id": "5fc6a427fd5663f1900b7813",
            "cityName": "Floriston"
        },
        "state": {
            "_id": "5fc68b66fd5663f19004aca6",
            "stateName": "California"
        },
      "__v": 0
    }
  }
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.patch('/:id', auth(2), function (req, res){
    controller.updateCompany(req.params.id, req.body)
        .then((data) => {
            switch(data.status){
                case 200:
                    response.success(req, res, data.message, data.status);
                    break;
                default:
                    response.error(req, res, data.message, data.status, data.detail);
                    break;
            }
        })
        .catch(e => {
            response.error(req, res, 'Unexpectd error', 500, e);
        });
});

module.exports = router;