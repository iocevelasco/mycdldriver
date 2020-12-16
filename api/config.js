const dbUser = 'rootWS';
const dbPass = 'PCiUiLkE9es7q5x';
const dbName = 'TESTNODEWS';
const cluster = 'cluster0.mtjcn';
const key = 'AimeGabrielaSophia';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const config = {
    dbUrl: process.env.BD_URL || 'mongodb+srv://' + dbUser + ':' + dbPass + '@' + cluster + '.mongodb.net/' + dbName + '?retryWrites=true&w=majority',
    monDebug: process.env.MONGO_DEBUG || false,
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    JWT_KEY: process.env.JWT_KEY || key,
    publicRoute: process.env.PUBLIC_ROUTE || '/public',
    filesRoute: process.env.FILES_ROUTE || '/files',
    dev: process.env.NODE_ENV !== 'production',
    memcached: process.env.MEMCACHIER_SERVERS !== 'mc4.dev.ec2.memcachier.com:11211',
    oauth:  {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID || '762087274564-vhbjmlqm5vc8qmc9slkd8tjtkh447dut.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '2EjAZAVFLJFjLLBxBS2Z0d5y',
            clientApiKey: process.env.GOOGLE_API_KEY || 'AIzaSyDSOUjBm0pendidM_fv3BkFnWFm2h2UXHI',
            callbackURL: process.env.GOOGLE_CALLBACK || 'http://localhost:3000/auth/google/callback'
        },
        facebook: {
            clientID: process.env.FACEBOOK_CLIENT_ID || '371266210898392',
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '50eeb472813974f76e27e299ab859de4',
            callbackURL: process.env.FACEBOOK_CALLBACK || 'http://localhost:3000/auth/facebook/callback'
        }
    }
};

module.exports = config;