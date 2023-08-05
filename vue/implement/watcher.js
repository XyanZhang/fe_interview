import { observe } from "./index";
// 负责更新视图
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    // data中的属性名称
    this.key = key;
    // 回调函数负责更新视图
    this.updateFn = cb;

    // 把watcher对象记录到Dep类的静态属性target
    Dep.target = this;
    // 触发get方法，在get方法中会调用addSub
    this.oldValue = vm[key]; // 触发get方法
    Dep.target = null;
  }
  update() {
    const newValue = this.vm[this.key];
    if (this.oldValue === newValue) { // 值没有变化
      return;
    }
    this.updateFn.call(this.vm, this.vm[this.key], this.oldValue);
  }
}

// 负责管理多个Watcher实例，它和data中的key是一对一关系
class Dep {
  constructor() {
    this.deps = [];
  }
  // 添加watcher
  addSub(watcher) {
    this.deps.push(watcher);
  }
  // 通知方法
  notify() {
    this.deps.forEach(watcher => watcher.update());
  }
}

export function defineReactive(obj, key, val) {
  // 递归
  observe(val);

  // 创建对应的Dep实例
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      console.log(`${key}属性更新了：${val}`);
      dep.notify();
    }
  });
}
