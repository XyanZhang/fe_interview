var minSubArrayLen = function(target, nums) {
  let sum = 0;
  let i = 0;
  let result = Infinity;
  // j 指向终止位置
  for(let j = 0; j<nums.length; j++) {
      // i 到 j 的和 大于等于 target 时，说明满足总和条件，再进行 i 到j 缩小范围，确定出最小值
      sum += nums[j];
      while(sum >= target) {
          let subL = j - i + 1;
          result = Math.min(result, subL)
          sum = sum - nums[i];
          i++;
      }
  }
  return result == Infinity ? 0 : result
};