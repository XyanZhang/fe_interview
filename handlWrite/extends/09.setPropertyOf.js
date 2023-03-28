// 9. Object.setPrototypeOf 继承
var person = {
  name: 'person',
  getName: function () {
    return this.name;
  },
};

var person1 = {};
Object.setPrototypeOf(person1, person);
console.log(person1.getName()); // person

// setPrototypeOf
// 1. 设置一个对象的原型（即内部的 [[Prototype]] 属性）
// 2. 返回参数对象本身，可进行链式写法
// 3. 第一个参数必须是对象，第二个参数可以是 null
// 4. 如果第一个参数不是对象，会自动转为对象。但由于返回的还是第一个参数，所以这个操作不会产生任何效果
// 5. 如果第二个参数不是对象或 null，会自动转为对象。但是由于无法转为对象，所以会报错
// 6. 如果不想改变第一个参数的原型，可以将第一个参数转为对象
// 7. Object.setPrototypeOf 方法的实现非常简单
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}