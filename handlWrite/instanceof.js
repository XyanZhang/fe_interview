function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left); // 获取对象的原型
  let prototype = right.prototype;
  while(true) {
    if(!proto) return false;
    if(proto === prototype) return true;

    // 查找原型的原型
    proto = Object.getPrototypeOf(proto);
  }
}