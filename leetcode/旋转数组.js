/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    let length = nums.length;
    // let count = k%len;
    let temp = [];
     for (let i = 0; i < length; i++) {
        temp[i] = nums[i];
    }
    //然后在把临时数组的值重新放到原数组，并且往右移动k位
    for (let i = 0; i < length; i++) {
        nums[(i + k) % length] = temp[i];
    }
    console.log(nums)
};
console.log(rotate([1,2,3,4,5,6,7], 1))