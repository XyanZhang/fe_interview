// 继承法
function extendsWay() {

  return <T extends new (...args: any[]) => any>(target: T) => {
    return class extends target {
      getMyName() {
        return this._name;
      }
    };
  };

}

// 原型法
const ProfileDerorator = (profile: UserProfile) => {
  return (target: any) => {
    const original = target;
    function constructor(...args: any[]) {
      console.log('contruct has been changed');
      return new original(...args);
    }
    // 赋值原型链
    constructor.prototype = original.prototype;
    // 添加一个静态属性
    constructor.myinfo = `myinfo ${profile}`;
    return constructor as typeof original;
  };
};

// 赋值法
const loggerDecorator = () => {
  return function logMethod(
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const method = propertyDescriptor.value;
    // 重载方法
    propertyDescriptor.value = function async (...args: any[]) {
      // ...
    };
    return propertyDescriptor;
  };
};

// 展开法
const parseFunc = (
  target: Object,
  propertyName: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor => {
  return {
    ...descriptor,
    value(...args: any[]) {
      let parseConf: any[] = [
        // ...
      ];
      // 获取格式化后的参数列表
      const newArgs = parseConf.map((toParse, index) => toParse(args[index]));

      return descriptor.value.apply(this, newArgs);
    },
  };
};