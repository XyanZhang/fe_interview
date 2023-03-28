
// 6. 寄生组合式继承
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

var child1 = new Child('child', 18);
console.log(child1.getName()); // child

// 缺点
// 1. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
// 2. 无法继承原型上的属性和方法，只能继承实例属性/方法
// 3. 无法传参
// 4. 无法实现多继承
