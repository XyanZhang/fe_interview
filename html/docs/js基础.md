# js 基础

## 1. new操作符的实现原理

```javascript
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments); // arguments是类数组，不能直接使用shift
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag = result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果，如果构造函数执行后返回的结果是对象或者函数，返回该结果，否则返回空对象
  return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数, 初始化参数); 
```

## map 和 Object 的区别

### map

+ 默认不包含任何键，只包含显示插入的键
+ 键可以是任意值，包括函数、对象、基本类型
+ key是**有序的**。迭代的时候Map对象以插入的顺序返回键值
+ Size,通过size 属性获取
+ 是iterable的，可直接被迭代
+ 在频繁增删键值对的场景下表现更好
  
### Object

+ 有一个原型，原型上的键名可能和自己设置的冲突
+ Object中的键值对中键只能是 String或者Symbol
+ 键是无序的
+ 键值对个数只能手动计算
+ 迭代Object需要以某种方式获取他的键才能迭代
+ 未对频繁添加和删除键值对场景下作优化

### 说明

在频繁添加和删除键值对的情况下，使用 Map 对象的性能更好。

Map 对象是一种**有序的键值对集合**，可以根据键的顺序进行迭代。相比之下，Object 是基于**哈希表实现的无序键值对集合**。

由于 Map 使用内部的**红黑树**实现，因此在频繁添加和删除键值对时，它具有更好的性能表现。红黑树的插入和删除操作的时间复杂度为 O(log n)，而 Object 的属性修改操作的时间复杂度为 O(1)。尽管 Object 的属性修改操作通常要快得多，但是频繁添加和删除键值对会导致 Object 内部的哈希表需要不断重建，这可能会变得非常低效。

另外，Map 对象还提供了一些额外的功能，如可迭代的接口和对键的弱引用等，使其在某些场景下更加灵活和方便使用。

综上所述，频繁添加和删除键值对时，使用 Map 对象可以获得更好的性能和更多的功能。

## map 和 weakMap

+ weakMap 的键是弱引用的，只能是对象

> WeakMap的设计目的在于，有时想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占用的内存。

```javascript
// demo
// 使用WeakMap
const weakMap = new WeakMap();

(function() {
  const obj = {};
  // 将对象作为键存储在WeakMap中
  weakMap.set(obj, '数据');
})();
// 由于立即执行函数执行完毕后，obj没有其他的引用，所以垃圾回收机制会自动释放这个对象，同时也会自动清除WeakMap中对应的值。
// 注意：这里无法通过weakMap获取到存储的数据

// 使用Map
const map = new Map();

(function() {
  const obj = {};
  // 将对象作为键存储在Map中
  map.set(obj, '数据');
})();

// 这里我们可以通过map获取到存储的数据
console.log(map.get(obj)); // 输出：数据
```

## JavaScript脚本延迟加载的方式有哪些？

延迟加载就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。

● defer 属性： 给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
● async 属性： 给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
● 动态创建 DOM 方式： 动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
● 使用 setTimeout 延迟方法： 设置一个定时器来延迟加载js脚本文件
● 让 JS 最后加载： 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。