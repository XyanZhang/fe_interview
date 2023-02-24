// ctx.cookies.get(name,[optins]):读取上下文请求中的cookie。
// ctx.cookies.set(name,value,[options])：在上下文中写入cookie。
// domain：写入cookie所在的域名
// path：写入cookie所在的路径
// maxAge：Cookie最大有效时长
// expires：cookie失效时间
// httpOnly:是否只用http请求中获得
// overwirte：是否允许重写
app.use(async (ctx, next) => {
    console.log(ctx.url);

    if (ctx.url == '/write') {
        ctx.cookies.set('name', 'zfpx');
        ctx.body = 'write';
    } else {
        next();
    }
});
app.use(async (ctx) => {
    if (ctx.url == '/read') {
        ctx.body = ctx.cookies.get('name');
    }
});