define({ "api": [
  {
    "type": "get",
    "url": "/company",
    "title": "getCompanyList",
    "group": "Company",
    "description": "<p>Este metodo debe modificarse, no es definitivo</p>",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "_id",
            "description": "<p>ID de la compañia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tradename",
            "description": "<p>Nombre de la compañia</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "legalNumber",
            "description": "<p>Numero de registro de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "areaCode",
            "description": "<p>Codigo de area del telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logo",
            "description": "<p>Foto del logo de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Direccion fisica de habitacion</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion breve de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"error\": 0,\n    \"mensaje\": [\n        {\n        \"_id\": \"5f8f726442cd1a1498021acf\",\n        \"tradename\": \"ErDesarrollo\",\n        \"legalNumber\": \"V161342366\",\n        \"areaCode\": 424,\n        \"phoneNumber\": 316855645,\n        \"logo\": \"/public/files/undefined\",\n        \"address\": \"Miranda - Caracas - Venezuela\",\n        \"description\": \"Desarrollo de sitios web usando wordpress como CMS\",\n        \"zipCode\": \"1031\",\n        \"__v\": 0\n        }\n    ]\n    }",
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
    "filename": "api/components/profile_company/network.js",
    "groupTitle": "Company",
    "name": "GetCompany"
  },
  {
    "type": "patch",
    "url": "/company",
    "title": "UpdateCompany",
    "group": "Company",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Bearer",
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
            "type": "Object[]",
            "optional": false,
            "field": "base",
            "description": "<p>Datos basicos de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tradename",
            "description": "<p>Nombre de la compañia</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalNumber",
            "description": "<p>Numero de registro de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "areaCode",
            "description": "<p>Codigo de area del telefono</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Direccion fisica de habitacion</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion breve de la empresa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de peticion",
          "content": "{\n    \"base\": {\n      \"name\": \"Pedro\",\n      \"lastname\": \"Perez\"\n    },\n    \"tradename\": 14258369,\n    \"legalNumber\": \"2025-05-21T06:28:57.779Z\",\n    \"areaCode\": 212,\n    \"phoneNumber\": 4145689,\n    \"address\": \"Venezuela\",\n    \"zipCode\": 10548,\n    \"description\": \"Donec sit amet fringilla libero, in dictum neque\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"error\": 0,\n    \"mensaje\": true\n  }",
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
    "filename": "api/components/profile_company/network.js",
    "groupTitle": "Company",
    "name": "PatchCompany"
  },
  {
    "type": "post",
    "url": "/company",
    "title": "AddNewCompany",
    "group": "Company",
    "version": "2.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "base",
            "description": "<p>Datos basicos de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.typeUser",
            "description": "<p>Tipo de usuario (1-&gt; Driver | 2-&gt; Company)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.photo",
            "description": "<p>Foto del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.email",
            "description": "<p>Correo electronico del usuario (unico)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "base.google_id",
            "description": "<p>ID de usuario de google cuando se loguea desde esa red social</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.facebook_id",
            "description": "<p>ID de usuario de facebook cuando se loguea desde esa red social</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tradename",
            "description": "<p>Nombre de la compañia</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalNumber",
            "description": "<p>Numero de registro de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Direccion fisica de habitacion</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion breve de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "areaCode",
            "description": "<p>Codigo de area del telefono</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de peticion",
          "content": "{\n    \"base\": {\n      \"name\": \"Pedro\",\n      \"lastname\": \"Perez\",\n      \"typeUser\": 1,\n      \"photo\": \"https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c\",\n      \"email\": \"pedro.perez@gmail.com\",\n      \"google_id\": 107579238748342099879,\n      \"facebook_id\": 10158547873184036\n    },\n\t\"tradename\": \"Lorem Ipsum\",\n\t\"legalNumber\": \"V14258369\",\n\t\"address\": \"Miranda - Caracas - Venezuela\",\n\t\"description\": \"Maecenas consectetur velit sit amet lorem auctor ultrices\",\n\t\"areaCode\": 212,\n\t\"phoneNumber\": 4145689,\n\t\"zipCode\": 1031\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user",
            "description": "<p>Datos basicos de usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID del usuario registrado</p>"
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
            "type": "Number",
            "optional": false,
            "field": "user.typeUser",
            "description": "<p>Tipo de usuario (1-&gt; Driver | 2-&gt; Company)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.photo",
            "description": "<p>Foto del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.google_id",
            "description": "<p>ID de usuario de google cuando se loguea desde esa red social</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.facebook_id",
            "description": "<p>ID de usuario de facebook cuando se loguea desde esa red social</p>"
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
            "description": "<p>Fecha de regitro de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.token",
            "description": "<p>Token de seguridad</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "company",
            "description": "<p>Datos del usuario asociados al rol de empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "company._id",
            "description": "<p>ID de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.tradename",
            "description": "<p>Nombre de la compañia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.legalNumber",
            "description": "<p>Numero de registro de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.logo",
            "description": "<p>Foto del logo de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "company.areaCode",
            "description": "<p>Codigo de area del telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "company.phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.address",
            "description": "<p>Direccion fisica de habitacion</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "company.zipCode",
            "description": "<p>Zip Code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.description",
            "description": "<p>Descripcion breve de la empresa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"error\": 0,\n    \"mensaje\": {\n        \"user\": {\n            \"_id\": \"5f95f942ae7cae3c9c07fd8d\",\n            \"name\": \"Pedro\",\n            \"lastname\": \"Perez\",\n            \"typeUser\": 1,\n            \"photo\": \"https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c\",\n            \"google_id\": \"107579238748342090000\",\n            \"facebook_id\": \"10158547873184036\",\n            \"email\": \"pedro.perez@gmail.com\",\n            \"date\": \"2020-10-25T22:16:34.124Z\",\n            \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk1Zjk0MmFlN2NhZTNjOWMwN2ZkOGQiLCJpYXQiOjE2MDM2NjQxOTR9.E06IDjKu6FzWJyzStWj2XD0CCAgGGn5rLHqUg8JqUYU\"\n        },\n        \"company\": {\n            \"_id\": \"5f95f941ae7cae3c9c07fd8c\",\n            \"tradename\": \"Lorem Ipsum\",\n            \"legalNumber\": \"V14258369\",\n            \"areaCode\": 212,\n            \"phoneNumber\": 4145689,\n            \"logo\": \"\",\n            \"address\": \"Miranda - Caracas - Venezuela\",\n            \"description\": \"Maecenas consectetur velit sit amet lorem auctor ultrices\",\n            \"zipCode\": \"1031\",\n            \"__v\": 0\n        }\n    }\n}",
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
    "filename": "api/components/profile_company/network.js",
    "groupTitle": "Company",
    "name": "PostCompany"
  },
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
    "type": "patch",
    "url": "/driver",
    "title": "UpdateDriver",
    "group": "Driver",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Bearer",
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
            "type": "Object[]",
            "optional": false,
            "field": "base",
            "description": "<p>Datos basicos de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dln",
            "description": "<p>Numero de licencia del conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "expDateDln",
            "description": "<p>Fecha de vencimiento de la licencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Fecha de nacimiendo del conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "areaCode",
            "description": "<p>Codigo de area del telefono</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sex",
            "description": "<p>Sexo del usuario (1-&gt; Hombre | 2-&gt; Mujer | 3-&gt; Otro)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "experience",
            "description": "<p>Años de experiencia</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Direccion fisica de habitacion</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion breve de la empresa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de peticion",
          "content": "{\n    \"base\": {\n      \"name\": \"Pedro\",\n      \"lastname\": \"Perez\"\n    },\n    \"dln\": 14258369,\n    \"expDateDln\": \"2025-05-21T06:28:57.779Z\",\n    \"birthDate\": \"1985-05-21T06:28:57.779Z\",\n    \"areaCode\": 212,\n    \"phoneNumber\": 4145689,\n    \"sex\": 1,\n    \"experience\": 5,\n    \"address\": \"Venezuela\",\n    \"zipCode\": 10548,\n    \"description\": \"Donec sit amet fringilla libero, in dictum neque\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"error\": 0,\n    \"mensaje\": true\n  }",
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
    "name": "PatchDriver"
  },
  {
    "type": "post",
    "url": "/driver",
    "title": "AddNewDriver",
    "group": "Driver",
    "version": "2.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "base",
            "description": "<p>Datos basicos de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.typeUser",
            "description": "<p>Tipo de usuario (1-&gt; Driver | 2-&gt; Company)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.photo",
            "description": "<p>Foto del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base.email",
            "description": "<p>Correo electronico del usuario (unico)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "base.google_id",
            "description": "<p>ID de usuario de google cuando se loguea desde esa red social</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "base.facebook_id",
            "description": "<p>ID de usuario de facebook cuando se loguea desde esa red social</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dln",
            "description": "<p>Numero de licencia del conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "expDateDln",
            "description": "<p>Fecha de vencimiento de la licencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Fecha de nacimiendo del conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "areaCode",
            "description": "<p>Codigo de area del telefono</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sex",
            "description": "<p>Sexo del usuario (1-&gt; Hombre | 2-&gt; Mujer | 3-&gt; Otro)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "experience",
            "description": "<p>Años de experiencia</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Direccion fisica de habitacion</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion breve de la empresa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de peticion",
          "content": "{\n    \"base\": {\n      \"name\": \"Pedro\",\n      \"lastname\": \"Perez\",\n      \"typeUser\": 1,\n      \"photo\": \"https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c\",\n      \"email\": \"pedro.perez@gmail.com\",\n      \"google_id\": 107579238748342099879,\n      \"facebook_id\": 10158547873184036\n    },\n    \"dln\": 14258369,\n    \"expDateDln\": \"2025-05-21T06:28:57.779Z\",\n    \"birthDate\": \"1985-05-21T06:28:57.779Z\",\n    \"areaCode\": 212,\n    \"phoneNumber\": 4145689,\n    \"sex\": 1,\n    \"experience\": 5,\n    \"address\": \"Venezuela\",\n    \"zipCode\": \"10548\",\n    \"description\": \"Donec sit amet fringilla libero, in dictum neque\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user",
            "description": "<p>Datos basicos de usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID del usuario registrado</p>"
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
            "type": "Number",
            "optional": false,
            "field": "user.typeUser",
            "description": "<p>Tipo de usuario (1-&gt; Driver | 2-&gt; Company)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.photo",
            "description": "<p>Foto del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.google_id",
            "description": "<p>ID de usuario de google cuando se loguea desde esa red social</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.facebook_id",
            "description": "<p>ID de usuario de facebook cuando se loguea desde esa red social</p>"
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
            "description": "<p>Fecha de regitro del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.token",
            "description": "<p>Token de seguridad</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "driver",
            "description": "<p>Datos del usuario asociados al rol de conductor</p>"
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
            "field": "driver.dln",
            "description": "<p>Numero de licencia del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.imageDln",
            "description": "<p>Url de la foto del la licencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.expDateDln",
            "description": "<p>Fecha de vencimiento de la licencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.birthDate",
            "description": "<p>Fecha de nacimiendo del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.areaCode",
            "description": "<p>Codigo de area del telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.sex",
            "description": "<p>Sexo del usuario (1-&gt; Hombre | 2-&gt; Mujer | 3-&gt; Otro)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.experience",
            "description": "<p>Años de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.address",
            "description": "<p>Direccion fisica de habitacion</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.zipCode",
            "description": "<p>Zip Code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.description",
            "description": "<p>Descripcion breve de la empresa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"error\": 0,\n    \"mensaje\": {\n      \"user\": {\n        \"_id\": \"5f95ea6f84ada2278899d071\",\n        \"name\": \"Pedro\",\n        \"lastname\": \"Perez\",\n        \"typeUser\": 1,\n        \"photo\": \"https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c\",\n        \"google_id\": \"107579238748342090000\",\n        \"facebook_id\": \"10158547873184036\",\n        \"email\": \"pedro.perez@gmail.com\",\n        \"date\": \"2020-10-25T21:13:19.437Z\",\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk1ZWE2Zjg0YWRhMjI3ODg5OWQwNzEiLCJpYXQiOjE2MDM2NjAzOTl9.6QpKf1byRLCgk7uXWjfYygzQwhAGz8MmdvsTkRplms4\"\n      },\n      \"driver\": {\n        \"_id\": \"5f95ea6e84ada2278899d070\",\n        \"dln\": 14258369,\n        \"imageDln\": \"\",\n        \"expDateDln\": \"2025-05-21T06:28:57.779Z\",\n        \"birthDate\": \"1985-05-21T06:28:57.779Z\",\n        \"areaCode\": 212,\n        \"phoneNumber\": 4145689,\n        \"sex\": 1,\n        \"experience\": 5,\n        \"address\": \"Venezuela\",\n        \"zipCode\": 10548,\n        \"description\": \"Donec sit amet fringilla libero, in dictum neque\",\n        \"__v\": 0\n      }\n    }\n  }",
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
            "type": "Bearer",
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
            "type": "Number",
            "optional": false,
            "field": "user.typeUser",
            "description": "<p>Tipo de usuario (1-&gt; Driver | 2-&gt; Company)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.google_id",
            "description": "<p>ID de usuario de google cuando se loguea desde esa red social</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.facebook_id",
            "description": "<p>ID de usuario de facebook cuando se loguea desde esa red social</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user.driver",
            "description": "<p>Si el usuario es Driver (1) aqui estan todos sus datos</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user.company",
            "description": "<p>Si el usuario es Driver (1) aqui estan todos sus datos</p>"
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
          "content": "{\n    \"error\": 0,\n    \"mensaje\": [\n        {\n        \"_id\": \"5f72aad62f9b9a1c605e2978\",\n        \"name\": \"Juan\",\n        \"lastname\": \"Perez\",\n        \"date\": \"2020-02-10T15:46:51.778Z\",\n        \"email\": \"juanperez@gmail.com\",\n        \"typeUser\": 1,\n        \"google_id\": \"107579236887242099879\",\n        \"facebook_id\": \"10158714673184036\",\n        \"driver\": \"5f8f6780b57fcf31145bb163\",\n        \"company\": \"5f8f726442cd1a1498021acf\",\n        \"photo\": \"http://localhost:3000./public/files/haHR0E2O68nPpcpx668vEJRYC33hHSritUY0tOIE42nkOyN94saIKDB7QzJ-q-iS.jpg\",\n        \"tokens\": [\n            {\n            \"_id\": \"5f72aad62f9b9a1c605e2979\",\n            \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyYWFkNjJmOWI5YTFjNjA1ZTI5NzgiLCJpYXQiOjE2MDEzNTAzNTh9.yaU-FnWzUKzBvNxAchS0O6sGWoD5GpyC-lWombv4rA8\"\n            }\n        ],\n        \"__v\": 1\n        }\n    ]\n}",
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
    "type": "post",
    "url": "/login",
    "title": "LoginUser",
    "group": "User",
    "version": "2.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "_id",
            "description": "<p>Identificador unico de usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Apellido del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "typeUser",
            "description": "<p>Tipo de usuario (1-&gt; Driver | 2-&gt; Company)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Url de la imagen del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Correo electronico del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "google_id",
            "description": "<p>ID de usuario de google cuando se loguea desde esa red social</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "facebook_id",
            "description": "<p>ID de usuario de facebook cuando se loguea desde esa red social</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Fecha de registro del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de seguridad</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "driver",
            "description": "<p>Datos del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.dln",
            "description": "<p>Numero de licencia del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "driver.imageDln",
            "description": "<p>Foto de la licencia del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.birthDate",
            "description": "<p>Fecha de nacimiendo del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.areaCode",
            "description": "<p>Codigo de area del telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.sex",
            "description": "<p>Sexo del usuario (1-&gt; Hombre | 2-&gt; Mujer | 3-&gt; Otro)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.experience",
            "description": "<p>Años de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.address",
            "description": "<p>Direccion fisica de habitacion</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.zipCode",
            "description": "<p>Zip Code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.description",
            "description": "<p>Descripcion breve del conductor, habilidades, destrezas, etc...</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.expDateDln",
            "description": "<p>Fecha de vencimiento de la licencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "company",
            "description": "<p>Datos de la compañia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.tradename",
            "description": "<p>Nombre de la compañia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.legalNumber",
            "description": "<p>Numero de registro de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "company.areaCode",
            "description": "<p>Codigo de area del telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "company.phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "company.logo",
            "description": "<p>Foto del logo de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.address",
            "description": "<p>Direccion fisica de habitacion</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.description",
            "description": "<p>Descripcion breve de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "company.zipCode",
            "description": "<p>Zip Code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n  \"error\": 0,\n  \"mensaje\": {\n    _id: 5f8f6781b57fcf31145bb164,\n    name: 'Pedro',\n    lastname: 'Perez',\n    typeUser: 1,\n    photo: 'https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c',\n    email: 'pedro.perez@gmail.com',\n    google_id: '107579238748342099879',\n    facebook_id: '10158547873184036',\n    date: 2020-10-20T22:41:05.496Z,\n    token: 'eyJhbGciOiJIUzI19LIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhmNjc4MWI1N2ZjZjMxMTQ1YmIxNjQiLCJpYXQiOjE2MDM2NTgzOTB9.GIdlwhPUgpIQkJH61y31U26bdxDChRvK_xGT7Pf-VK0',\n    driver: {\n        dln: 14258369,\n        imageDln: '/public/files/undefined',\n        birthDate: 1988-05-11T00:00:00.000Z,\n        areaCode: 424,\n        phoneNumber: 7845612,\n        sex: 1,\n        experience: 10,\n        address: 'Lorem ipsum dolor sit amet',\n        zipCode: '1030',\n        description: 'Donec sit amet fringilla libero, in dictum neque',\n        expDateDln: 2021-03-21T00:00:00.000Z\n    },\n    company: {\n        tradename: 'Lorem Ipsum',\n        legalNumber: 'V14258369',\n        areaCode: 424,\n        phoneNumber: 7845612,\n        logo: '/public/files/undefined',\n        address: 'Miranda - Caracas - Venezuela',\n        description: 'Maecenas consectetur velit sit amet lorem auctor ultrices',\n        zipCode: '1031'\n    }\n}",
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
    "name": "PostLogin"
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
