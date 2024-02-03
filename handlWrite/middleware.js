let middleware = [];// 储存中间件函数

// use函数，数组里面存函数：使用middleware来存储中间函数
function use (fn) {
  if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
  // debug('use %s', fn._name || fn.name || '-')
  middleware.push(fn)
  return this
}

// compose函数： 将一组中间件函数组合成一个大的异步函数
// 这个大的异步函数会依次执行每个中间件函数，并将每个中间件函数的执行结果传递给下一个中间件函数
function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context, next) {
    let index = -1
    return dispatch(0)

    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


// 示例中间件函数
async function middleware1(ctx, next) {
  console.log('Middleware 1')
  await next()
  console.log('Middleware 1 response')
}

async function middleware2(ctx, next) {
  console.log('Middleware 2')
  await next()
  console.log('Middleware 2 response')
}

async function middleware3(ctx, next) {
  console.log('Middleware 3')
  await next()
  console.log('Middleware 3 response')
}

use(middleware1);
use(middleware2);
use(middleware3);
// 使用示例
const composedMiddleware = compose(middleware);

composedMiddleware({}, () => {
  console.log('Final Handler');
});