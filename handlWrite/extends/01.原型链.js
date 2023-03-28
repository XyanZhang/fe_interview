// 1. 原型链继承
function Parent() {
  this.name = 'parent';
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  this.type = 'child';
}

Child.prototype = new Parent();

var child1 = new Child();
console.log(child1.getName()); // parent

// 弊端
// 1. 引用类型的属性被所有实例共享
// 2. 在创建 Child 的实例时，不能向 Parent 传参
// 3. 无法实现复用，每个子类都有父类实例函数的副本，影响性能
