// 双指针

var sortedSquares = function(nums) {
  let start = 0;
  let end = nums.length - 1;
  let newArr = [];
  while(start <= end) {
    let leftVal = nums[start]*nums[start];
    let rightVal = nums[end]*nums[end];
    if(leftVal >= rightVal) {
      start++;
      // newArr.unshift(leftVal)
      newArr.push(leftVal)

    }else if(leftVal < rightVal) {
      end--;
      // newArr.unshift(rightVal)
      newArr.push(rightVal)
    }
  }
  return newArr.reverse()
};