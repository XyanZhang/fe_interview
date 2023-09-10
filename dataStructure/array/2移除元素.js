var removeElement = function(nums, val) {
  let slow = 0;
  for(let i = 0; i<nums.length; i++) {
      if(nums[i] !== val) {
          nums[slow++] = nums[i];
      }
  }
  return slow
};