define({ "api": [
  {
    "type": "get",
    "url": "/driver",
    "title": "getDriverList",
    "group": "Driver",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "driver",
            "description": "<p>Datos del conductor registrado</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "driver._id",
            "description": "<p>ID de conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.cdl",
            "description": "<p>Numero de identificacion del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.birthDate",
            "description": "<p>Fecha de nacimiento del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.imageCdl",
            "description": "<p>Url de la imagen de la licencia del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.sex",
            "description": "<p>Sexo del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.habilities",
            "description": "<p>Habilidades del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.description",
            "description": "<p>Descripcion del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "driver.user",
            "description": "<p>Listado de datos del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "driver.user._id",
            "description": "<p>ID del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.user.name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.user.lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.user.photo",
            "description": "<p>Url de la imagen del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.user.date",
            "description": "<p>Fecha de registro del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.user.email",
            "description": "<p>Correo electronico del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.user.password",
            "description": "<p>Clave cifrada electronico del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "driver.user.tokens",
            "description": "<p>Listado de tokens de seguridad registrados por el usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "driver.user.tokens._id",
            "description": "<p>ID del token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.user.tokens.token",
            "description": "<p>Token de seguridad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n  \"error\": 0,\n  \"mensaje\": [\n    {\n      \"_id\": \"5f735483938ab21aa0cb13dd\",\n      \"cdl\": 16134236,\n      \"birthDate\": \"1985-05-21T06:28:57.779Z\",\n      \"imageCdl\": \"/public/files/RHyJbGRuQtNSFrdZrAONpU84_bGlrf_aoNAkaeSdRBPFfJj7RtO4mrUKOTjT_M1L.jpg\",\n      \"sex\": 1,\n      \"habilities\": \"Manejo muy bien la bicicleta\",\n      \"description\": \"Me he caido muy poco\",\n      \"user\": {\n        \"_id\": \"5f72d42900e63838cce64756\",\n        \"name\": \"Erick\",\n        \"lastname\": \"Hernandez\",\n        \"email\": \"takashi.onimaru@gmail.com\",\n        \"password\": \"$2a$08$Yc/sqrnErDnpwoCSkfuGWOOq0exC4n7CEXCy5rKyz/Z5/G.2.c2E6\",\n        \"photo\": \"/public/files/d1fMhe9_efe_lXtntP-fReUycKThnRdNVWjM4k9UcEpHtA-X59CCK3sYTgVnDXCo.jpg\",\n        \"date\": \"2020-09-29T06:28:57.779Z\",\n        \"tokens\": [\n          {\n            \"_id\": \"5f7353e6938ab21aa0cb13dc\",\n            \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyZDQyOTAwZTYzODM4Y2NlNjQ3NTYiLCJpYXQiOjE2MDEzOTM2Mzh9.qzb15XXY8iPW8TSZptXHIotMGVXogWm-adGf0pVK8AE\"\n          }\n        ],\n        \"__v\": 5\n      },\n      \"__v\": 0\n    }\n  ]\n}",
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
    "filename": "api/components/profile_driver/network.js",
    "groupTitle": "Driver",
    "name": "GetDriver"
  },
  {
    "type": "post",
    "url": "/driver",
    "title": "AddNewDriver",
    "group": "Driver",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cdl",
            "description": "<p>Numero de idntificacion del conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Decha de nacimiento del conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "imageCdl",
            "description": "<p>Imagen de la licencia del conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sex",
            "description": "<p>Sexo del conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "habilities",
            "description": "<p>Habilidades del conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion del conductor</p>"
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
            "field": "driver",
            "description": "<p>Datos del conductor registrado</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.cdl",
            "description": "<p>Numero de identificacion del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.birthDate",
            "description": "<p>Fecha de nacimiento del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.imageCdl",
            "description": "<p>Url de la imagen de la licencia del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.sex",
            "description": "<p>Sexo del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.habilities",
            "description": "<p>Habilidades del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.description",
            "description": "<p>Descripcion del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "driver.user",
            "description": "<p>Id del usuario asociado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n  \"error\": 0,\n  \"mensaje\": {\n    \"_id\": \"5f7376d9e6153a2910ceba5b\",\n    \"cdl\": 15540621,\n    \"birthDate\": \"1985-05-21T06:28:57.779Z\",\n    \"imageCdl\": \"/public/files/e7yqayb96JVmZm3dRPi42koddNQx-ogL9VRAXY-ZT8XmQb2PzbeiSJsNp8jUoGIA.jpg\",\n    \"sex\": 0,\n    \"habilities\": \"Manejo muy bien la bicicleta\",\n    \"description\": \"Me he caido muy poco\",\n    \"user\": \"5f72d42900e63838cce64756\",\n    \"__v\": 0\n  }\n}",
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
    "filename": "api/components/profile_driver/network.js",
    "groupTitle": "Driver",
    "name": "PostDriver"
  },
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
            "type": "Id",
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
            "type": "Id",
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
            "type": "Id",
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
            "type": "Id",
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
