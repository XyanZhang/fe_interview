// 1) 要先将 ./a的文件转化为绝对路径
// 2) 读取这个文件, 需要增加一个函数 函数内部需要返回module.exports
// 3) 让函数执行
// 4) new Module 创建模块 根据文件名来创建  exports  id

// module.load 加载模块
//  Module._extensions 代表的是一个对象 对象上放着很多处理的方法
// exports, require, module, __filename, __dirname

// 4) 最终返回的是module.exports

let path = require('path');
let fs = require('fs');
let vm = require('vm');

function Module(id) {
    this.id = id;
    this.exports = {}
}
let wrapper = [
    '(function(exports, require, module, __filename, __dirname){',
    '\n})'
]
Module._cache = {}
Module._extensions = {
    '.js'(module) {
        let script = fs.readFileSync(module.id,'utf8');
        let fnStr = wrapper[0] + script + wrapper[1];
        let fn = vm.runInThisContext(fnStr);
        let exports = module.exports; // exports 和 module.exports
        // 不能直接改变exports 他是不会影响module.exports

        // 清楚 这五个参数
        fn.call(exports,exports, req, module,module.id,path.dirname(module.id));
    },
    '.json'(module) {
          let script = fs.readFileSync(module.id, 'utf8');
          module.exports = JSON.parse(script);
    }
}
function resolveFileName(filename) {
    let r = path.resolve(__dirname,filename);
    // 需要看下文件路径是否存在 如果不存在尝试添加.js 和 .json后缀
    let isExists = fs.existsSync(r);
    if (isExists) {
        return r;
    }else{
        let keys = Object.keys(Module._extensions);
        for(let i = 0 ; i<keys.length;i++){
            let ext = keys[i];
            let tryFilename = r + ext;
            if (fs.existsSync(tryFilename)){
                return tryFilename;
            }
        }
        throw new Error('module not found');
    }
}
function tryModuleLoad(module) {
    // 获取文件的后缀名
    let extname  =path.extname(module.id); // a.js
    Module._extensions[extname](module); // 对不同的后缀执行不同的加载逻辑
}
function req(filename) {
    // 先将路径转化成绝对路径
   let id = resolveFileName(filename);
   let cacheModule = Module._cache[id];
   if(cacheModule){ // 实现模块的缓存机制
       return cacheModule.exports
   }
   let module = new Module(id);
   Module._cache[id] = module
   // 加载这个模块
   tryModuleLoad(module);
   return module.exports;
}
let str = req('./a.json');
console.log(str);