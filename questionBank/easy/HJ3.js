/* 
输入：
  3 // 表示有3个数字
  2 
  2
  1
输出：
  1
  2
*/

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let arr = [];
    let flag = true;
    while ((line = await readline())) {
        if (flag) {
            flag = false; // 第一次的输入不收集
        } else {
            arr.push(line);
        }
    }
    // 排序，去重
    let resSort = arr.sort((a, b) => a - b);
    resSort.forEach((c, index) => {
        if (index == 0) {
            console.log(c);
        } else if (resSort[index - 1] != c) {
            console.log(c);
        }
    });
})();
