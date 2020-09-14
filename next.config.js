const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const dotenv = require('dotenv');
dotenv.config();

const isProd = process.env.NODE_ENV === 'production'

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => { }
}

module.exports = withLess(withSass({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: 'openid profile read:shows offline_access',
    API_AUDIENCE: 'https://api/tv-shows',
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3001',
    REDIRECT_URI: process.env.REDIRECT_URI || 'http://localhost:3000/api/callback',
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000/',
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: 7200 // 2 hours
  }
}))
