/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  let map = {};
  for(let i=0;i<s.length;i++){
      let char = s[i];
      if(map[char]) {
          map[char] += 1 
      }else {
          map[char] = 1;
      }
  }
  for(let i=0;i<s.length;i++){
      let char = s[i];
      if(map[char] == 1) {
          return i
      }
  }
  return -1;
}
console.log(firstUniqChar("loveleetcode"))