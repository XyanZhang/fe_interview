// 滑动窗口思路
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
          sum = sum - nums[i]; // 缩小范围时 移除i处的值再进行比较
          i++;
      }
      // sum < target 时，跳出当前i 到 j 小范围的最小值
  }
  return result == Infinity ? 0 : result
};