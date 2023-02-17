
/* 
REPL操作
  变量的操作,声明普通变量和对象
  eval
  函数的书写
  下划线访问最近使用的表达式
  多行书写

*/
let repl = require('repl');
let con = repl.start().context;
con.msg = 'hello';
con.hello = function () {
  console.log(con.msg);
};

/* 
REPL运行环境的基础命令
  .break 退出当前命令
  .clear 清除REPL运行环境上下文对象中保存的所有变量与函数
  .editor   Enter editor mode
  .exit 退出REPL运行环境
  .save 把输入的所有表达式保存到一个文件中
  .load 把所有的表达式加载到REPL运行环境中
  .help 查看帮助命令
*/