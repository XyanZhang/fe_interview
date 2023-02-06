// Symbol 独一无二
let s1 = Symbol('my'); // 描述这个symbol 内部会将描述符 toString
let s2 = Symbol('my');

// new Symbol() // Uncaught TypeError: Symbol is not a constructor

let obj = {
  [s2]: 1, // 如果这个属性是用symbol 来声明的，不可枚举
};
console.log(s1 === s2); // => false

for (let key in obj) {
  console.log(obj[key]);
}
console.log(Object.getOwnPropertySymbols(obj)); // Symbol的Object.keys()

// Symbol.for
let s3 = Symbol.for('xxx'); //  如果有这个symbol 并不会重新声明
let s4 = Symbol.for('xxx');
console.log(Symbol.keyFor(s4)); // => xxx

Symbol.keyFor(Symbol.for(undefined)) // 'undefined'
Symbol.keyFor(Symbol.for(null)) // 'null'
Symbol.keyFor(Symbol.for('')) // ''
Symbol.keyFor(Symbol.for()) // 'undefined'

// js中原始数据类型 string number boolean null undefined symbol / object

// Symbol 具备着原编程的功能 想改变默认系统级的方法
// 11种
/**
 * Symbol.hasInstance
 */
class MyArray {
  // 静态属性
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
console.log([] instanceof MyArray); // => true

function MyArray2() {}
  Object.defineProperty(MyArray2, Symbol.hasInstance, {
    value(instance) {
      return Array.isArray(instance);
    },
});
console.log([] instanceof MyArray2); // true


class Animal {
  constructor() {}
}
const cat = new Animal();
console.log(Animal[Symbol.hasInstance](cat)); // true

// 可以做 私有属性 默认js 中没有私有属性

/**
 * Symbol.asyncIterator
 */
const delayedResponses = {
  delays: [500, 1300, 3500],

  wait(delay) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  },

  async *[Symbol.asyncIterator]() {
    for (const delay of this.delays) {
      await this.wait(delay);
      yield `Delayed response for ${delay} milliseconds`;
    }
  },
};

(async() => {
  for await (const response of delayedResponses) {
    console.log(response);
  }
})();
// Delayed response for 500 milliseconds
// Delayed response for 1300 milliseconds
// Delayed response for 3500 milliseconds

const myAsyncIterable = {
  async *[Symbol.asyncIterator]() {
    yield "hello";
    yield "async";
    yield "iteration!";
  },
};

(async () => {
  for await (const x of myAsyncIterable) {
    console.log(x);
  }
})();
// Logs:
// "hello"
// "async"
// "iteration!"

/**
 * Symbol.isConcatSpreadable
 */
 const alpha = ['a', 'b', 'c'];
 const numeric = [1, 2, 3];
 let alphaNumeric = alpha.concat(numeric);
 
 console.log(alphaNumeric);
 // Expected output: Array ["a", "b", "c", 1, 2, 3]
 
 numeric[Symbol.isConcatSpreadable] = false;
 alphaNumeric = alpha.concat(numeric);
 
 console.log(alphaNumeric); // output: Array ["a", "b", "c", Array [1, 2, 3]]

/**
 * Symbol.iterator
 */
const iterable1 = {};
iterable1[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
console.log([...iterable1]);
// Expected output: Array [1, 2, 3]

/**
 * Symbol.toPrimitive
 */
const object1 = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return 42;
    }
    return null;
  }
};
console.log(+object1);
// Expected output: 42

// An object without Symbol.toPrimitive property.
const obj1 = {};
console.log(+obj1); // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ""); // "[object Object]"
// An object with Symbol.toPrimitive property.
const obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return 10;
    }
    if (hint === "string") {
      return "hello";
    }
    return true;
  },
};
console.log(+obj2); // 10        — hint is "number"
console.log(`${obj2}`); // "hello"   — hint is "string"
console.log(obj2 + ""); // "true"    — hint is "default"

/**
 * Symbol.match
 */
const regexp1 = /foo/;
// console.log('/foo/'.startsWith(regexp1));
// Expected output (Chrome): Error: First argument to String.prototype.startsWith must not be a regular expression
// Expected output (Firefox): Error: Invalid type: first can't be a Regular Expression
// Expected output (Safari): Error: Argument to String.prototype.startsWith cannot be a RegExp

regexp1[Symbol.match] = false;

console.log('/foo/'.startsWith(regexp1));
// Expected output: true

console.log('/baz/'.endsWith(regexp1));
// Expected output: false