const express = require('express');
const user = require('../components/user/network');
const url_api = "/api";

const routes = function(server){
    server.get(url_api + '/', function (req, res) {
        res.send({
            "data": "Prueba",
            "prueba": "data"
        });
    });
    server.use(url_api + '/user', user);
};

module.exports = routes;