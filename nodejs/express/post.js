// post方法 根据请求路径来处理客户端发出的Post请求 语法
// app.post(path,function(req, res));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.post('/login',function(req,res){
        console.log(req.body.username);
});