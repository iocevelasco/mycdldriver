const db = require('mongoose');

db.Promise = global.Promise;
async function connect(url){
    await db.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true, 
    })
    .then(() => console.log('[db] Conectada con exito'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });
}

module.exports = connect;