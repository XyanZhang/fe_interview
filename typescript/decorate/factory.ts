const SetNameDecorator = (firstname: string, lastname: string) => {
  const name = `${firstname}.${lastname}`;
  return <T extends new (...args: any[]) => any>(target: T) => {
      return class extends target {
          _name: string = name;

          getMyName() {
              return this._name;
          }
      };
  };
};

@SetNameDecorator('jesse', 'pincman')
class UserService {
  c() {}
}

// 可能 TypeScript 编译器没有识别出 @SetNameDecorator 装饰器添加的 getMyName 方法。
// 可以尝试显式地将 getMyName 方法添加到 UserService 类型中
interface UserService {
  getMyName(): string;
}

const exp3 = () => {
  console.log();
  console.log(
      '-----------------------示例3:装饰器工厂-----------------------',
  );
  console.log(
      '-----------------------通过继承方式 重载getName方法-----------------------',
  );
  console.log();
  const user = new UserService();
  console.log(user.getMyName());
  console.log();
  console.log('-----------------------示例3:执行完毕-----------------------');
};

// 控制台打印 jesse.pincman
exp3()