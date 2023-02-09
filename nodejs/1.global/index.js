// node 全局对象 global
console.log('global',global);
console.log('this', this);  // 默认文件中的this 是被修改过的 
console.log('this !== global',this === global); // => false

// 浏览器的this 是window

console.log(Object.keys(global));
let keysOFGlobal = [
  'global',
  'clearInterval',
  'clearTimeout',
  'setInterval',
  'setTimeout',
  'queueMicrotask',
  'performance',
  'clearImmediate',
  'setImmediate' // node中
]
// node中的事件环 
// node 10以前和浏览器 不一样, node 11 之后表现形式 一样

setImmediate(() => {
    console.log('setImmediate')
})
setTimeout(() => {
    console.log('timeout')
}, 0);

let fs = require('fs');
// 读取文件的时候 会先把文件读取到内存中 
fs.readFile('./_files/name.txt', function () {
    setImmediate(() => {
        console.log('setImmediate')
    })

    setTimeout(() => {
        console.log('timeout')
    }, 0);
})

// timers (setTimeout) poll 放的i/o操作如果没有check 会阻塞在着等定时器到达时间 check 如果有check 会在轮训完毕后立即执行

// 用来取代promise
Promise.resolve().then(data => {
  console.log(data);
})
process.nextTick(() => { // nextTick 是优先于 promise 微任务
  console.log('nextTick')
})

// node < 10
// 现在的版本就是清空 一个宏任务 就清空微任务 ，以前的版本是等待整个队列执行后在清空微任务


// cwd current Working directory 当前的工作目录
console.log(process.cwd()); //在哪里运行 就是当前的工作目录

// 每个文件外面 都会包着一层 函数 为了实现模块化 他在当前文件执行的时候 包了一层函数，并且将函数中的this更改了

console.log(arguments); // exports require module __filename __dirname


// console.dir(global, {
//     showHidden: true
// })