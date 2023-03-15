
// 冒泡排序
// 1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个；
// 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。
//    在这一点，最后的元素应该会是最大的数；
// 3. 针对所有的元素重复以上的步骤，除了最后一个；
// 4. 重复步骤1~3，直到排序完成。
// 冒泡排序的时间复杂度是O(n^2)，空间复杂度是O(1)。
var arr = [1, 4, 5, 2, 3, 6, 7, 8, 9, 0];
console.log(bubbleSort(arr));

function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}