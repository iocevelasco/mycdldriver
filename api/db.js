const db = require('mongoose');
const config = require('./config');
db.set('useFindAndModify', false);
db.set('debug', config.monDebug);

db.Promise = global.Promise;
async function connect(url){
    await db.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false 
    })
    .then(() => console.log('[db] Conectada con exito', url))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });
}

module.exports = connect;