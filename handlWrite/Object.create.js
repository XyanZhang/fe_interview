function create(proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null');
  }
  // 创建了一个空的构造函数 F
  function F() {}
  // 并将其原型设置为 proto
  F.prototype = proto; 
  const obj = new F();

  if (typeof propertiesObject === 'object') {
    Object.defineProperties(obj, propertiesObject);
  }

  return obj;
}

// __proto__ 是一个标准的属性，但根据 ECMAScript 2015 标准，推荐使用 Object.getPrototypeOf() 或 Object.setPrototypeOf() 方法来访问和设置对象的原型。这些方法提供了更安全且可靠的方式来操作对象的原型。例：
const person = {
  name: 'John',
  sayHello() {
    console.log('Hello, ' + this.name);
  }
};
const john = Object.create(person);
console.log(Object.getPrototypeOf(john) === person); // 输出 true
Object.setPrototypeOf(john, null);
console.log(Object.getPrototypeOf(john)); // 输出 null
// 上述代码中，我们使用 Object.create() 方法基于 person 对象创建了一个新对象 john。然后，我们使用 Object.getPrototypeOf() 方法来获取 john 对象的原型，并与 person 对象进行比较。

// 接下来，我们使用 Object.setPrototypeOf() 方法将 john 对象的原型设置为 null，并使用 Object.getPrototypeOf() 验证其原型是否为 null。