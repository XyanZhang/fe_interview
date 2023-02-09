const str = 'hello1111';
console.log(1);
//1. module.exports = str

//2. exports.a = str

//3. modules.exports.a = str

// exports 就是module.exports 的别名 为了用户挂载属性时更加方便

exports.a = str;
module.exports = str; // 他不支持两种导出 如果都有只默认支持 module.exports

