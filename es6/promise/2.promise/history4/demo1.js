let fs = require('fs');
let Promise = require('./promise');

let p1 = new Promise((resolve, reject) => {
  reject(100);
});
let p2 = p1.then(
  (data) => {
    console.log("data:", data)
    return 1000;
  },
  (err) => {
    console.log("err:", err)
    return 2000;
  }
);
console.log(p2)
