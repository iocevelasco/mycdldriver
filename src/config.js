const dbUser = 'takashius';
const dbPass = 'Ea3.141592654';
const dbName = 'telegrom';

const config = {
    dbUrl: process.env.BD_URL || 'mongodb+srv://' + dbUser + ':' + dbPass + '@cluster0-cekkf.mongodb.net/' + dbName + '?retryWrites=true&w=majority',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/public',
    filesRoute: process.env.FILES_ROUTE || '/files'
};

module.exports = config;