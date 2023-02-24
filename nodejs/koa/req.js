// 获取请求体 #
const Koa = require('koa');
const querystring = require('querystring');
const app = new Koa();
app.use(async (ctx) => {
    if (ctx.method == 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf-8');
        ctx.body = (
            `
            <form method="POST">
               <input name="username" >
               <input type="submit">
            </form>
            `
        );
    } else if (ctx.method == 'POST') {
        ctx.set('Content-Type', 'application/json');
        ctx.body = await parseBody(ctx);
    } else {
        ctx.body = 'Not Allowed';
    }
});
function parseBody(ctx) {
    return new Promise(function (resolve, reject) {
        let buffers = [];
        ctx.req.on('data', function (data) {
            buffers.push(data);
        });
        ctx.req.on('end', function (data) {
            let body = buffers.toString();
            body = querystring.parse(body);
            resolve(body);
        });
        ctx.req.on('error', function (errdata) {
            reject(err);
        });
    });
}

app.listen(3000, () => {
    console.log('server is starting at port 3000');
});