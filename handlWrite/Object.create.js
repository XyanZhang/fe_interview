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
