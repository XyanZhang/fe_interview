// 实现 bind 函数
Function.prototype.myBind = function (context, ...args) {
  // this 指向调用 bind 的函数
  const fn = this;
  // 返回一个函数
  return function (...innerArgs) {
    // 通过 apply 调用函数
    return fn.apply(context, [...args, ...innerArgs]);
  }
}
function test(a,b,c){
  console.log(a,b,c)
}

let fn2 = test.myBind(this, 1)
fn2(); // 1, undefined, undefined