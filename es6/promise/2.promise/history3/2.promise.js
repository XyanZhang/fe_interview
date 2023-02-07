let fs = require('fs');
let Promise = require('./promise');

// 调用 p1.resolve(100) => p1.then(data=)
//      p2.resolve(1)   _=>  p2.then(data)
let p1 = new Promise((resolve, reject) => {
    resolve(100);
})
let p2 = p1.then((data) => {
    return 1000
}, err => {
    return 2000
})
p2.then((data) => {
    console.log(data, '*****');
}, err => {

})