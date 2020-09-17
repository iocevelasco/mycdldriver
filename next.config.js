
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
      if (typeof require !== 'undefined') {
        require.extensions['.less'] = file => { }
      }
      return config
    }
  }
])
