const express = require('express');
const user = require('../components/user/network');
const driver = require('../components/profile_driver/network');
const url_api = "/api";

const routes = function(server){
    server.get(url_api + '/', function (req, res) {
        res.send({
            "data": "Prueba",
            "prueba": "data"
        });
    });
    server.use(url_api + '/user', user);
    server.use(url_api + '/driver', driver);
};

module.exports = routes;