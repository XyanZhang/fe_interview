Array.prototype.shift = function() {
  // 将调用该方法的数组保存到变量arr中
  var arr = this;
  
  // 获取数组的第一个元素
  var firstElement = arr[0];
  
  // 如果数组的长度小于等于1，则直接将数组长度设为0，并返回第一个元素
  if (arr.length <= 1) {
    arr.length = 0;
  } else {
    // 否则，通过循环将数组中的每个元素向前移动一位
    for (var i = 0; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1];
    }
    
    // 将数组的最后一个元素置为undefined，并将数组长度减1
    arr.length--;
  }
  
  // 返回被移除的第一个元素
  return firstElement;
}