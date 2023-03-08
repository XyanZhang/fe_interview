/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let left = 0;
    let right = s.length -1;
    while(right > left) {
        let lValue = s[left].toLowerCase();
        let rValue = s[right].toLowerCase();
        if(!isValidChar(lValue)) {
            left++;
            continue;
        }else if(!isValidChar(rValue)) {
            right--;
            continue;
        }else if(lValue != rValue) {
            return false;
        }else {
            left++;
            right--;
        }
    }
    return true
  };
  function isValidChar(char) {
    return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z' || char >= '0' && char <= '9';
  }

console.log(isPalindrome("race a car"))
console.log(isValidChar(" "))