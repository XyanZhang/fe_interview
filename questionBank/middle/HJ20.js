const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
let maxLen = (str) => str.length > 8;
let least3 = (str) => {
    let count = 0;
    let map = {};
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        if (char >= 48 && char <= 57) {
            if (!map[0]) {
                count++;
                map[0] = i + 1;
            }
        } else if (char >= 65 && char <= 90) {
            if (!map[1]) {
                count++;
                map[1] = i + 1;
            }
        } else if (char >= 97 && char <= 122) {
            if (!map[2]) {
                count++;
                map[2] = i + 1;
            }
        } else {
            if (!map[3]) {
                count++;
                map[3] = i + 1;
            }
        }
    }
    console.log(count, Object.keys(map).length)
    return Object.keys(map).length >= 3;
};
let noRepeat2 = (str) => {
    let flag = false;
    for (let i = 0; i < str.length - 2; i++) {
        let subStr = str.slice(i, i + 3);
        if (str.indexOf(subStr, i + 1) > -1) {
            flag = true;
            break;
        }
    }
    return flag;
};
void (async function () {
    // Write your code here
    while ((line = await readline())) {
        if (maxLen(line) && least3(line) && !noRepeat2(line)) {
            console.log("OK");
        } else {
            console.log("NG");
        }
    }
})();
