const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/db');
const config = require('./src/config');

const router = require('./src/network/routes');
db(config.dbUrl);

var app = express();
app.use(bodyParser.json());
router(app);

app.listen(config.port, function(){
    console.log('La app esta escuchando en ' + config.host + ':' + config.port + ' del archivo index.js');
});