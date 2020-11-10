const express = require('express');
const auth = require('../../middelware/auth');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

/**
 * @api {get} /company getCompanyList
 * @apiGroup Company
 * @apiDescription Este metodo debe modificarse, no es definitivo
 * @apiVersion 1.0.0
 * @apiSuccess {Id} _id ID de la compañia
 * @apiSuccess {String} tradename Nombre de la compañia
 * @apiSuccess {Number} legalNumber Numero de registro de la empresa
 * @apiSuccess {Number} areaCode Codigo de area del telefono
 * @apiSuccess {String} phoneNumber Numero de telefono
 * @apiSuccess {String} logo Foto del logo de la empresa
 * @apiSuccess {String} address Direccion fisica de habitacion
 * @apiSuccess {String} description Descripcion breve de la empresa
 * @apiSuccess {Number} zipCode Zip Code
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "error": 0,
    "mensaje": [
        {
        "_id": "5f8f726442cd1a1498021acf",
        "tradename": "ErDesarrollo",
        "legalNumber": "V161342366",
        "areaCode": 424,
        "phoneNumber": 316855645,
        "logo": "/public/files/undefined",
        "address": "Miranda - Caracas - Venezuela",
        "description": "Desarrollo de sitios web usando wordpress como CMS",
        "zipCode": "1031",
        "__v": 0
        }
    ]
    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', function (req, res) {
    const filter = req.query.legalNumber || null;
    controller.getCompany(filter)
    .then((companyList) => {
        response.success(req, res, companyList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

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
 * @apiParam {String} address Direccion fisica de habitacion 
 * @apiParam {String} description Descripcion breve de la empresa  
 * @apiParam {Number} areaCode Codigo de area del telefono 
 * @apiParam {Number} phoneNumber Numero de telefono 
 * @apiParam {Number} zipCode Zip Code 
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
	"tradename": "Lorem Ipsum",
	"legalNumber": "V14258369",
	"address": "Miranda - Caracas - Venezuela",
	"description": "Maecenas consectetur velit sit amet lorem auctor ultrices",
	"areaCode": 212,
	"phoneNumber": 4145689,
	"zipCode": 1031
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
 * @apiSuccess {String} company.logo Foto del logo de la empresa 
 * @apiSuccess {Number} company.areaCode Codigo de area del telefono 
 * @apiSuccess {Number} company.phoneNumber Numero de telefono 
 * @apiSuccess {String} company.address Direccion fisica de habitacion  
 * @apiSuccess {Number} company.zipCode Zip Code 
 * @apiSuccess {String} company.description Descripcion breve de la empresa 
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "error": 0,
    "mensaje": {
        "user": {
            "_id": "5f95f942ae7cae3c9c07fd8d",
            "name": "Pedro",
            "lastname": "Perez",
            "typeUser": 1,
            "photo": "https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c",
            "google_id": "107579238748342090000",
            "facebook_id": "10158547873184036",
            "email": "pedro.perez@gmail.com",
            "date": "2020-10-25T22:16:34.124Z",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk1Zjk0MmFlN2NhZTNjOWMwN2ZkOGQiLCJpYXQiOjE2MDM2NjQxOTR9.E06IDjKu6FzWJyzStWj2XD0CCAgGGn5rLHqUg8JqUYU"
        },
        "company": {
            "_id": "5f95f941ae7cae3c9c07fd8c",
            "tradename": "Lorem Ipsum",
            "legalNumber": "V14258369",
            "areaCode": 212,
            "phoneNumber": 4145689,
            "logo": "",
            "address": "Miranda - Caracas - Venezuela",
            "description": "Maecenas consectetur velit sit amet lorem auctor ultrices",
            "zipCode": "1031",
            "__v": 0
        }
    }
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', function (req, res) {

    controller.addCompany(req.body, req.user)
    .then((fullCompany) => {
        response.success(req, res, fullCompany, 201);
    }).catch(e => {
        response.error(req, res, 'informacion invalida', 400, e);
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
 * @apiParam {String} tradename Nombre de la compañia 
 * @apiParam {String} legalNumber Numero de registro de la empresa 
 * @apiParam {Number} areaCode Codigo de area del telefono 
 * @apiParam {Number} phoneNumber Numero de telefono 
 * @apiParam {String} address Direccion fisica de habitacion 
 * @apiParam {Number} zipCode Zip Code 
 * @apiParam {String} description Descripcion breve de la empresa  
 * @apiParamExample {json} Ejemplo de peticion
 * {
    "base": {
      "name": "Pedro",
      "lastname": "Perez"
    },
    "tradename": 14258369,
    "legalNumber": "2025-05-21T06:28:57.779Z",
    "areaCode": 212,
    "phoneNumber": 4145689,
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
router.patch('/:id', auth(2), function (req, res){
    controller.updateCompany(req.params.id, req.body)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;