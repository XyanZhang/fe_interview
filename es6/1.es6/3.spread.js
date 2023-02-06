// 数组省略第一项
let [, age] = ['zf', 18];
console.log(age);

// 将类数组转化成数组 Array.from [...{}] 是通过迭代器来实现
function ajax() {
  //console.log(arguments)
  // generator
  // for of
  console.log([
    ...{
      0: 1,
      1: 2,
      length: 2,
      [Symbol.iterator]: function* () {
        // yiled 值
        let i = 0;
        while (this.length !== i) {
          yield this[i++]; // {value:0,done:false}
        }
      },
    },
  ]); // {0:'url',1:'get'}

  // 生成器 迭代器
}
ajax('url', 'get'); // [ 1, 2 ]

// Array.from [...{}]区别  Symbol.iterator

// {...obj1,...obj2} 覆盖的作用域