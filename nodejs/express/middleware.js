var express = require('express');
var app = express();
var path = require('path');

app.use(function(req,res,next){
 res.setHeader('Content-Type','text/plain;charset=utf-8');
 next();
});

app.get('/',function(req,res){
 res.end('首页');
});
app.get('/about',function(req,res){
 res.end('关于我们');
});

app.listen(3000);