// 两数和
// 链接：https://www.nowcoder.com/questionTerminal/20ef0972485e41019e39543e8e895b7f?
// 给出一个整型数组 numbers 和一个目标值 target，请在数组中找出两个加起来等于目标值的数的下标，返回的下标按升序排列。
// （注：返回的数组下标从1开始算起，保证target一定可以由数组里面2个数字相加得到）
function twoSum( numbers ,  target ) {
  // write code here
  let map = {}; // key: 数值，value: 下标
  for(let i=0; i<numbers.length; i++) {
      let a = numbers[i];
      let left = target-a;
      if(map[left]) {
          let l = map[left];
          let r = i+1;
          return l > r ? [r, l] : [l, r]; // 排序
      }else {
          map[a] = i+1
      }
  }
  return []
}