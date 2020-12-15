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
            "type": "Id",
            "optional": false,
            "field": "_id",
            "description": "<p>ID de conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dln",
            "description": "<p>Numero de identificacion del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Fecha de nacimiento del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expDateDln",
            "description": "<p>Fecha de vencimiento del DLN</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageDln",
            "description": "<p>Url de la imagen de la licencia del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sex",
            "description": "<p>Sexo del conductor</p>"
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
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Direccion del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Codigo postal del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "twicCard",
            "description": "<hr>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "experience",
            "description": "<p>Listado de campos de experiencia del conductor</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "experience._id",
            "description": "<p>ID del campo de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "experience.name",
            "description": "<p>Nombre del campo de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "experience.years",
            "description": "<p>Años de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "experience.have",
            "description": "<p>Indica si posee el campo de experiencia</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n  \"error\": 0,\n  \"mensaje\": [\n    {\n      _id: \"5fd2a024658229177cb3e66b\",\n      dln: 161342589,\n      expDateDln: \"2025-03-21T00:00:00.000Z\",\n      birthDate: \"1985-03-21T00:00:00.000Z\",\n      areaCode: 414,\n      phoneNumber: \"3168556\",\n      sex: 1,\n      address: \"Av Sucre de los Dos Caminos\",\n      zipCode: \"1030\",\n      __v: 1,\n      description: \"Esta es una prueba de edicion desde experiencia directamente\",\n      experience: [\n        {\n          years: 4,\n          _id: \"5fd7a053398f454368ccb2be\",\n          name: \"Tamk endorsed\",\n          have: true\n        },\n        {\n          years: 2,\n          _id: \"5fd7a053398f454368ccb2bf\",\n          name: \"Hazmat\",\n          have: true\n        },\n        {\n          years: 0,\n          _id: \"5fd7a053398f454368ccb2c0\",\n          name: \"Referred loads\",\n          have: false\n        },\n        {\n          years: 1,\n          _id: \"5fd7a053398f454368ccb2c1\",\n          name: \"Van\",\n          have: true\n        },\n        {\n          years: 10,\n          _id: \"5fd7a053398f454368ccb2c2\",\n          name: \"Car Carrier\",\n          have: true\n        },\n        {\n          years: 3,\n          _id: \"5fd7a053398f454368ccb2c3\",\n          name: \"Flat Bed\",\n          have: true\n        }\n      ],\n      twicCard: true\n    }\n  ]\n}",
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
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Clave de acceso del usuario</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de peticion",
          "content": "{\n    \"base\": {\n      \"name\": \"Pedro\",\n      \"lastname\": \"Perez\"\n    },\n    \"birthDate\": \"1985-05-21T06:28:57.779Z\",\n    \"areaCode\": 212,\n    \"phoneNumber\": 4145689,\n    \"sex\": 1,\n    \"address\": \"Venezuela\",\n    \"password\": \"123456789\",\n    \"zipCode\": 10548\n  }",
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
            "description": "<p>ID del Driver</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.dln",
            "description": "<p>Numero de licencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.expDateDln",
            "description": "<p>Fecha de expiracion de la licencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.birthDate",
            "description": "<p>Fecha de nacimiento del driver</p>"
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
            "type": "String",
            "optional": false,
            "field": "driver.phoneNumber",
            "description": "<p>Numero telefono</p>"
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
            "type": "Number",
            "optional": false,
            "field": "driver.rating",
            "description": "<p>Promedio de puntuacion del driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.description",
            "description": "<p>Descripcion breve del Driver</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "driver.experience",
            "description": "<p>Arreglo de objetos con campos de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.experience.name",
            "description": "<p>Nombre del campos de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "driver.experience.have",
            "description": "<p>Indica si posee el campo de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.experience.years",
            "description": "<p>Numero de años de experiencia</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"error\": 0,\n    \"data\": {\n      \"user\": {\n        \"_id\": \"5fd2a024658229177cb3e66c\",\n        \"name\": \"Pedro\",\n        \"lastname\": \"Perez\",\n        \"typeUser\": 1,\n        \"photo\": \"https://www.unitecnar.edu.co/sites/default/files/pictures/user_default.png\",\n        \"google_id\": \"104953011490801331331\",\n        \"email\": \"pedro.perez@gmail.com\",\n        \"date\": \"2020-12-10T22:24:36.492Z\"\n      },\n      \"driver\": {\n        \"_id\": \"5fd2a024658229177cb3e66b\",\n        \"dln\": 161342589,\n        \"expDateDln\": \"2025-03-21T00:00:00.000Z\",\n        \"birthDate\": \"1985-03-21T00:00:00.000Z\",\n        \"areaCode\": 414,\n        \"phoneNumber\": \"3168556\",\n        \"sex\": 1,\n        \"address\": \"Av Sucre de los Dos Caminos\",\n        \"zipCode\": \"1030\",\n        \"rating\": 3,\n        \"description\": \"Esta es una prueba de edicion desde experiencia directamente\",\n        \"experience\": [\n          {\n            \"years\": 4,\n            \"_id\": \"5fd7a053398f454368ccb2be\",\n            \"name\": \"Tamk endorsed\",\n            \"have\": true\n          },\n          {\n            \"years\": 2,\n            \"_id\": \"5fd7a053398f454368ccb2bf\",\n            \"name\": \"Hazmat\",\n            \"have\": true\n          },\n          {\n            \"years\": 0,\n            \"_id\": \"5fd7a053398f454368ccb2c0\",\n            \"name\": \"Referred loads\",\n            \"have\": false\n          },\n          {\n            \"years\": 1,\n            \"_id\": \"5fd7a053398f454368ccb2c1\",\n            \"name\": \"Van\",\n            \"have\": true\n          },\n          {\n            \"years\": 10,\n            \"_id\": \"5fd7a053398f454368ccb2c2\",\n            \"name\": \"Car Carrier\",\n            \"have\": true\n          },\n          {\n            \"years\": 3,\n            \"_id\": \"5fd7a053398f454368ccb2c3\",\n            \"name\": \"Flat Bed\",\n            \"have\": true\n          }\n        ],\n        \"twicCard\": true\n      }\n    }\n  }",
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
    "type": "patch",
    "url": "/driver/experience",
    "title": "UpdateExperience",
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
            "type": "Number",
            "optional": false,
            "field": "dln",
            "description": "<p>Numero de licencia</p>"
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
            "type": "String",
            "optional": false,
            "field": "imageDln",
            "description": "<p>Url de la imagen con la foto de la licencia</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripcion breve del Driver</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "twicCard",
            "description": "<hr>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "experience",
            "description": "<p>Arreglo de objetos con campos de experiencia</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "experience.name",
            "description": "<p>Nombre del campos de experiencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "experience.have",
            "description": "<p>Indica si posee el campo de experiencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "experience.years",
            "description": "<p>Numero de años de experiencia</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de peticion",
          "content": "{\n    \"dln\": 161342589,\n    \"expDateDln\": \"2025-03-21T00:00:00.000Z\",\n    \"imageDln\": \"\",\n    \"description\": \"Esta es una prueba de edicion desde experiencia directamente\",\n    \"twicCard\": true,\n    \"experience\": [{\n      \"name\": \"Tamk endorsed\",\n      \"have\": true,\n      \"years\": 4\n    },\n    {\n      \"name\": \"Hazmat\",\n      \"have\": true,\n      \"years\": 2\n    },\n    {\n      \"name\": \"Referred loads\",\n      \"have\": false,\n      \"years\": 0\n    },\n    {\n      \"name\": \"Van\",\n      \"have\": true,\n      \"years\": 1\n    },\n    {\n      \"name\": \"Car Carrier\",\n      \"have\": true,\n      \"years\": 10\n    },\n    {\n      \"name\": \"Flat Bed\",\n      \"have\": true,\n      \"years\": 3\n    }]\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"error\": 0,\n    \"data\": \"User experience updated\"\n  }",
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
    "name": "PatchDriverExperience"
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
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Clave de acceso del usuario</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de peticion",
          "content": "{\n    \"base\": {\n      \"name\": \"Pedro\",\n      \"lastname\": \"Perez\",\n      \"typeUser\": 1,\n      \"photo\": \"https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c\",\n      \"email\": \"pedro.perez@gmail.com\",\n      \"google_id\": 107579238748342085879,\n      \"facebook_id\": 10158547873145036\n    },\n    \"dln\": 14258369,\n    \"expDateDln\": \"2025-05-21T06:28:57.779Z\",\n    \"birthDate\": \"1985-05-21T06:28:57.779Z\",\n    \"areaCode\": 212,\n    \"phoneNumber\": 4145689,\n    \"password\": \"123456789\"\n    \"sex\": 1,\n    \"address\": \"Venezuela\",\n    \"zipCode\": \"10548\"\n  }",
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
          "content": "{\n    \"error\": 0,\n    \"data\": {\n      driver: {\n        _id: \"5fd7c15b7e44982680f994ac\",\n        address: \"Los Dos Caminos\",\n        areaCode: 414,\n        birthDate: \"2020-12-14T04:00:00.000Z\",\n        dln: 147854623,\n        expDateDln: \"2020-12-14T04:00:00.000Z\",\n        experience: [],\n        phoneNumber: \"3168556\",\n        sex: 1,\n        zipCode: \"1030\",\n        __v: 0\n      },\n      user: {\n        _id: \"5fd7c15b7e44982680f994ad\", \n        name: \"Pedro\", \n        lastname: \"Perez\", \n        typeUser: 1,\n        date: \"2020-12-14T19:47:39.826Z\",\n        email: \"pedro.perez@gmail.com\",\n        photo: \"https://www.unitecnar.edu.co/sites/default/files/pictures/user_default.png\",\n        token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ3YzE1YjdlNDQ5ODI2ODBmOTk0YWQiLCJpYXQiOjE2MDc5NzUyNjB9.OLl6EAVD-vd4xw0vqdCl945yCa5u7lgfx27VBlKFKNI\"\n      }\n    }\n  }",
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
          "content": "{\n  \"data\": \"Usuario 5f72ba72f5aa7224d8cc9ee2 eliminado\"\n}",
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
    "url": "/user/:type",
    "title": "getUserList",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>Tipo de usuario (1-&gt; Driver | 2-&gt; Company)</p>"
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
            "field": "_id",
            "description": "<p>ID de usuario</p>"
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
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Url de la imagen del usuario</p>"
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
            "field": "email",
            "description": "<p>Correo electronico del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "driver",
            "description": "<p>Si el usuario es Driver (1) aqui estan todos sus datos</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "driver._id",
            "description": "<p>Id del driver</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.dln",
            "description": "<p>Numero de identificacion de la licencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.expDateDln",
            "description": "<p>Fecha de expiracion de la licencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.imageDln",
            "description": "<p>Url de la imagen de la licencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "driver.birthDate",
            "description": "<p>Fecha de cumpleaños del conductor</p>"
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
            "type": "String",
            "optional": false,
            "field": "driver.phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.sex",
            "description": "<p>Sexo del driver (1-&gt; Hombre | 2-&gt; Mujer | 3-&gt; Otro)</p>"
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
            "type": "Number",
            "optional": false,
            "field": "driver.rating",
            "description": "<p>Promedio de puntuacion del driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.description",
            "description": "<p>Descripcion breve del Driver</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "driver.experience",
            "description": "<p>Arreglo de objetos con campos de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.experience.name",
            "description": "<p>Nombre del campos de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "driver.experience.have",
            "description": "<p>Indica si posee el campo de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.experience.years",
            "description": "<p>Numero de años de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "company",
            "description": "<p>Si el usuario es Company (2) aqui estan todos sus datos</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "company._id",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.tradename",
            "description": "<p>Nombre comercial</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.legalNumber",
            "description": "<p>Numero de identificacion de la empresa</p>"
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
            "type": "String",
            "optional": false,
            "field": "company.phoneNumber",
            "description": "<p>Numero de telefono</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.address",
            "description": "<p>Direccion fisica de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.address2",
            "description": "<p>Direccion segunda linea</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.description",
            "description": "<p>Descripcion corta de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.zipCode",
            "description": "<p>ZipCode</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.logo",
            "description": "<p>Url de la imagen de la empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.state",
            "description": "<p>Estado donde esta ubicada</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "company.state._id",
            "description": "<p>Id del estado</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.state.stateName",
            "description": "<p>Nombre del estado</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.ciudad",
            "description": "<p>Ciudad donde esta ubicada</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "company.ciudad._id",
            "description": "<p>Id de la ciudad</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.ciudad.stateName",
            "description": "<p>Nombre de la ciudad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n    \"data\": [\n    {\n        \"_id\": \"5fb5479b949d6a2d98a91945\",\n        \"name\": \"Erick\",\n        \"lastname\": \"Hernandez\",\n        \"photo\": \"https://www.unitecnar.edu.co/sites/default/files/pictures/user_default.png\",\n        \"email\": \"takashi@dragonrock.com.ve\",\n        \"date\": \"2020-11-18T16:11:07.098Z\",\n        \"driver\": {\n            \"_id\": \"5fb5479a949d6a2d98a91944\",\n            \"dln\": 16436589,\n            \"imageDln\": \"/public/files/KhSaP8-nHTasW2R6rgPZR0kuVijdX3Z9NKo7oa-fHX3JVaBluSxGyBjY9sHM-4qk.jpg\",\n            \"expDateDln\": \"2020-11-28T04:00:00.000Z\",\n            \"birthDate\": \"2020-11-01T04:00:00.000Z\",\n            \"areaCode\": 414,\n            \"phoneNumber\": \"3168556\",\n            \"rating\": 3,\n            \"sex\": 1,\n            \"experience\": [\n            {\n                \"years\": 4,\n                \"_id\": \"5fd7a053398f454368ccb2be\",\n                \"name\": \"Tamk endorsed\",\n                \"have\": true\n            },\n            {\n                \"years\": 2,\n                \"_id\": \"5fd7a053398f454368ccb2bf\",\n                \"name\": \"Hazmat\",\n                \"have\": true\n            },\n            {\n                \"years\": 0,\n                \"_id\": \"5fd7a053398f454368ccb2c0\",\n                \"name\": \"Referred loads\",\n                \"have\": false\n            },\n            {\n                \"years\": 1,\n                \"_id\": \"5fd7a053398f454368ccb2c1\",\n                \"name\": \"Van\",\n                \"have\": true\n            },\n            {\n                \"years\": 10,\n                \"_id\": \"5fd7a053398f454368ccb2c2\",\n                \"name\": \"Car Carrier\",\n                \"have\": true\n            },\n            {\n                \"years\": 3,\n                \"_id\": \"5fd7a053398f454368ccb2c3\",\n                \"name\": \"Flat Bed\",\n                \"have\": true\n            }\n            ],\n            \"address\": \"Venezuela\",\n            \"zipCode\": \"1030\",\n            \"description\": \"klhg gh kh fth dr\"\n        },\n        \"company\": {\n            \"_id\": \"5faeb15ef909381520db5c50\",\n            \"tradename\": \"Dragonrock\",\n            \"legalNumber\": \"1478956327\",\n            \"areaCode\": 414,\n            \"phoneNumber\": \"31685567\",\n            \"address\": \"Los Dos Caminos\",\n            \"address2\": \"ghfhfh\",\n            \"description\": \"Cualquier cosa\",\n            \"zipCode\": \"1030\",\n            \"logo\": \"/public/files/UWy-arz6QFkscjZpxGfJiuIO1syhP6XDrLmJuzwAZWkwk5HfbcPkhM8240n4CWgT.png\",\n            \"state\": {\n                \"_id\": \"5fc68b66fd5663f19004aca6\",\n                \"stateName\": \"California\"\n            },\n            \"city\": {\n                \"_id\": \"5fc6a427fd5663f1900b7813\",\n                \"cityName\": \"Floriston\"\n            }\n        }\n    }\n    ]\n}",
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
    "name": "GetUserType"
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
            "type": "Id",
            "optional": false,
            "field": "driver._id",
            "description": "<p>Id del conductor</p>"
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
            "type": "Object[]",
            "optional": false,
            "field": "driver.experience",
            "description": "<p>Años de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "driver.experience.years",
            "description": "<p>Cantidad de años de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver.experience.name",
            "description": "<p>Nombre del campo de experiencia</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "driver.experience.have",
            "description": "<p>Indica si posee ese campo de experiencia</p>"
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
            "type": "Id",
            "optional": false,
            "field": "company._id",
            "description": "<p>Id de la empresa</p>"
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
            "description": "<p>Direccion fisica de empresa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.address2",
            "description": "<p>Direccion linea 2</p>"
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
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.state",
            "description": "<p>Estado donde esta ubicada</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "company.state._id",
            "description": "<p>Id del estado</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.state.stateName",
            "description": "<p>Nombre del estado</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.ciudad",
            "description": "<p>Ciudad donde esta ubicada</p>"
          },
          {
            "group": "Success 200",
            "type": "Id",
            "optional": false,
            "field": "company.ciudad._id",
            "description": "<p>Id de la ciudad</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company.ciudad.stateName",
            "description": "<p>Nombre de la ciudad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta correcta",
          "content": "{\n  \"data\": {\n    _id: 5f8f6781b57fcf31145bb164,\n    name: 'Pedro',\n    lastname: 'Perez',\n    typeUser: 1,\n    photo: 'https://lh3.googleusercontent.com/a-/AOhZR5U4Eu0rGUgUybuzcSMw=s96-c',\n    email: 'pedro.perez@gmail.com',\n    google_id: '107579238748342099879',\n    facebook_id: '10158547873184036',\n    date: 2020-10-20T22:41:05.496Z,\n    token: 'eyJhbGciOiJIUzI19LIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhmNjc4MWI1N2ZjZjMxMTQ1YmIxNjQiLCJpYXQiOjE2MDM2NTgzOTB9.GIdlwhPUgpIQkJH61y31U26bdxDChRvK_xGT7Pf-VK0',\n    driver: {\n        _id: \"5faeb15ef909381520db5c50\",\n        dln: 14258369,\n        imageDln: '/public/files/undefined',\n        birthDate: 1988-05-11T00:00:00.000Z,\n        areaCode: 424,\n        phoneNumber: 7845612,\n        sex: 1,\n        address: 'Lorem ipsum dolor sit amet',\n        zipCode: '1030',\n        description: 'Donec sit amet fringilla libero, in dictum neque',\n        expDateDln: 2021-03-21T00:00:00.000Z,\n        twicCard: true,\n        experience: [\n            {\n                years: 4,\n                _id: \"5fd7a053398f454368ccb2be\",\n                name: \"Tamk endorsed\",\n                have: true\n            },\n            {\n                years: 2,\n                _id: \"5fd7a053398f454368ccb2bf\",\n                name: \"Hazmat\",\n                have: true\n            },\n            {\n                years: 0,\n                _id: \"5fd7a053398f454368ccb2c0\",\n                name: \"Referred loads\",\n                have: false\n            },\n            {\n                years: 1,\n                _id: \"5fd7a053398f454368ccb2c1\",\n                name: \"Van\",\n                have: true\n            },\n            {\n                years: 10,\n                _id: \"5fd7a053398f454368ccb2c2\",\n                name: \"Car Carrier\",\n                have: true\n            },\n            {\n                years: 3,\n                _id: \"5fd7a053398f454368ccb2c3\",\n                name: \"Flat Bed\",\n                have: true\n            }\n        ]\n    },\n    company: {\n        _id: \"5faeb15ef909381520db5c50\",\n        tradename: 'Lorem Ipsum',\n        legalNumber: 'V14258369',\n        areaCode: 424,\n        phoneNumber: 7845612,\n        logo: '/public/files/undefined',\n        address: 'Miranda - Caracas',\n        address2: 'Venezuela',\n        description: 'Maecenas consectetur velit sit amet lorem auctor ultrices',\n        zipCode: '1031',\n        state: {\n          _id: \"5fc68b66fd5663f19004aca6\",\n          stateName: \"California\"\n        },\n        city: {\n          _id: \"5fc6a427fd5663f1900b7813\",\n          cityName: \"Floriston\"\n        }\n    }\n}",
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
          "content": "{\n  \"data\": \"Done\"\n}",
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
          "content": "{\n  \"data\": \"Done\"\n}",
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
