// 模板引擎 {{name}}  abc

// es6中模板字符串
// 模板引擎 ejs handlebar underscore jade nunjucks ....
// {{}} <%%> {%%}


let fs = require('fs');
let path = require('path');
let str = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
function render(str,obj){
    let head = 'let str = ""\r\nwith(obj){\r\n';
    head+= 'str+= `'
    // + 原子符号 ? 号的作用 ()  分组
    str = str.replace(/<%=(.+?)%>/g,function () {
        return '${' + arguments[1] + '}'
    })
    let content = str.replace(/<%(.+?)%>/g,function () {
        return '`\r\n'+arguments[1] + '\r\nstr+=`'
    });
    let tail = '`\r\n return str}'

    let fn = new Function('obj', head + content + tail);
    return fn(obj);
}
// with new Function reg
let newStr = render(str,{
    arr:[1,2,3]
});
console.log(newStr)
// let name = 'zf';
// let age = 10
// let str = "${name}今年${age}岁了";

// // replace 正则 分组
// str = str.replace(/\$\{(.+?)\}/g,function () {
//     return eval(arguments[1])
// })

// console.log(str);


// npm 的使用fs的使用 流的应用


let obj = {a:1}

with(obj){
    console.log(a)
}