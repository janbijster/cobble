const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        // I want to uglify with mangling only app files, not thirdparty libs
        exclude: /\/builtInStones/, // excluding
        loader: 'uglify'
      })
    ]
  }
}
