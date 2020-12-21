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
 * @apiSuccess {Id} _id ID de conductor
 * @apiSuccess {Number} dln Numero de identificacion del conductor
 * @apiSuccess {Date} birthDate Fecha de nacimiento del conductor
 * @apiSuccess {Date} expDateDln Fecha de vencimiento del DLN
 * @apiSuccess {String} imageDln Url de la imagen de la licencia del conductor
 * @apiSuccess {Number} sex Sexo del conductor
 * @apiSuccess {Number} areaCode Codigo de area del telefono
 * @apiSuccess {Number} phoneNumber Numero de telefono
 * @apiSuccess {String} description Descripcion del conductor
 * @apiSuccess {String} address Direccion del conductor
 * @apiSuccess {String} zipCode Codigo postal del conductor
 * @apiSuccess {Boolean} twicCard ______
 * @apiSuccess {Object[]} experience Listado de campos de experiencia del conductor
 * @apiSuccess {Id} experience._id ID del campo de experiencia
 * @apiSuccess {String} experience.name Nombre del campo de experiencia
 * @apiSuccess {Number} experience.years Años de experiencia 
 * @apiSuccess {Boolean} experience.have Indica si posee el campo de experiencia
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "data": [
    {
      _id: "5fd2a024658229177cb3e66b",
      dln: 161342589,
      expDateDln: "2025-03-21T00:00:00.000Z",
      birthDate: "1985-03-21T00:00:00.000Z",
      areaCode: 414,
      phoneNumber: "3168556",
      sex: 1,
      address: "Av Sucre de los Dos Caminos",
      zipCode: "1030",
      __v: 1,
      description: "Esta es una prueba de edicion desde experiencia directamente",
      experience: [
        {
          years: 4,
          _id: "5fd7a053398f454368ccb2be",
          name: "Tamk endorsed",
          have: true
        },
        {
          years: 2,
          _id: "5fd7a053398f454368ccb2bf",
          name: "Hazmat",
          have: true
        },
        {
          years: 0,
          _id: "5fd7a053398f454368ccb2c0",
          name: "Referred loads",
          have: false
        },
        {
          years: 1,
          _id: "5fd7a053398f454368ccb2c1",
          name: "Van",
          have: true
        },
        {
          years: 10,
          _id: "5fd7a053398f454368ccb2c2",
          name: "Car Carrier",
          have: true
        },
        {
          years: 3,
          _id: "5fd7a053398f454368ccb2c3",
          name: "Flat Bed",
          have: true
        }
      ],
      twicCard: true
    }
  ]
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', function (req, res) {
    controller.getDriver()
    .then((driverList) => {
        response.success(req, res, driverList.message, driverList.status);
    }).catch(e => {
        response.error(req, res, e.message, e.status, e.detail);
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
 * @apiParam {String} password Clave de acceso del usuario  
 * @apiParam {String} address Direccion fisica de habitacion 
 * @apiParam {Number} zipCode Zip Code
 * @apiParamExample {json} Ejemplo de peticion
 * {
    "base": {
      "name": "Pedro",
      "lastname": "Perez",
      "typeUser": 1,
      "photo": "https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c",
      "email": "pedro.perez@gmail.com",
      "google_id": 107579238748342085879,
      "facebook_id": 10158547873145036
    },
    "dln": 14258369,
    "expDateDln": "2025-05-21T06:28:57.779Z",
    "birthDate": "1985-05-21T06:28:57.779Z",
    "areaCode": 212,
    "phoneNumber": 4145689,
    "password": "123456789"
    "sex": 1,
    "address": "Venezuela",
    "zipCode": "10548"
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
    "data": {
      driver: {
        _id: "5fd7c15b7e44982680f994ac",
        address: "Los Dos Caminos",
        areaCode: 414,
        birthDate: "2020-12-14T04:00:00.000Z",
        dln: 147854623,
        expDateDln: "2020-12-14T04:00:00.000Z",
        experience: [],
        phoneNumber: "3168556",
        sex: 1,
        zipCode: "1030",
        __v: 0
      },
      user: {
        _id: "5fd7c15b7e44982680f994ad", 
        name: "Pedro", 
        lastname: "Perez", 
        typeUser: 1,
        date: "2020-12-14T19:47:39.826Z",
        email: "pedro.perez@gmail.com",
        photo: "https://www.unitecnar.edu.co/sites/default/files/pictures/user_default.png",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ3YzE1YjdlNDQ5ODI2ODBmOTk0YWQiLCJpYXQiOjE2MDc5NzUyNjB9.OLl6EAVD-vd4xw0vqdCl945yCa5u7lgfx27VBlKFKNI"
      }
    }
  }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', function (req, res) {
    controller.addDriver(req.body, req.user)
    .then((fullDriver) => {
      switch (fullDriver.status){
        case 201:
          response.success(req, res, fullDriver.message, 201);
          break;
        default:
          response.error(req, res, fullDriver.message, fullDriver.status, fullDriver.detail);
          break;
    }
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
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
 * @apiParam {Date} birthDate Fecha de nacimiendo del conductor 
 * @apiParam {Number} areaCode Codigo de area del telefono 
 * @apiParam {Number} phoneNumber Numero de telefono 
 * @apiParam {Number} sex Sexo del usuario (1-> Hombre | 2-> Mujer | 3-> Otro)  
 * @apiParam {String} password Clave de acceso del usuario   
 * @apiParam {String} address Direccion fisica de habitacion 
 * @apiParam {Number} zipCode Zip Code 
 * @apiParamExample {json} Ejemplo de peticion
 * {
    "base": {
      "name": "Pedro",
      "lastname": "Perez"
    },
    "birthDate": "1985-05-21T06:28:57.779Z",
    "areaCode": 212,
    "phoneNumber": 4145689,
    "sex": 1,
    "address": "Venezuela",
    "password": "123456789",
    "zipCode": 10548
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
 * @apiSuccess {Object[]} driver Datos del usuario asociados al rol de conductor
 * @apiSuccess {Id} driver._id ID del Driver 
 * @apiSuccess {Number} driver.dln Numero de licencia 
 * @apiSuccess {Date} driver.expDateDln Fecha de expiracion de la licencia 
 * @apiSuccess {Date} driver.birthDate Fecha de nacimiento del driver 
 * @apiSuccess {Number} driver.areaCode Codigo de area del telefono 
 * @apiSuccess {String} driver.phoneNumber Numero telefono 
 * @apiSuccess {Number} driver.sex Sexo del usuario (1-> Hombre | 2-> Mujer | 3-> Otro)  
 * @apiSuccess {String} driver.address Direccion fisica de habitacion 
 * @apiSuccess {Number} driver.zipCode Zip Code 
 * @apiSuccess {Number} driver.rating Promedio de puntuacion del driver 
 * @apiSuccess {String} driver.description Descripcion breve del Driver 
 * @apiSuccess {Object[]} driver.experience Arreglo de objetos con campos de experiencia 
 * @apiSuccess {String} driver.experience.name Nombre del campos de experiencia 
 * @apiSuccess {Boolean} driver.experience.have Indica si posee el campo de experiencia 
 * @apiSuccess {Number} driver.experience.years Numero de años de experiencia 
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "data": {
      "user": {
        "_id": "5fd2a024658229177cb3e66c",
        "name": "Pedro",
        "lastname": "Perez",
        "typeUser": 1,
        "photo": "https://www.unitecnar.edu.co/sites/default/files/pictures/user_default.png",
        "google_id": "104953011490801331331",
        "email": "pedro.perez@gmail.com",
        "date": "2020-12-10T22:24:36.492Z"
      },
      "driver": {
        "_id": "5fd2a024658229177cb3e66b",
        "dln": 161342589,
        "expDateDln": "2025-03-21T00:00:00.000Z",
        "birthDate": "1985-03-21T00:00:00.000Z",
        "areaCode": 414,
        "phoneNumber": "3168556",
        "sex": 1,
        "address": "Av Sucre de los Dos Caminos",
        "zipCode": "1030",
        "rating": 3,
        "description": "Esta es una prueba de edicion desde experiencia directamente",
        "experience": [
          {
            "years": 4,
            "_id": "5fd7a053398f454368ccb2be",
            "name": "Tamk endorsed",
            "have": true
          },
          {
            "years": 2,
            "_id": "5fd7a053398f454368ccb2bf",
            "name": "Hazmat",
            "have": true
          },
          {
            "years": 0,
            "_id": "5fd7a053398f454368ccb2c0",
            "name": "Referred loads",
            "have": false
          },
          {
            "years": 1,
            "_id": "5fd7a053398f454368ccb2c1",
            "name": "Van",
            "have": true
          },
          {
            "years": 10,
            "_id": "5fd7a053398f454368ccb2c2",
            "name": "Car Carrier",
            "have": true
          },
          {
            "years": 3,
            "_id": "5fd7a053398f454368ccb2c3",
            "name": "Flat Bed",
            "have": true
          }
        ],
        "twicCard": true
      }
    }
  }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.patch('/', auth(1), function (req, res){
  const id= req.user._id || null;
  controller.updateDriver(id, req.body)
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
        response.error(req, res, e.message, e.status, e.detail);
      });
});



/**
 * @api {patch} /driver/experience UpdateExperience 
 * @apiGroup Driver
 * @apiVersion 1.0.0
 * @apiHeader {Bearer} token Token de acceso de usuario.
 * @apiParam {Number} dln Numero de licencia
 * @apiParam {Date} expDateDln Fecha de vencimiento de la licencia
 * @apiParam {String} imageDln Url de la imagen con la foto de la licencia 
 * @apiParam {String} description Descripcion breve del Driver 
 * @apiParam {Boolean} twicCard __________ 
 * @apiParam {Object[]} experience Arreglo de objetos con campos de experiencia   
 * @apiParam {String} experience.name Nombre del campos de experiencia 
 * @apiParam {Boolean} experience.have Indica si posee el campo de experiencia 
 * @apiParam {Number} experience.years Numero de años de experiencia 
 * @apiParamExample {json} Ejemplo de peticion
 * {
    "dln": 161342589,
    "expDateDln": "2025-03-21T00:00:00.000Z",
    "imageDln": "",
    "description": "Esta es una prueba de edicion desde experiencia directamente",
    "twicCard": true,
    "experience": [{
      "name": "Tamk endorsed",
      "have": true,
      "years": 4
    },
    {
      "name": "Hazmat",
      "have": true,
      "years": 2
    },
    {
      "name": "Referred loads",
      "have": false,
      "years": 0
    },
    {
      "name": "Van",
      "have": true,
      "years": 1
    },
    {
      "name": "Car Carrier",
      "have": true,
      "years": 10
    },
    {
      "name": "Flat Bed",
      "have": true,
      "years": 3
    }]
  }
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "data": "User experience updated"
  }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.patch('/experience', auth(1), function (req, res){
  const id= req.user.driver._id || null;
  controller.updateExperience(id, req.body)
    .then((data) => {
      switch(data.status){
        case 200:
          response.success(req, res, data.message, 200);
          break;
        default:
          response.error(req, res, data.message, data.status, data.detail);
      }
    })
    .catch(e => {
      response.error(req, res, e.message, e.status, e.detail);
    });
});

router.post('/check', auth(2), function (req, res){
  controller.checkDriver(req.body.mail).then((data) => {
    switch(data.status){
      case 200:
        response.success(req, res, data.message, 200);
        break;
      default:
        response.error(req, res, data.message, data.status, data.detail);
    }
  })
  .catch(e => {
    response.error(req, res, e.message, e.status, e.detail);
  });
});

router.post('/staff/new', auth(2), function (req, res){
  controller.addStaff(req.body, req.user.company).then((data) => {
    switch(data.status){
      case 201:
        response.success(req, res, data.message, data.status);
        break;
      default:
        response.error(req, res, data.message, data.status, data.detail);
    }
  })
  .catch(e => {
    response.error(req, res, 'Unexpected error', 500, e);
  });
});

router.post('/staff/get', auth(1), function (req, res){
  response.success(req, res, req.user, 200);
});

module.exports = router;