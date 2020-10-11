const express = require('express');
const path = require('path');
const url = require('url');

const routes = function(server, dev, nextApp){

    const nextHandler = nextApp.getRequestHandler();

    // Static files
    // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
    server.use('/static', express.static(path.join(__dirname, 'static'), {
        maxAge: dev ? '0' : '365d'
    }));

    // Default catch-all renders Next app
    server.get('*', (req, res) => {
      const parsedUrl = url.parse(req.url, true);
      nextHandler(req, res, parsedUrl);
    });
};

module.exports = routes;