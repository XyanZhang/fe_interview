// 朴素版的事件循环系统

/**
    新建一个事件循环系统；
    生产任务；
    启动事件循环系统处理任务。
 */

/*
  缺点：
  但我们发现没有任务的时候，事件循环系统就陷入了死循环，这不仅浪费了 CPU，新的任务也无法继续添加了
 */

class EventSystem {  
  constructor() {
    // 任务队列
    this.queue = [];
  }

  // 追加任务
  enQueue(func) {
    this.queue.push(func);
  }
  // 事件循环
  run() {
    while(1) {
      while(this.queue.length) {
         const func = this.queue.shift();
         func();
       }
    }
  }
}
// 新建一个事件循环系统
const eventSystem = new EventSystem();

// 生产任务
eventSystem.enQueue(() => {
  console.log('hi');
});

// 生产任务
eventSystem.enQueue(() => {
  console.log('hi2');
});
// 启动事件循环
eventSystem.run();

// 生产任务
eventSystem.enQueue(() => {
  console.log('hi');
});