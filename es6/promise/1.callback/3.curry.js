// 函数柯里化 函数反柯里化

// 判断变量的类型 
// 常用的判断类型的方法有四种：
// 1.typeof 不能判断对象类型 typeof []  typeof {}
// 2.constructor  可以找到这个变量是通过谁构造出来的
// 3.instanceof 判断谁是谁的实例 __proto__
// 4.Object.prototype.toString.call()  缺陷就是不能细分是谁谁的实例

function isType(type, value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
}
const currying = (fn, arr = []) => {
    let len = fn.length; // 这里获取的是函数的参数的个数
    return function(...args) { // 高阶函数
        let concatValue = [...arr, ...args];
        if (a.length < len) {
            return currying(fn, concatValue); // 递归不停的产生函数
        } else {
            return fn(...a);
        }
    }
}
let isArray = currying(isType)('Array') // bind
let isString = currying(isType)('String')
console.log(isArray([]));
console.log(isArray('string')); // 这里拼接了
console.log(isArray([])); 
// 第一次我们传入了一个数组

// function sum(a,b,c,d,e,f){
//     return a+b+c+d+e+f
// }
// let r = currying(sum)(1,2)(3,4)(5)(6)




// 能不能将方法进行细分  isType  =>  isString isArray
// console.log(isType([],'Arary'))

// function isType(type) {
//     return function(value) {
//         return Object.prototype.toString.call(value) === `[object ${type}]`;
//     }
// }
// 通过一个柯里化函数 实现通用的柯里化方法
// let isArray = isType('Array');
// console.log(isArray('hello'))