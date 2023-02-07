let fs = require('fs');
// let Promise = require('./promise');

// 调用 p1.resolve(100) => p1.then(data=)
//      p2.resolve(1)   _=>  p2.then(data)
let p1 = new Promise((resolve, reject) => {
    resolve(100);
})
let p2 = p1.then((data) => {
    console.log(data)
    return 1000
})
console.log(p2)