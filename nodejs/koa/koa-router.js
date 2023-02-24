// npm install --save koa-router
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

let user = new Router();
user.get('/user', function (ctx) {
    ctx.body = 'get user ';
}).get('/query/:id', function (ctx) {
    ctx.body = ctx.params;
}).post('/user', function (ctx) {
    ctx.body = 'post user ';
}).get('/home', function (ctx) {
    ctx.body = 'get home ';
});
app.use(user.routes());

app.listen(3000, () => {
    console.log('server is starting at port 3000');
});

{
  // 多级路由
  let user = new Router();
  user.get('/add', function (ctx) {
      ctx.body = 'get user add ';
  });

  let article = new Router();
  article.get('/add', function (ctx) {
      ctx.body = 'get article add ';
  });

  let router = new Router();
  router.use('/user', user.routes());
  router.use('/article', article.routes());
  app.use(router.routes());
}