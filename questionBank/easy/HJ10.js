// HJ10 字符个数统计

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    let str = await readline()
    let map = {};
    let count = 0;
    for(let i=0; i<str.length; i++) {
        let char = str.charCodeAt(i);
        if(!map[char]) {
            count++;
            map[char] = i+1
        }
    }
    console.log(count)
}()
