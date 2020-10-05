const express = require('express');
const storage = require('../../middelware/saveFile');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const auth = require('../../middelware/auth');

/**
 * @api {get} /user getUserList
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiSuccess {Object[]} user Datos del usuario registrado
 * @apiSuccess {Number} user._id ID de usuario
 * @apiSuccess {String} user.name Nombre del usuario
 * @apiSuccess {String} user.lastname Apellido del usuario
 * @apiSuccess {String} user.photo Url de la imagen del usuario
 * @apiSuccess {Date} user.date Fecha de registro del usuario
 * @apiSuccess {String} user.email Correo electronico del usuario
 * @apiSuccess {String} user.password Clave cifrada electronico del usuario
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
        "password": "$2a$08$wMlMgPTVQf/SdKZlIKL4VuOXEffoc9ku8IUZjhQh3v3Rl42lQr8.S",
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
        response.success(req, res, userList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

/**
 * @api {post} /user AddNewUser 
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiParam {String} name Nombre del usuario
 * @apiParam {String} lastname Apellido del usuario
 * @apiParam {File} photo Imagen del usuario
 * @apiParam {String} email Correo electronico del usuario
 * @apiParam {String} password Clave en crudo del usuario
 * @apiSuccess {Object[]} user Datos del usuario registrado
 * @apiSuccess {Id} user._id ID de usuario
 * @apiSuccess {String} user.name Nombre del usuario
 * @apiSuccess {String} user.lastname Apellido del usuario
 * @apiSuccess {String} user.photo Url de la imagen del usuario
 * @apiSuccess {String} user.email Correo electronico del usuario
 * @apiSuccess {String} user.password Clave cifrada del usuario
 * @apiSuccess {Date} user.date Fecha de registro del usuario
 * @apiSuccess {String} use.token Token de seguridad
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "error": 0,
    "mensaje": {
        "_id": "5f72aad62f9b9a1c605e2978",
        "name": "Juan",
        "lastname": "Perez",
        "photo": "/public/files/haHR0E2O68nPpcpx668vEJRYC33hHSritUY0tOIE42nkOyN94saIKDB7QzJ-q-iS.jpg",
        "email": "juanperez@gmail.com",
        "password": "$2a$08$wMlMgPTVQf/SdKZlIKL4VuOXEffoc9ku8IUZjhQh3v3Rl42lQr8.S",
        "date": "2020-02-10T15:46:51.778Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyYWFkNjJmOWI5YTFjNjA1ZTI5NzgiLCJpYXQiOjE2MDEzNTAzNTh9.yaU-FnWzUKzBvNxAchS0O6sGWoD5GpyC-lWombv4rA8"
    }
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', storage.single('photo'), function (req, res) {

    controller.addUser(req.body, req.file)
    .then((fullUser) => {
        response.success(req, res, fullUser, 201);
    }).catch(e => {
        response.error(req, res, 'informacion invalida', 400, e);
    });
});

/**
 * @api {patch} /user/:id UpdateUser 
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiHeader {String} token Token de acceso de usuario.
 * @apiParam {Id} _id ID de usuario
 * @apiParam {String} name Nombre del usuario
 * @apiParam {String} lastname Apellido del usuario
 * @apiParam {File} photo Imagen del usuario
 * @apiParam {String} email Correo electronico del usuario
 * @apiParam {String} password Clave en crudo del usuario
 * @apiSuccess {Object[]} user Datos del usuario registrado
 * @apiSuccess {Id} user._id ID de usuario
 * @apiSuccess {String} user.name Nombre del usuario
 * @apiSuccess {String} user.lastname Apellido del usuario
 * @apiSuccess {String} user.photo Url de la imagen del usuario
 * @apiSuccess {String} user.email Correo electronico del usuario
 * @apiSuccess {String} user.password Clave cifrada del usuario
 * @apiSuccess {Date} user.date Fecha de registro del usuario
 * @apiSuccess {String} use.token Token de seguridad
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
    "error": 0,
    "mensaje": {
        "_id": "5f72aad62f9b9a1c605e2978",
        "name": "Juan",
        "lastname": "Perez",
        "photo": "http://localhost:3000./public/files/haHR0E2O68nPpcpx668vEJRYC33hHSritUY0tOIE42nkOyN94saIKDB7QzJ-q-iS.jpg",
        "email": "juanperez@gmail.com",
        "password": "$2a$08$wMlMgPTVQf/SdKZlIKL4VuOXEffoc9ku8IUZjhQh3v3Rl42lQr8.S",
        "date": "2020-02-10T15:46:51.778Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyYWFkNjJmOWI5YTFjNjA1ZTI5NzgiLCJpYXQiOjE2MDEzNTAzNTh9.yaU-FnWzUKzBvNxAchS0O6sGWoD5GpyC-lWombv4rA8"
    }
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.patch('/:id', auth, storage.single('photo'), function (req, res){
    controller.updateUser(req.params.id, req.body, req.file)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});



/**
 * @api {delete} /user/:id DeleteUser 
 * @apiGroup User
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
    controller.deleteUser(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

/**
 * @api {post} /user/:id LoginUser 
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiParam {String} email Correo de usuario
 * @apiParam {String} password Clave de usuario
 * @apiSuccess {Object[]} user Datos del usuario logueado
 * @apiSuccess {Id} user._id ID de usuario
 * @apiSuccess {String} user.name Nombre del usuario
 * @apiSuccess {String} user.lastname Apellido del usuario
 * @apiSuccess {String} user.photo Url de la imagen del usuario
 * @apiSuccess {String} user.email Correo electronico del usuario
 * @apiSuccess {Date} user.date Fecha de registro del usuario
 * @apiSuccess {String} use.token Token de seguridad
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "error": 0,
  "mensaje": {
    "_id": "5f5ab604a3a5a02530e81562",
    "name": "Erick",
    "lastname": "Hernandez",
    "photo": "/public/files/ev4bemNaY-z0ikMh194wE_yZwNcuABPza25QSiWc64Z8OVvqN0LTsRY3kbJOYW6d.jpg",
    "email": "takashi.onimaru@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjVhYjYwNGEzYTVhMDI1MzBlODE1NjIiLCJpYXQiOjE2MDEzNTk5MjR9.HifZ-HT1WX8v-m0JO0BDcpPyBLR70husgvUXMOUNOoA"
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
 * @api {get} /user/me Perfil 
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Datos del usuario autenticado
 * @apiHeader {String} token Token de acceso de usuario.
 * @apiSuccess {Id} user._id ID de usuario
 * @apiSuccess {String} user.name Nombre del usuario
 * @apiSuccess {String} user.lastname Apellido del usuario
 * @apiSuccess {String} user.photo Url de la imagen del usuario
 * @apiSuccess {String} user.email Correo electronico del usuario
 * @apiSuccess {Date} user.date Fecha de registro del usuario
 * @apiSuccessExample {json} Ejemplo de respuesta correcta
 * {
  "_id": "5f72d42900e63838cce64756",
  "name": "Erick",
  "lastname": "Hernandez",
  "email": "takashi.onimaru@gmail.com",
  "date": "2020-09-29T06:28:57.779Z",
  "photo": "/public/files/d1fMhe9_efe_lXtntP-fReUycKThnRdNVWjM4k9UcEpHtA-X59CCK3sYTgVnDXCo.jpg"
}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
 router.get('/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user);
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
 router.post('/logout', auth, async (req, res) => {
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
router.post('/logoutall', auth, async(req, res) => {
    controller.logoutAll(req.user._id)
    .then((user) => {
        response.success(req, res, user, 200);
        
    })
    .catch(e => {
        response.error(req, res, 'Invalid user data', 400, e);
    });
 })

module.exports = router;