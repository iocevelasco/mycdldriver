const express = require('express');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const auth = require('../../middelware/auth');
const mailer = require('../../middelware/mailer');

/**
 * @api {get} /user/:type getUserList
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiParam {Number} type Tipo de usuario (1-> Driver | 2-> Company)
 * @apiSuccess {Id} _id ID de usuario
 * @apiSuccess {String} name Nombre del usuario
 * @apiSuccess {String} lastname Apellido del usuario
 * @apiSuccess {String} photo Url de la imagen del usuario
 * @apiSuccess {Date} date Fecha de registro del usuario
 * @apiSuccess {String} email Correo electronico del usuario
 * @apiSuccess {Object[]} driver Si el usuario es Driver (1) aqui estan todos sus datos
 * @apiSuccess {Id} driver._id Id del driver
 * @apiSuccess {Number} driver.dln Numero de identificacion de la licencia
 * @apiSuccess {Date} driver.expDateDln Fecha de expiracion de la licencia
 * @apiSuccess {String} driver.imageDln Url de la imagen de la licencia
 * @apiSuccess {Date} driver.birthDate Fecha de cumpleaños del conductor
 * @apiSuccess {Number} driver.areaCode Codigo de area del telefono
 * @apiSuccess {String} driver.phoneNumber Numero de telefono
 * @apiSuccess {Number} driver.sex Sexo del driver (1-> Hombre | 2-> Mujer | 3-> Otro) 
 * @apiSuccess {String} driver.address Direccion fisica de habitacion 
 * @apiSuccess {Number} driver.zipCode Zip Code 
 * @apiSuccess {Number} driver.rating Promedio de puntuacion del driver 
 * @apiSuccess {String} driver.description Descripcion breve del Driver 
 * @apiSuccess {Object[]} driver.experience Arreglo de objetos con campos de experiencia 
 * @apiSuccess {String} driver.experience.name Nombre del campos de experiencia 
 * @apiSuccess {Boolean} driver.experience.have Indica si posee el campo de experiencia 
 * @apiSuccess {Number} driver.experience.years Numero de años de experiencia 
 * @apiSuccess {Object[]} company Si el usuario es Company (2) aqui estan todos sus datos
 * @apiSuccess {Id} company._id Id de la empresa
 * @apiSuccess {String} company.tradename Nombre comercial
 * @apiSuccess {String} company.legalNumber Numero de identificacion de la empresa
 * @apiSuccess {Number} company.areaCode Codigo de area del telefono
 * @apiSuccess {String} company.phoneNumber Numero de telefono
 * @apiSuccess {String} company.address Direccion fisica de la empresa
 * @apiSuccess {String} company.address2 Direccion segunda linea 
 * @apiSuccess {String} company.description Descripcion corta de la empresa 
 * @apiSuccess {String} company.zipCode ZipCode 
 * @apiSuccess {String} company.logo Url de la imagen de la empresa 
 * @apiSuccess {String} company.state Estado donde esta ubicada 
 * @apiSuccess {Id} company.state._id Id del estado 
 * @apiSuccess {String} company.state.stateName Nombre del estado 
 * @apiSuccess {String} company.ciudad Ciudad donde esta ubicada 
 * @apiSuccess {Id} company.ciudad._id Id de la ciudad 
 * @apiSuccess {String} company.ciudad.stateName Nombre de la ciudad 
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "data": [
    {
        "_id": "5fb5479b949d6a2d98a91945",
        "name": "Erick",
        "lastname": "Hernandez",
        "photo": "https://www.unitecnar.edu.co/sites/default/files/pictures/user_default.png",
        "email": "takashi@dragonrock.com.ve",
        "date": "2020-11-18T16:11:07.098Z",
        "driver": {
            "_id": "5fb5479a949d6a2d98a91944",
            "dln": 16436589,
            "imageDln": "/public/files/KhSaP8-nHTasW2R6rgPZR0kuVijdX3Z9NKo7oa-fHX3JVaBluSxGyBjY9sHM-4qk.jpg",
            "expDateDln": "2020-11-28T04:00:00.000Z",
            "birthDate": "2020-11-01T04:00:00.000Z",
            "areaCode": 414,
            "phoneNumber": "3168556",
            "rating": 3,
            "sex": 1,
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
            "address": "Venezuela",
            "zipCode": "1030",
            "description": "klhg gh kh fth dr"
        },
        "company": {
            "_id": "5faeb15ef909381520db5c50",
            "tradename": "Dragonrock",
            "legalNumber": "1478956327",
            "areaCode": 414,
            "phoneNumber": "31685567",
            "address": "Los Dos Caminos",
            "address2": "ghfhfh",
            "description": "Cualquier cosa",
            "zipCode": "1030",
            "logo": "/public/files/UWy-arz6QFkscjZpxGfJiuIO1syhP6XDrLmJuzwAZWkwk5HfbcPkhM8240n4CWgT.png",
            "state": {
                "_id": "5fc68b66fd5663f19004aca6",
                "stateName": "California"
            },
            "city": {
                "_id": "5fc6a427fd5663f1900b7813",
                "cityName": "Floriston"
            }
        }
    }
    ]
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:type', function (req, res) {
    controller.getUsers(req.params.type)
    .then((userList) => {
        //mailer('takashi.onimaru@gmail.com', 'Prueba desde NodeJs para Ioce', 'Este es un titulo personailizado para ti BB', 'Mensaje de prueba de que se envio desde NODE JS, aqui pasariamos cualquier tipo de mensaje como el de usuario creado, recuperar contraseña, no se que más, pero seria una estructura base para montar correos, dime que te parece para darle plomo.')
        switch(userList.status){
            case 200:
                response.success(req, res, userList.message, userList.status);
                break;
            default:
                response.error(req, res, userList.message, userList.status, userList.detail);
                break;
        }
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

/**
 * @api {delete} /user/:id DeleteUser 
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiHeader {Bearer} token Token de acceso de usuario.
 * @apiParam {Id} _id ID de usuario
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "data": "Usuario 5f72ba72f5aa7224d8cc9ee2 eliminado"
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', auth(), function (req, res) {
    controller.deleteUser(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

/**
 * @api {post} /login LoginUser 
 * @apiGroup User
 * @apiVersion 2.0.0
 * @apiSuccess {Id} _id Identificador unico de usuario
 * @apiSuccess {String} name Nombre del usuario
 * @apiSuccess {String} lastname Apellido del usuario
 * @apiSuccess {Number} typeUser Tipo de usuario (1-> Driver | 2-> Company)
 * @apiSuccess {String} photo Url de la imagen del usuario
 * @apiSuccess {String} email Correo electronico del usuario
 * @apiSuccess {Number} google_id ID de usuario de google cuando se loguea desde esa red social
 * @apiSuccess {Number} facebook_id ID de usuario de facebook cuando se loguea desde esa red social
 * @apiSuccess {Date} date Fecha de registro del usuario
 * @apiSuccess {String} token Token de seguridad
 * @apiSuccess {Object[]} driver Datos del conductor
 * @apiSuccess {Id} driver._id Id del conductor
 * @apiSuccess {Number} driver.dln Numero de licencia del conductor
 * @apiSuccess {File} driver.imageDln Foto de la licencia del conductor 
 * @apiSuccess {Date} driver.birthDate Fecha de nacimiendo del conductor 
 * @apiSuccess {Number} driver.areaCode Codigo de area del telefono 
 * @apiSuccess {Number} driver.phoneNumber Numero de telefono 
 * @apiSuccess {Number} driver.sex Sexo del usuario (1-> Hombre | 2-> Mujer | 3-> Otro) 
 * @apiSuccess {Object[]} driver.experience Años de experiencia 
 * @apiSuccess {Number} driver.experience.years Cantidad de años de experiencia 
 * @apiSuccess {String} driver.experience.name Nombre del campo de experiencia 
 * @apiSuccess {Boolean} driver.experience.have Indica si posee ese campo de experiencia 
 * @apiSuccess {String} driver.address Direccion fisica de habitacion  
 * @apiSuccess {Number} driver.zipCode Zip Code  
 * @apiSuccess {String} driver.description Descripcion breve del conductor, habilidades, destrezas, etc... 
 * @apiSuccess {Date} driver.expDateDln Fecha de vencimiento de la licencia 
 * @apiSuccess {Object[]} company Datos de la compañia
 * @apiSuccess {Id} company._id Id de la empresa
 * @apiSuccess {String} company.tradename Nombre de la compañia 
 * @apiSuccess {String} company.legalNumber Numero de registro de la empresa 
 * @apiSuccess {Number} company.areaCode Codigo de area del telefono 
 * @apiSuccess {Number} company.phoneNumber Numero de telefono 
 * @apiSuccess {File} company.logo Foto del logo de la empresa 
 * @apiSuccess {String} company.address Direccion fisica de empresa 
 * @apiSuccess {String} company.address2 Direccion linea 2  
 * @apiSuccess {String} company.description Descripcion breve de la empresa
 * @apiSuccess {Number} company.zipCode Zip Code  
 * @apiSuccess {String} company.state Estado donde esta ubicada 
 * @apiSuccess {Id} company.state._id Id del estado 
 * @apiSuccess {String} company.state.stateName Nombre del estado 
 * @apiSuccess {String} company.ciudad Ciudad donde esta ubicada 
 * @apiSuccess {Id} company.ciudad._id Id de la ciudad 
 * @apiSuccess {String} company.ciudad.stateName Nombre de la ciudad 
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "data": {
    _id: 5f8f6781b57fcf31145bb164,
    name: 'Pedro',
    lastname: 'Perez',
    typeUser: 1,
    photo: 'https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c',
    email: 'pedro.perez@gmail.com',
    google_id: '107579238748342099879',
    facebook_id: '10158547873184036',
    date: 2020-10-20T22:41:05.496Z,
    token: 'eyJhbGciOiJIUzI19LIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhmNjc4MWI1N2ZjZjMxMTQ1YmIxNjQiLCJpYXQiOjE2MDM2NTgzOTB9.GIdlwhPUgpIQkJH61y31U26bdxDChRvK_xGT7Pf-VK0',
    driver: {
        _id: "5faeb15ef909381520db5c50",
        dln: 14258369,
        imageDln: '/public/files/undefined',
        birthDate: 1988-05-11T00:00:00.000Z,
        areaCode: 424,
        phoneNumber: 7845612,
        sex: 1,
        address: 'Lorem ipsum dolor sit amet',
        zipCode: '1030',
        description: 'Donec sit amet fringilla libero, in dictum neque',
        expDateDln: 2021-03-21T00:00:00.000Z,
        twicCard: true,
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
        ]
    },
    company: {
        _id: "5faeb15ef909381520db5c50",
        tradename: 'Lorem Ipsum',
        legalNumber: 'V14258369',
        areaCode: 424,
        phoneNumber: 7845612,
        logo: '/public/files/undefined',
        address: 'Miranda - Caracas',
        address2: 'Venezuela',
        description: 'Maecenas consectetur velit sit amet lorem auctor ultrices',
        zipCode: '1031',
        state: {
          _id: "5fc68b66fd5663f19004aca6",
          stateName: "California"
        },
        city: {
          _id: "5fc6a427fd5663f1900b7813",
          cityName: "Floriston"
        }
    }
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/login', async(req, res) => {
    controller.loginUser(req.body)
    .then((user) => {
        response.success(req, res, user, 200);
    })
    .catch(e => {
        response.error(req, res, e, 400, e);
    }); 
 });

 /**
 * @api {post} /user/logout Logout 
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Cierra sesion del dispositivo conectado unicamente
 * @apiHeader {String} token Token de acceso de usuario.
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "data": "Done"
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
 router.post('/logout', auth(), async (req, res) => {
    controller.logoutUser(req.user._id, req.token)
    .then((user) => {
        response.success(req, res, user, 200);
        
    })
    .catch(e => {
        response.error(req, res, 'Invalid user data', 400, e);
    });
 });

/**
 * @api {post} /user/logoutall LogoutAll 
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Cierra sesion de todos los dispositvos conectados
 * @apiHeader {String} token Token de acceso de usuario.
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "data": "Done"
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/logoutall', auth(), async(req, res) => {
    controller.logoutAll(req.user._id)
    .then((user) => {
        response.success(req, res, user, 200);
    })
    .catch(e => {
        response.error(req, res, 'Invalid user data', 400, e);
    });
 })

module.exports = router;