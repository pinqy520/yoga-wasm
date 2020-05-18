const base = require('./webpack.config')
const path = require('path');


module.exports = {
  ...base,
  mode: 'development',
  entry: path.join(__dirname, './src/test.js'),
  output: {
    // output dir is `./static`
    path: path.resolve(__dirname, 'static'),
    filename: 'demo.js',
    publicPath: '/static/'
  },
  module: {
    rules: [
      ...base.module.rules,
      {
        /**
         * Split `.wasm` files as an external modules.
         * Emscripten target module has builtin loader
         * of an wasm files. Just use it.
         */
        test: /\.(wasm)$/,
        type: "javascript/auto",
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[md5:hash:base64:6].[ext]'
            }
          }
        ]
      }
    ]
  }
}