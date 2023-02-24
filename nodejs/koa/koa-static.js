// npm install --save koa-static

const static = require('koa-static')
const app = new Koa()
app.use(static(path.join( __dirname,  'public')))
app.use( async ( ctx ) => {
  ctx.body = 'Not Found'
})