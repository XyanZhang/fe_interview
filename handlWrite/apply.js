
// apply 的实现原理
// 1. 将函数设为对象的属性
// 2. 执行该函数
// 3. 删除该函数

Function.prototype.MyApply = function (context, args = []) {
  if (typeof this !== 'function') {
      throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

// test MyApply
const foo = { value: 1 }
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}
bar.MyApply(foo, ['kevin', 18]);
bar.apply(foo, ['kevin', 18]);
bar('kevin', 18);


