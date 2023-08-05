import { defineReactive } from './index.js';
export default class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 响应式处理
    observe(this.$data);

    // 代理data到vm上
    proxy(this);

    // 执行编译
    new Compile(options.el, this);
  }
}

export function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }

  // 创建Observer实例
  return new Observer(data);
}

export class Observer {
  constructor(data) {
    this.data = data;
    this.walk(data);
  }

  walk(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key]);
    });
  }
}