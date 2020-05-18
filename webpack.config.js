const path = require('path');
const { DefinePlugin, IgnorePlugin } = require('webpack')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.min.js',
    libraryTarget: 'commonjs',
  },
  plugins: [
    /**
     * Emscripten target js file (sum.js in this example)
     * has many builtin environments - web, node, webworker, shell.
     * We should use only WEB environment and remove dead code -
     * code for other environments. This trick helps to detect
     * WEB environment. Code for other environments will be removed at
     * minify stage.
     */
    new DefinePlugin({
      'typeof window': JSON.stringify('object')
    }),
    
    /**
     * NODE environment required `fs` module. So, just ignore.
     * 
     * Limitations:
     *
     *   - `fs` will be ignored in all modules.
     * 
     * N.B. Send me PR if you known how to ignore `fs` only for
     * emscripten target module.
     */
    new IgnorePlugin(/^fs$/)
  ],
  module: {
    rules: [
      {
        test    : /\.js?$/,
        exclude : [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-flow']
          }
        }
      }
    ]
  }
}