// 当请求到来的时候执行app,这是会对数组里的配置项一次匹配，匹配上的执行，匹配不上执行
var app = function(req,res){
  var i=0;//定义一个变量每次执行next后加一
   //每执行一次next,会取出一个中间件函数执行，并且把next传进去
  function next(){
      var fn = app.routes[i++];
      if(fn)
       fn(req,res,next);
  }
   next();
}
//存放中间件函数的数组
app.routes = [];
//配置函数
app.use = function(fn){
   //往数组里添加函数
   app.routes.push(fn);
}
//------------------------
app.use(function(req,res,next){
   console.log(req.url);
   console.log(1);
   next();
});
app.use(function(req,res,next){
   console.log(2);
   res.end('ok');
   next();
});
//-------------------
var http = require('http');
var server = http.createServer(app);
server.listen(9090);