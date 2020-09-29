define({ "api": [
  {
    "type": "delete",
    "url": "/user/:id",
    "title": "DeleteUser",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de acceso de usuario.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "_id",
            "description": "<p>ID de usuario</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n  \"error\": 0,\n  \"mensaje\": \"Usuario 5f72ba72f5aa7224d8cc9ee2 eliminado\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "api/components/user/network.js",
    "groupTitle": "User",
    "name": "DeleteUserId"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "getUserList",
    "group": "User",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user",
            "description": "<p>Datos del usuario registrado</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID de usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.photo",
            "description": "<p>Url de la imagen del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "user.date",
            "description": "<p>Fecha de registro del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Correo electronico del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>Clave cifrada electronico del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user.tokens",
            "description": "<p>Listado de tokens de seguridad registrados por el usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "user.tokens._id",
            "description": "<p>ID del token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.tokens.token",
            "description": "<p>Token de seguridad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"error\": 0,\n    \"mensaje\": [\n        {\n        \"_id\": \"5f72aad62f9b9a1c605e2978\",\n        \"name\": \"Juan\",\n        \"lastname\": \"Perez\",\n        \"date\": \"2020-02-10T15:46:51.778Z\",\n        \"email\": \"juanperez@gmail.com\",\n        \"password\": \"$2a$08$wMlMgPTVQf/SdKZlIKL4VuOXEffoc9ku8IUZjhQh3v3Rl42lQr8.S\",\n        \"photo\": \"http://localhost:3000./public/files/haHR0E2O68nPpcpx668vEJRYC33hHSritUY0tOIE42nkOyN94saIKDB7QzJ-q-iS.jpg\",\n        \"tokens\": [\n            {\n            \"_id\": \"5f72aad62f9b9a1c605e2979\",\n            \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyYWFkNjJmOWI5YTFjNjA1ZTI5NzgiLCJpYXQiOjE2MDEzNTAzNTh9.yaU-FnWzUKzBvNxAchS0O6sGWoD5GpyC-lWombv4rA8\"\n            }\n        ],\n        \"__v\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "api/components/user/network.js",
    "groupTitle": "User",
    "name": "GetUser"
  },
  {
    "type": "get",
    "url": "/user/me",
    "title": "Perfil",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Datos del usuario autenticado</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de acceso de usuario.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID de usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.photo",
            "description": "<p>Url de la imagen del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Correo electronico del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "user.date",
            "description": "<p>Fecha de registro del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n  \"_id\": \"5f72d42900e63838cce64756\",\n  \"name\": \"Erick\",\n  \"lastname\": \"Hernandez\",\n  \"email\": \"takashi.onimaru@gmail.com\",\n  \"date\": \"2020-09-29T06:28:57.779Z\",\n  \"photo\": \"/public/files/d1fMhe9_efe_lXtntP-fReUycKThnRdNVWjM4k9UcEpHtA-X59CCK3sYTgVnDXCo.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "api/components/user/network.js",
    "groupTitle": "User",
    "name": "GetUserMe"
  },
  {
    "type": "patch",
    "url": "/user/:id",
    "title": "UpdateUser",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de acceso de usuario.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "_id",
            "description": "<p>ID de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "photo",
            "description": "<p>Imagen del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Correo electronico del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Clave en crudo del usuario</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user",
            "description": "<p>Datos del usuario registrado</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID de usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.photo",
            "description": "<p>Url de la imagen del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Correo electronico del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>Clave cifrada del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "user.date",
            "description": "<p>Fecha de registro del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "use.token",
            "description": "<p>Token de seguridad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"error\": 0,\n    \"mensaje\": {\n        \"_id\": \"5f72aad62f9b9a1c605e2978\",\n        \"name\": \"Juan\",\n        \"lastname\": \"Perez\",\n        \"photo\": \"http://localhost:3000./public/files/haHR0E2O68nPpcpx668vEJRYC33hHSritUY0tOIE42nkOyN94saIKDB7QzJ-q-iS.jpg\",\n        \"email\": \"juanperez@gmail.com\",\n        \"password\": \"$2a$08$wMlMgPTVQf/SdKZlIKL4VuOXEffoc9ku8IUZjhQh3v3Rl42lQr8.S\",\n        \"date\": \"2020-02-10T15:46:51.778Z\",\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyYWFkNjJmOWI5YTFjNjA1ZTI5NzgiLCJpYXQiOjE2MDEzNTAzNTh9.yaU-FnWzUKzBvNxAchS0O6sGWoD5GpyC-lWombv4rA8\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "api/components/user/network.js",
    "groupTitle": "User",
    "name": "PatchUserId"
  },
  {
    "type": "post",
    "url": "/user",
    "title": "AddNewUser",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "photo",
            "description": "<p>Imagen del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Correo electronico del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Clave en crudo del usuario</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user",
            "description": "<p>Datos del usuario registrado</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID de usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.photo",
            "description": "<p>Url de la imagen del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Correo electronico del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>Clave cifrada del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "user.date",
            "description": "<p>Fecha de registro del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "use.token",
            "description": "<p>Token de seguridad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"error\": 0,\n    \"mensaje\": {\n        \"_id\": \"5f72aad62f9b9a1c605e2978\",\n        \"name\": \"Juan\",\n        \"lastname\": \"Perez\",\n        \"photo\": \"/public/files/haHR0E2O68nPpcpx668vEJRYC33hHSritUY0tOIE42nkOyN94saIKDB7QzJ-q-iS.jpg\",\n        \"email\": \"juanperez@gmail.com\",\n        \"password\": \"$2a$08$wMlMgPTVQf/SdKZlIKL4VuOXEffoc9ku8IUZjhQh3v3Rl42lQr8.S\",\n        \"date\": \"2020-02-10T15:46:51.778Z\",\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyYWFkNjJmOWI5YTFjNjA1ZTI5NzgiLCJpYXQiOjE2MDEzNTAzNTh9.yaU-FnWzUKzBvNxAchS0O6sGWoD5GpyC-lWombv4rA8\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "api/components/user/network.js",
    "groupTitle": "User",
    "name": "PostUser"
  },
  {
    "type": "post",
    "url": "/user/:id",
    "title": "LoginUser",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Correo de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Clave de usuario</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user",
            "description": "<p>Datos del usuario logueado</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID de usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.photo",
            "description": "<p>Url de la imagen del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Correo electronico del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "user.date",
            "description": "<p>Fecha de registro del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "use.token",
            "description": "<p>Token de seguridad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n  \"error\": 0,\n  \"mensaje\": {\n    \"_id\": \"5f5ab604a3a5a02530e81562\",\n    \"name\": \"Erick\",\n    \"lastname\": \"Hernandez\",\n    \"photo\": \"/public/files/ev4bemNaY-z0ikMh194wE_yZwNcuABPza25QSiWc64Z8OVvqN0LTsRY3kbJOYW6d.jpg\",\n    \"email\": \"takashi.onimaru@gmail.com\",\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjVhYjYwNGEzYTVhMDI1MzBlODE1NjIiLCJpYXQiOjE2MDEzNTk5MjR9.HifZ-HT1WX8v-m0JO0BDcpPyBLR70husgvUXMOUNOoA\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "api/components/user/network.js",
    "groupTitle": "User",
    "name": "PostUserId"
  },
  {
    "type": "post",
    "url": "/user/logout",
    "title": "Logout",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Cierra sesion del dispositivo conectado unicamente</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de acceso de usuario.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n  \"error\": 0,\n  \"mensaje\": \"Done\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "api/components/user/network.js",
    "groupTitle": "User",
    "name": "PostUserLogout"
  },
  {
    "type": "post",
    "url": "/user/logoutall",
    "title": "LogoutAll",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Cierra sesion de todos los dispositvos conectados</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de acceso de usuario.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n  \"error\": 0,\n  \"mensaje\": \"Done\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "api/components/user/network.js",
    "groupTitle": "User",
    "name": "PostUserLogoutall"
  }
] });
