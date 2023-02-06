// 展开操作符
// 可以替代apply
var m1 = Math.max.apply(null, [8, 9, 4, 1]);
var m2 = Math.max(...[8, 9, 4, 1]);

// 解构参数 #
let destruct = function({name,age}){
    console.log(name,age);
}
destruct({name:'zfpx',age:6});