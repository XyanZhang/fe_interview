## node中的模块
- 模块分类 ES6module,commonjs规范 amd,cmd,umd
- commonjs规范
    - 一个文件就是一个模块
    - 如果模块想给别人使用 module.exports  exports 同一个对象但是最终导出的是module.exports
    - 如果想使用这个模块 require (同步读取文件，包一个自执行函数，vm.runInthisContext,传入export对象，最终返回的是exports 对象，所以就可以拿到其他模块的内容)
- 模块的查找规范
    - 第三方模块 module.paths
    - 如果文件和文件夹重名 先取文件，文件不能取到，找文件夹 package.json = main = index.js**

## Node中模板引擎实现
- 实现一个ejs模板引擎

## Node中的常用模块
- path模块
- util模块
- event模块
- fs模块

>  Node中npm的使用,fs的使用及流的应用