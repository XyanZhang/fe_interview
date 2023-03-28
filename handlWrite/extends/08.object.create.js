// 8. Object.create 继承
var person = {
  name: 'person',
  getName: function () {
    return this.name;
  },
};

var person1 = Object.create(person);
console.log(person1.getName()); // person

// Object.create
// 1. 创建一个新对象
// 2. 将新对象的原型指向传入的对象
// 3. 返回新对象
// 4. 传入 null，创建的对象就没有原型，相当于创建了一个空对象

// es5 实现
Object.create = function (o) {
  function F() {}
  F.prototype = o;
  return new F();
}
