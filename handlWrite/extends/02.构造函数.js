// 2. 构造函数继承
function Parent() {
  this.name = 'parent';
}

function Child() {
  Parent.call(this);
  this.type = 'child';
}

var child1 = new Child();
console.log(child1.name); // parent