# webpack优化前端性能

## js代码压缩

在production模式下，webpack默认使用TerserPlugin 来处理代码

自定义配置

```js
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  ...
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true, // 默认为true，表示会将注释抽取到一个单独的文件中，开发阶段，可设为false，不保留注释
        parallel: true, // 电脑cpu核数-1 使用多进程并发运行提高构建速度，默认值为true，并发运行默认数量：os.cpus().length - 1
        terserOptions: {}, // 设置terser相关的配置
        compress: {}, // 设置压缩相关的选项，
        mangle: {}, // 设置丑化相关的选项，可以直接设置为true
        topLevel: false, // 底层变量是否进行转换
        keep_classnames: {}, // 保留类的名称
        keep_fnames: {}, // 保留函数的名称
      })
    ]
  }
}

```


## CSS代码压缩

## HTML文件代码压缩

## 文件大小压缩

## 图片压缩

## Tree Shaking

## 代码分离

## 内联chunk
