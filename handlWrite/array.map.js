// 手写es6 数组 map方法
Array.prototype.myMap = function (callback, thisArg) {
  let arr = Array.prototype.slice.call(this);
  let mapArr = [];
  for (let i = 0; i < arr.length; i++) {
    mapArr.push(callback.call(thisArg, arr[i], i, this));
  }
  return mapArr;
}

let arr = [1, 2, 3, 4, 5];
arr.myMap((item, index, arr) => {
  console.log(item, index, arr);
})