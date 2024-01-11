# js 基础

## 1. new操作符的实现原理

```javascript
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
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
  // 判断返回结果
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
