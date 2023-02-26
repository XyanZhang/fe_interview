const path = require('path');

module.exports = {
  context: process.cwd(), // 当前工作目录
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: false
}