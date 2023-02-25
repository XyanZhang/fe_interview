// app.get(path,function(request, response));

// 第一个参数path为请求的路径
// 第二个参数为处理请求的回调函数，有两个参数分别是
// request 代表请求信息
// response 代表响应信息


// app.all()函数可以匹配所有的HTTP动词 路由中的星号能匹配所有的路径 语法\\\[''''''''']']']']']';]=]='[;'['[''''''''''''''''''''''';]]                     \\\\\\\\\\\\\\\\\
// app.all(path,function(request, response));

var express = require('express');
var app = express();
app.get('/',function(req,res){
    res.end('welcome to  首页');
});
app.get('/about',function(req,res){

  // req.host 返回请求头里取的主机名(不包含端口号)
  // req.path 返回请求的URL的路径名

 res.end('欢迎来到关于我们');
})

// 获得查询字符串
//http://localhost:3000/?a=1&b=2&c=3
app.get('/',function(req,res){
  res.send(req.query);
});


// params路径参数 #
// req.params可以用来获取请求URL中的参数值
app.get('/:id/:name',function(req,res){
   res.send(req.params.id+" "+req.params.name);
});

app.all("*",function(req,res){
  res.send("404");
 })
app.listen(3000);