// let const
// 尽可能使用const 如果这个值需要更改才用let

// var的问题
// 1.var 声明的变量 声明到全局 污染全局变量 （函数作用域 全局）
// 2.变量提升 可以在声明之前调用  function  var import
// 3.let const  可以 {} 方式来连用 块作用域
// 4.var 能重复声明 在同一个作用域下
// let a = 1; // es6 环境下会报错
// {
//     console.log(a); // 暂存死区
//     let a = 2;
// }
// console.log(a);

for(var i = 0 ; i< 10;i++){
  // 作用域链
  setTimeout(()=>{
      console.log(i);
  }); // 4ms mdn, 默认4ms
  // 输出 10次 10
}

// 闭包的新写法 #
// 以前(es6以前)
;(function () {

})();

// 现在(es6)
{
}