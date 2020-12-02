const express = require('express');
const user = require('../components/user/network');
const driver = require('../components/profile_driver/network');
const company = require('../components/profile_company/network');
const companyJobs = require('../components/company_jobs/network');
const files = require('../components/files/network');
const cities = require('../components/cities/network');
const config = require('../config');
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
    server.use(url_api + '/company', company);
    server.use(url_api + '/company/jobs', companyJobs);
    server.use(url_api + '/files', files);
    server.use(url_api + '/address', cities);
    server.use(config.publicRoute, express.static('public'));
};

module.exports = routes;