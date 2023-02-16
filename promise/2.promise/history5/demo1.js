let fs = require('fs');
let Promise = require('./promise');

let p1 = new Promise((resolve, reject) => {
  // reject(100);
  resolve(100);
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
p2.then((data) => {
  console.log(data, '*****');
}, err => {
  console.log('p2 err', err);
})