process.argv.forEach(function(item){
  console.log(item);
});

// 程序退出
process.on('exit',function(){
  console.log('clear');
});

process.on('uncaughtException',function(err){
  console.log('错误捕获:', err);
})

console.log(process.memoryUsage());
console.log(process.cwd());
console.log(__dirname);
process.chdir('..'); // 切换到上一级目录
console.log(process.cwd());
console.log(__dirname);

function err(){
 throw new Error('报错了');
}
err();