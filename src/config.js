const dbUser = 'rootWS';
const dbPass = 'PCiUiLkE9es7q5x';
const dbName = 'TESTNODEWS';
const key = 'AimeGabrielaSophia';

const config = {
    dbUrl: process.env.BD_URL || 'mongodb+srv://' + dbUser + ':' + dbPass + '@cluster0.mtjcn.mongodb.net/' + dbName + '?retryWrites=true&w=majority',
    port: process.env.PORT || 4000,
    host: process.env.HOST || 'http://localhost',
    JWT_KEY: process.env.JWT_KEY || key,
    publicRoute: process.env.PUBLIC_ROUTE || '/public',
    filesRoute: process.env.FILES_ROUTE || '/files'
};

module.exports = config;