
// call的实现原理
// 1. 将函数设为对象的属性
// 2. 执行该函数
// 3. 删除该函数
Function.prototype.MyCAll = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}

// test myCall
const foo = { value: 1 }
function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value)
}
bar.MyCAll(foo, 'kevin', 18);
bar.call(foo, 'kevin', 18);
