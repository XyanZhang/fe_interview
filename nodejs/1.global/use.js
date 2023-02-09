// console.log(Object.keys(process), '进程对象');
// platform: window win32  mac

console.log(process.argv); // 前两个是node的路径和当前文件的路径
console.log(process.argv.slice(2)); // 从第二个开始是我们需要用到的用户传递的参数

let program = require('commander');
// 1.追加参数信息 2.解析参数 
program.on('--help', function () {
    console.log('node xxx');
});
program.command('create').action(function () {
    console.log('vue create project')
})
