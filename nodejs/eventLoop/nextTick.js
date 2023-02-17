// process.nextTick()方法将 callback 添加到"next tick 队列"。 一旦当前事件轮询队列的任务全部完成，在next tick队列中的所有callbacks会被依次调用。
// setImmediate预定立即执行的 callback，它是在 I/O 事件的回调之后被触发

setImmediate(function(){
  console.log('4');
});
setImmediate(function(){
  console.log('5');
});
process.nextTick(function(){
  console.log('1');
  process.nextTick(function(){
    console.log('2');
    process.nextTick(function(){
      console.log('3');
    });
  });
});

console.log('next');