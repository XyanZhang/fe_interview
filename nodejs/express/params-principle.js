//是路由里的路径
var path = '/users/:name/:age';
//真实请求的URL
var url = '/users/zfpx/8';
//存放所有的参数名
var paramNames = [];
var regStr = path.replace(/:(\w+)/g,function(matchedStr,group1){
    paramNames.push(group1);// name age 添加进来的
    return '(\\w+)';
});
console.log(regStr);//   \/users\/(\w+)\/(\w+)
var reg = new RegExp(regStr);
var result = url.match(reg);
//[ '/users/zfpx/8', 'zfpx', '8', index: 0, input: '/users/zfpx/8' ]
console.log(result);
var params = {};
//循环数组名 值就是 result中的分组
for(var i=0;i<paramNames.length;i++){
    params[paramNames[i]] = result[i+1];
}
console.log(params);