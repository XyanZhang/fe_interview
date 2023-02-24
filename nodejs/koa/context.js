// 4. 上下文(Context) #
// Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法

// ctx.request; // 这是 koa Request
// ctx.response; // 这是 koa Response
// ctrx.req //原始的http请求对象
// ctx.res //原始的http响应对象
// ctx.app 应用程序实例引用
// ctx.request是Koa2中context经过封装的请求对象
// 绕过 Koa 的 response 处理是 不被支持的

// 获取请求参数 #
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
    console.log(ctx.method); //获取请求方法
    console.log(ctx.url);    //获取请求URL
    console.log(ctx.query);  //获取解析的查询字符串对象
    console.log(ctx.querystring); //根据 ? 获取原始查询字符串.
    console.log(ctx.headers);//获取请求头对象
    ctx.body = ctx.url;
});

app.listen(3000, () => {
    console.log('server is starting at port 3000');
});