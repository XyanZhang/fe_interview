// Array.of #
// of是为了将一组数值,转换为数组
console.log(Array(3), Array(3).length);
console.log(Array.of(3), Array.of(3).length);

Array.myOf = function(...args) {
  return args;
}

console.log(Array.of(1,2,3), Array.myOf(3,2,1))

// from #
// 将一个数组或者类数组变成数组,会复制一份
let newArr = Array.from(oldArr);
console.log(newArr)

// copyWithin #
// Array.prototype.copyWithin(target, start = 0, end = this.length) 覆盖目标的下标 开始的下标 结束的后一个的下标
[1, 2, 3, 4, 5].copyWithin(0, 1, 2);