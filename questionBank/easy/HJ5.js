const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        console.log(parseInt(line, '16'))
        console.log(strHandle(line))
    }
}()
// 以上是调用parseInt api 取巧办法

// 以下使用运算实现
function strHandle (line) {
  // 16进制转10进制
  let str = line.substr(2);
  let arr = str.split("");
  let obj = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };
  function fn(num) {
      return num < 10 ? num : obj[num];
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
      sum = sum + fn(arr[i]) * 16 ** (arr.length - i - 1); // 运算： ** 幂运算
  }
  return sum;
}