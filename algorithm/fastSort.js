// 快排
// 1. 从数列中挑出一个元素，称为 “基准”（pivot）；
// 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
//    在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
// 
// 递归的终止条件是数列的大小是零或一，此时该数列显然已经有序。
// 快排的时间复杂度是O(nlogn)，空间复杂度是O(logn)。
var arr = [1, 4, 5, 2, 3, 6, 7, 8, 9, 0];
console.log(fastSort(arr));

function fastSort(arr) {
  var len = arr.length;
  var left = [];
  var right = [];
  var mid = arr[0];
  if (len <= 1) {
    return arr;
  }
  for (var i = 1; i < len; i++) {
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return fastSort(left).concat(mid, fastSort(right));
}