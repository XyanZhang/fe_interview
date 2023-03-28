
// 3. 组合继承
function Parent() {
  this.name = 'parent';
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this);
  this.type = 'child';
}

Child.prototype = new Parent();

var child1 = new Child();
console.log(child1.getName()); // parent

// 缺点
// 1. 调用了两次父类构造函数，生成了两份实例， 哪两次？ 一次是在 Child.prototype = new Parent(); 一次是在 Child.call(this);
// 2. 子类的原型上多了不需要的父类属性
