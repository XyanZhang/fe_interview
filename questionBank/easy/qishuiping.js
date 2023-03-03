// 某商店规定：三个空汽水瓶可以换一瓶汽水，允许向老板借空汽水瓶（但是必须要归还）。
// 小张手上有n个空汽水瓶，她想知道自己最多可以喝到多少瓶汽水。
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        if(line == 0){
            return 
        }
        let res = conti(line);
        console.log(res);

        function conti(num) {
            let first= Math.floor(num / 3);
            let left = num - first*3 + first;
            if(left == 0 || left == 1) {
                return first;
            }else if(left == 2){
                return first + 1
            }else {
                return first + conti(left)
            }
        }
    }
}()