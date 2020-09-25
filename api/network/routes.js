const express = require('express');
const url_api = "/api";

const routes = function(server){
    server.get(url_api + '/', function (req, res) {
        res.send({
            "data": "Prueba",
            "prueba": "data"
        });
    });
};

module.exports = routes;