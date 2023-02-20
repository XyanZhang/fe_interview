// 计算一个数加 10 在乘以 10
let caculate = x => (x+10) * 10;
console.log(caculate(10))

// 用compose函数实现
let add = x => x+10;
let multiply = y => y*10;
console.log(multiply(add(10)))

let calculate = compose(multiply, add); // 先加后乘
console.log(calculate, calculate(10)); // 200

let calculate2 = composeFromLToR(multiply, add); // 先乘后加
console.log(calculate2, calculate2(10)); // 110 

function compose(...fns) {
  return function (x) {
    return fns.reduceRight((y, fn) => fn(y), x);
  }
}

function composeFromLToR(...fns) {
  return function (x) {
    return fns.reduce((y, fn) => fn(y), x);
  }
}