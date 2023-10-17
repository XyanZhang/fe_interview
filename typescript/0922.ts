let a:never;
a = 123; // 报错

// never 是其他类型（包括 null 和 undefined） 的子类型，可以赋值给任何类型，代表不会出现的值

a = (() => null)() // 报错
a = (() => undefined)() // 报错

// 正确
a = (() => {
  throw new Error('抛出错误')
})() // 报错