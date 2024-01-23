function mySettimeout(fn, t) {
  let timer = null;
  function interval() {
    fn();
    timer = setTimeout(interval, t);
  }
  interval();
  return {
    cancel:()=>{
      clearTimeout(timer)
    }
  }
}
let a=mySettimeout(()=>{
  console.log(111);
},1000)
let b=mySettimeout(() => {
  console.log(222)
}, 1000)


// setInterval 是 JavaScript 中的一个函数，用于按照指定的时间间隔重复执行指定的代码。然而，setInterval 存在一些缺陷：

// 可能存在延迟：当 setInterval 中设置的代码执行时间超过了指定的时间间隔时，可能会导致下一次执行被延迟。这是因为 setinterval 无法保证代码执行的精确时间。

// 未处理的错误：如果 setInterval 中的代码发生错误或抛出异常，整个重复执行的过程将会中断，并且无法获知具体的错误信息。

// 多次调用的影响：如果 setInterval 中的代码执行的时间超过了指定的时间间隔并且还没有执行完成时，下一次的执行将会叠加在上一次执行之后。这可能导致代码堆积和性能问题。