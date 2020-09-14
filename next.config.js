
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const compose = require('next-compose');
const dotenv = require('dotenv');
const webpack = require('webpack');
dotenv.config();

// fix: prevents error when .less files are required by node

const sassConfig = {
  cssModules: true,
}
const lessConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true
  },
};

module.exports = compose([
  [withSass, sassConfig],
  [withLess, lessConfig],
  {
    webpack: (config) => {
     const  env = {
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
        AUTH0_SCOPE: 'openid profile read:shows offline_access',
        API_AUDIENCE: 'https://api/tv-shows',
        API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
        REDIRECT_URI: process.env.REDIRECT_URI || 'http://localhost:3000/api/callback',
        POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000/',
        SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
        SESSION_COOKIE_LIFETIME: 7200 // 2 hours
      }
      config.plugins.push(new webpack.DefinePlugin(env))
      if (typeof require !== 'undefined') {
        require.extensions['.less'] = file => { }
      }
      return config
    }
  }
])
