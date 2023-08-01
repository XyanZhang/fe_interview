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