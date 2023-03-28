// 4. 原型式继承
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var person = {
  name: 'person',
  getName: function () {
    return this.name;
  },
};
// 缺点
// 1. 引用类型的属性被所有实例共享
// 2. 在创建 Child 的实例时，不能向 Parent 传参
// 3. 无法实现复用，每个子类都有父类实例函数的副本，影响性能
