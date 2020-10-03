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
    auth0: {
        domain: process.env.AUTH0_DOMAIN || 'dev-8zm642k2.us.auth0.com',
        clientID: process.env.AUTH0_CLIENT_ID || 'pLRsn8o0a1uyBULqVk62sF3LcMMHfahr',
        clientSecret: process.env.AUTH0_CLIENT_SECRET || '5OLosllM-ZDwwJ4aU2u5HxhAAFzxGKD6DBl-XRZc-Vzmty-8cMm4UdllVw1sjBqN',
        callbackURL: process.env.AUTH0_CALLBACK_URL || 'https://www.mycdldriver411.com/callback',
        baseURL: process.env.BASE_URL || 'https://www.mycdldriver411.com'
    }
};

module.exports = config;