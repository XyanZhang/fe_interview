// npm i koa-bodyparser -S
const Koa = require('koa');
const querystring = require('querystring');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());
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
        ctx.body = ctx.request.body;
    } else {
        ctx.body = 'Not Allowed';
    }
});

app.listen(3000, () => {
    console.log('server is starting at port 3000');
});