/* eslint-disable */
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs')
const path = require('path')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/settings/antd-custom.less'), 'utf8')
)

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // antd custom color
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['components'] = path.resolve('./pages/components');
    config.resolve.alias['@hooks'] = path.resolve('./pages/hooks');
    config.resolve.alias['@styles'] = path.resolve('./styles');
    config.resolve.alias['@store'] = path.resolve('./store');
    config.resolve.alias['@utils'] = path.resolve('./pages/utils');

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  },
})