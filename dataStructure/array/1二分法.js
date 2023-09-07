// 二分法 leetcode



function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let mid = 0;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return -1;
}

// 二分法2
var search = function(nums, target) {
  let start = 0;
  let end = nums.length;
  while(start < end) {
      let mid = start + Math.floor((end - start)/2);
      if(target > nums[mid]) {
          start = mid + 1;
      }else if(target < nums[mid]) {
          end = mid;
      }else {
          return mid
      }
  }
  return -1;
};

// 双指针
var search = function(nums, target) {
  let i = 0, j = nums.length - 1;
  while(i <= j) {
      if (nums[i] === target) return i;
      if (nums[j] === target) return j;
      i++;
      j--;
  }

  return -1;
};