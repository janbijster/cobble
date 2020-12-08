const webpack = require('webpack')

const RUN_URL = {
  production: JSON.stringify('https://cobbleup.org/run/'),
  development: JSON.stringify('./run/')
}

const API_URL = {
  production: JSON.stringify('https://cobbleup.org/api'),
  development: JSON.stringify('http://localhost/cobble/api')
}

const ENVIRONMENT = {
  production: JSON.stringify('production'),
  development: JSON.stringify('development')
}

// check environment mode
const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  devServer: {
    https: false
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    run: {
      entry: 'src/run/main.js',
      template: 'public/run/index.html',
      filename: 'run/index.html'
      // chunks: ['chunk-vendors', 'chunk-common', 'run']
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        API_URL: API_URL[environment]
      }),
      new webpack.DefinePlugin({
        RUN_URL: RUN_URL[environment]
      }),
      new webpack.DefinePlugin({
        ENVIRONMENT: ENVIRONMENT[environment]
      }),
      new webpack.ContextReplacementPlugin(/.*/, data => {
        delete data.dependencies[0].critical
        return data
      })
    ]
  }
}
