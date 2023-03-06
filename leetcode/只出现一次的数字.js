/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let map = {}
    for(let i=0;i<nums.length; i++) {
        let value = nums[i]
        if(map[value]) {
            delete map[nums[i]]
        }else {
            map[nums[i]] = i+1;
        }
    }
    return Object.keys(map)[0];
};