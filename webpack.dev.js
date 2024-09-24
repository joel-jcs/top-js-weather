const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    watchFiles: ['./src/index.html'],
    static: './dist',
  },
  output: {
    filename: 'main.js',
  },
});
