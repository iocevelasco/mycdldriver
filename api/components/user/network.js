const express = require('express');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const auth = require('../../middelware/auth');
const mailer = require('../../middelware/mailer');

/**
 * @api {get} /user getUserList
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiSuccess {Object[]} user Datos del usuario registrado
 * @apiSuccess {Id} user._id ID de usuario
 * @apiSuccess {String} user.name Nombre del usuario
 * @apiSuccess {String} user.lastname Apellido del usuario
 * @apiSuccess {String} user.photo Url de la imagen del usuario
 * @apiSuccess {Date} user.date Fecha de registro del usuario
 * @apiSuccess {String} user.email Correo electronico del usuario
 * @apiSuccess {Number} user.typeUser Tipo de usuario (1-> Driver | 2-> Company)
 * @apiSuccess {Number} user.google_id ID de usuario de google cuando se loguea desde esa red social
 * @apiSuccess {Number} user.facebook_id ID de usuario de facebook cuando se loguea desde esa red social
 * @apiSuccess {Object[]} user.driver Si el usuario es Driver (1) aqui estan todos sus datos
 * @apiSuccess {Object[]} user.company Si el usuario es Driver (1) aqui estan todos sus datos
 * @apiSuccess {Object[]} user.tokens Listado de tokens de seguridad registrados por el usuario
 * @apiSuccess {Id} user.tokens._id ID del token
 * @apiSuccess {String} user.tokens.token Token de seguridad
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "error": 0,
    "mensaje": [
        {
        "_id": "5f72aad62f9b9a1c605e2978",
        "name": "Juan",
        "lastname": "Perez",
        "date": "2020-02-10T15:46:51.778Z",
        "email": "juanperez@gmail.com",
        "typeUser": 1,
        "google_id": "107579236887242099879",
        "facebook_id": "10158714673184036",
        "driver": "5f8f6780b57fcf31145bb163",
        "company": "5f8f726442cd1a1498021acf",
        "photo": "http://localhost:3000./public/files/haHR0E2O68nPpcpx668vEJRYC33hHSritUY0tOIE42nkOyN94saIKDB7QzJ-q-iS.jpg",
        "tokens": [
            {
            "_id": "5f72aad62f9b9a1c605e2979",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyYWFkNjJmOWI5YTFjNjA1ZTI5NzgiLCJpYXQiOjE2MDEzNTAzNTh9.yaU-FnWzUKzBvNxAchS0O6sGWoD5GpyC-lWombv4rA8"
            }
        ],
        "__v": 1
        }
    ]
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', function (req, res) {
    const filterUsers = req.query.user || null;
    controller.getUsers(filterUsers)
    .then((userList) => {
        mailer('takashi.onimaru@gmail.com', 'Prueba desde NodeJs', 'Mensaje de prueba de que se envio desde NODE JS')
        response.success(req, res, userList, 200);
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
  "error": 0,
  "mensaje": "Usuario 5f72ba72f5aa7224d8cc9ee2 eliminado"
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
 * @apiSuccess {Number} driver.dln Numero de licencia del conductor
 * @apiSuccess {File} driver.imageDln Foto de la licencia del conductor 
 * @apiSuccess {Date} driver.birthDate Fecha de nacimiendo del conductor 
 * @apiSuccess {Number} driver.areaCode Codigo de area del telefono 
 * @apiSuccess {Number} driver.phoneNumber Numero de telefono 
 * @apiSuccess {Number} driver.sex Sexo del usuario (1-> Hombre | 2-> Mujer | 3-> Otro) 
 * @apiSuccess {Number} driver.experience Años de experiencia 
 * @apiSuccess {String} driver.address Direccion fisica de habitacion  
 * @apiSuccess {Number} driver.zipCode Zip Code  
 * @apiSuccess {String} driver.description Descripcion breve del conductor, habilidades, destrezas, etc... 
 * @apiSuccess {Date} driver.expDateDln Fecha de vencimiento de la licencia 
 * @apiSuccess {Object[]} company Datos de la compañia
 * @apiSuccess {String} company.tradename Nombre de la compañia 
 * @apiSuccess {String} company.legalNumber Numero de registro de la empresa 
 * @apiSuccess {Number} company.areaCode Codigo de area del telefono 
 * @apiSuccess {Number} company.phoneNumber Numero de telefono 
 * @apiSuccess {File} company.logo Foto del logo de la empresa 
 * @apiSuccess {String} company.address Direccion fisica de habitacion  
 * @apiSuccess {String} company.description Descripcion breve de la empresa
 * @apiSuccess {Number} company.zipCode Zip Code  
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "error": 0,
  "mensaje": {
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
        dln: 14258369,
        imageDln: '/public/files/undefined',
        birthDate: 1988-05-11T00:00:00.000Z,
        areaCode: 424,
        phoneNumber: 7845612,
        sex: 1,
        experience: 10,
        address: 'Lorem ipsum dolor sit amet',
        zipCode: '1030',
        description: 'Donec sit amet fringilla libero, in dictum neque',
        expDateDln: 2021-03-21T00:00:00.000Z
    },
    company: {
        tradename: 'Lorem Ipsum',
        legalNumber: 'V14258369',
        areaCode: 424,
        phoneNumber: 7845612,
        logo: '/public/files/undefined',
        address: 'Miranda - Caracas - Venezuela',
        description: 'Maecenas consectetur velit sit amet lorem auctor ultrices',
        zipCode: '1031'
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
  "error": 0,
  "mensaje": "Done"
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
  "error": 0,
  "mensaje": "Done"
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