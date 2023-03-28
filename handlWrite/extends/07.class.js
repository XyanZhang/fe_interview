// 7. class 继承

// 原理
// 1. 通过 extends 关键字实现继承
// 2. 通过 super 关键字调用父类的构造函数
// 3. 通过 super 关键字调用父类的方法
class Parent {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
var child1 = new Child('child', 18);
console.log(child1.getName()); // child


// es5 实现 class 继承
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

function F() {}
F.prototype = Parent.prototype;
Child.prototype = new F();
Child.prototype.constructor = Child;

var child1 = new Child('child', 18);
console.log(child1.getName()); // child


