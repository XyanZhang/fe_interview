import 'reflect-metadata';


class Point {
    x!: number;

    y!: number;
}

class Line {
    private _p0!: Point;

    private _p1!: Point;

    @validate
    // 这句可以省略,因为design:type是预定义属性
    // @Reflect.metadata('design:type', Point)
    set p0(value: Point) {
        this._p0 = value;
    }

    get p0() {
        return this._p0;
    }

    @validate
    // @Reflect.metadata("design:type", Point)
    set p1(value: Point) {
        this._p1 = value;
    }

    get p1() {
        return this._p1;
    }
}

function validate<T>(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>,
) {
    const { set } = descriptor;
    descriptor.set = function (value: T) {
        const type = Reflect.getMetadata('design:type', target, propertyKey);
        if (!(value instanceof type)) {
            throw new TypeError('Invalid type.');
        }
        set!.apply(this, [value]); 
    };
    return descriptor;
}

export const exp910 = () => {
    console.log();
    console.log(
        '-----------------------示例9:基本元元素类型反射-----------------------',
    );
    console.log(
        '-----------------------为访问器的set方法添加类型验证-----------------------',
    );
    console.log();
    const line = new Line();
    const p0 = new Point();
    p0.x = 1;
    p0.y = 2;
    line.p1 = p0;
    console.log(line);
    console.log();
    console.log('-----------------------示例9:执行完毕-----------------------');
};


// 控制台输出: Line { _p1: Point { x: 1, y: 2 } }

class MyClass {
  @Reflect.metadata('key', 'value')
  myMethod() {}
}

const metadata = Reflect.getMetadata('key', MyClass.prototype, 'myMethod');
console.log(metadata); // 输出 'value'
// 上面的代码中，我们在 MyClass 类的 myMethod 方法上设置了一个元数据，然后使用 Reflect.getMetadata 方法获取了这个元数据并输出到控制台上。
