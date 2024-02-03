class EventEmitter {
  constructor() {
    this.eventObj = {};
  }
  hasEvent(eventName) {
    return this.eventObj[eventName];
  }
  on(eventName, callback) {
    if (this.hasEvent(eventName)) {
      this.eventObj[eventName].push(callback);
    } else {
      this.eventObj[eventName] = [callback];
    }
  }
  off(eventName, callback) {
    if (!this.hasEvent(eventName)) {
      return;
    }
    this.eventObj[eventName] = this.eventObj[eventName].filter((item) => {
      return item !== callback; // 移除事件池中 事件
    });
  }
  emit(eventName, ...rest) {
    let callbacks = this.eventObj[eventName];
    if (!callbacks) {
      return ;
    }
    callbacks.forEach(callback => {
      callback.apply(this, rest);
    })
  }
  once(eventName, callback) {
    function fn() {
      callback();
      this.off(eventName, fn);
    }
    this.on(eventName, fn);
  }
}
// 使用如下
const event = new EventEmitter();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");
