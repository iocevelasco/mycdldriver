const db = require('mongoose');

db.Promise = global.Promise;
//'mongodb+srv://takashius:Ea3.141592654@cluster0-cekkf.mongodb.net/telegrom?retryWrites=true&w=majority'
async function connect(url){
    await db.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('[db] Conectada con exito'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });
}

module.exports = connect;