const dbUser = 'rootWS';
const dbPass = 'PCiUiLkE9es7q5x';
const dbName = 'TESTNODEWS';
const key = 'AimeGabrielaSophia';

const config = {
    dbUrl: process.env.BD_URL || 'mongodb+srv://' + dbUser + ':' + dbPass + '@cluster0.mtjcn.mongodb.net/' + dbName + '?retryWrites=true&w=majority',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    JWT_KEY: process.env.JWT_KEY || key,
    publicRoute: process.env.PUBLIC_ROUTE || '/public',
    filesRoute: process.env.FILES_ROUTE || '/files',
    dev: process.env.NODE_ENV !== 'production',
    oauth:  {
        google: {
            clientID: process.env.OAUTH2_CLIENT_ID || '762087274564-vhbjmlqm5vc8qmc9slkd8tjtkh447dut.apps.googleusercontent.com',
            clientSecret: process.env.OAUTH2_CLIENT_SECRET || '2EjAZAVFLJFjLLBxBS2Z0d5y',
            callbackURL: process.env.OAUTH2_CALLBACK || 'http://localhost:3000/auth/google/callback'
        }
    }
};

module.exports = config;