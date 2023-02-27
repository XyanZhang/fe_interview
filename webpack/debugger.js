const webpack = require('webpack');
const webpackOptions = require('./webpack.config.js');
debugger;
const compiler = webpack(webpackOptions);
compiler.run((err, stats) => {
  // ...
  console.log(err)
  console.log(
    stats.toJson({
      entries: false,
      chunks: false,
      modules: false,
      _modules: true,
      assets: true,
    })
  )
});