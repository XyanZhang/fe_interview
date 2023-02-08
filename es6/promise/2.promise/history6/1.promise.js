const Promise = require('./promise');

let p = new Promise((resolve, reject) => {
    resolve(1);
});

let promise2 = p.then(data => {
    console.log('123')
    throw Error('error');
});
promise2.then((data) => {
    console.log('成功', data)
}, err => {
    console.log('fail: ', err); // TypeError: Chaining cycle detected for promise #<Promise>
});
/* 
output: 
    123
    fail:  Error: error
 */


