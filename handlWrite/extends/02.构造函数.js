// 2. 构造函数继承
function Parent() {
  this.name = 'parent';
}

function Child() {
  Parent.call(this); // 通过call 改变this指向
  this.type = 'child';
}

var child1 = new Child();
console.log(child1.name); // parent

// 缺点
// 1. 方法都在构造函数中定义，每次创建实例都会创建一遍方法
// 2. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
