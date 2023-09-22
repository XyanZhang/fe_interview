# 提高webpack 构建速度

+ 优化loader配置
+ 合理使用resolve.extensions 
+ 优化resolve.modules
+ 优化resolve.alias
+ 使用DLLPlugin 插件
+ 使用cache-loader
+ terser 启动多线程
+ 合理使用sourceMap

## 优化loader配置

配置babel-loader 时

```js
modules.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // 如果项目中只有js文件就不想写成 /\.jsx?$/，提高正则新能
        // babel-loader 支持缓存转化出的结果，通过 cacheDirectory 选项开启
        use: ['babel-loader?cacheDirectory'],
        // 只对项目根目录下的src目录中的文件采用 babel-loader 
        include: path.resolve(__dirname, 'src')
      }
    ]
  }  
}
```

## 合理使用 resolve.extensions

```javascript
module.exports = {
  extensions: [".warm", ".mjs", ".js", ".json"]
}
```

> 当引入文件的时候，没有文件后缀名，则会根据数组内的值依次查找
>
> 当我们自己配置的时候，不要随便把所有后缀都写在里面，这样会调用多次文件的查找，会减慢打包速度

## 优化resolve.modules 

用于配置webpack 去哪些目录下寻找第三方模块，默认值为["node_modules"], 所以默认会从mode_modules 中查找文件

当安装的第三方模块都是放在项目根目录下的 ./node_modules 目录下时，所以可以指明存放的第三方模块的绝对路径，以减少寻找

```javascript
module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放位置，以减少搜索步骤
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  }
}

```

## 优化resolve.alias

alias 给一些常用的路径起一个别名，当项目结构比较深的时候，一个文件的路径可能是 ./../../ 的形式
通过配置alias 以减少查找过程

```javascript
module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放位置，以减少搜索步骤
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  }
}

```

## 使用cache-loader

在一些性能开销较大的loader之前添加 cache-loader ，将结构缓存到磁盘里，显著提升二次构建速度

保存和读取这些缓存文件会有一些时间开销，所以只针对性能开销较大的loader 使用此loader

```javascript
module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放位置，以减少搜索步骤
    rules: [
      {
        test: /.ext$/,
        use: ['cachec-loader', ...loaders]
        include: path.resolve('src')
      }
    ]
  }
}

```

## terser 启动多线程

使用多线程并行运行来提高构建速度

```javascript
module.exports = {
  optimization: {
    minimizer: {
      new TerserPlugin({
        parallel: true
      })
    }
  }
}
```

## 合理使用sourceMap 

打包生成 sourceMap 的时候，如果信息越详细，打包速度越慢

>
> 优化总结：
> 优化搜索时间，缩小文件搜索范围，较少不必要的编译等方面入手
>

