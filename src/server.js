const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const config = require('./config');

const router = require('./network/routes');
db(config.dbUrl);

var app = express();
app.use(bodyParser.json());
router(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(config.port, function(){
    console.log('La app esta escuchando en ' + config.host + ':' + config.port + ' del archivo server.js');
});