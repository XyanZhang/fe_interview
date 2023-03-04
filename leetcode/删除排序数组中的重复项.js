// 给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
// 元素的 相对顺序 应该保持 一致 。

// 输入：nums = [0,0,1,1,1,2,2,3,3,4]
// 输出：5, nums = [0,1,2,3,4]

var removeDuplicates = function(nums) {
  for(let i=0;i < nums.length; i++) {
      let cur = nums[i];
      let next = nums[i+1];
      if(next == cur) {
          nums.splice(i,1); // 效率偏低
          i--;
      }
  }
  return nums.length
};

// 方法二：双指针，快慢指针，不用删除元素，只需要获取不重复的元素个数
var removeDuplicates = function(nums) {
  let i = 0;
  for(let j=1; j<nums.length; j++) {
      if(nums[i] != nums[j]) {
          i++;
          nums[i] = nums[j]
      }
  }
  return i+1
};

console.log('removeDuplicates([1,1,2])',removeDuplicates([0,0,1,1,1,2,2,3,3,4]));
