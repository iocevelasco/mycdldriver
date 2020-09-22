const express = require('express');
const user = require('../components/user/network');

const routes = function(server){
    server.use('api/user', user);
};

module.exports = routes;