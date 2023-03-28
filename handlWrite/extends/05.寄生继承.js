
// 5. 寄生式继承
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function createAnother(o) {
  var clone = createObj(o);
  clone.sayName = function () {
    console.log('hi');
  };
  return clone;
}

var person = {
  name: 'person',
  getName: function () {
    return this.name;
  },
};

var person1 = createAnother(person);
person1.sayName(); // hi

// 缺点
// 1. 无法实现复用，每个子类都有父类实例函数的副本，影响性能
// 2. 在创建 Child 的实例时，不能向 Parent 传参
