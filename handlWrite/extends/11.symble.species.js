// 11. Symbol.species 继承
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

var a = new MyArray(1, 2, 3);
var mapped = a.map((x) => x * x);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array); // true

// Symbol.species
// 1. 作用
// 1.1. 用于指定构造函数
// 1.2. 用于指定返回对象的类型
// 2. 用法
// 2.1. 通过 Symbol.species 指定构造函数
// 2.2. 通过 Symbol.species 指定返回对象的类型
// 3. 例子
// 3.1. 通过 Symbol.species 指定构造函数
// 3.2. 通过 Symbol.species 指定返回对象的类型

