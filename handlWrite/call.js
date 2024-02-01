
// call的实现原理
// 1. 将函数设为对象的属性
// 2. 执行该函数
// 3. 删除该函数
Function.prototype.MyCAll = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window
    context.fn = this;// 将 fn 执行的this指向context
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

// 调用call的时候肯定前面有原函数，原函数.call call的this就指向了原函数，如果想讲原函数的this指向传入的对象，就需要使用 对象.函数 的方式，改变this指向