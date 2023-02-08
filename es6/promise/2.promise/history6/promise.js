const RESOLVED = 'RESOLVED'; // 成功
const REJECTED = 'REJECTED'; // 失败
const PENDING = 'PENDING'; // 等待态
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.value = value;

        // 如果resolve在异步函数中，以下等待异步执行完毕再执行resolve，此时再执行then的回调
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 同上
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  // 1. promise 成功和失败的回调的返回值 可以传递到外层的下一个then
  // 2. 如果返回的是普通值的话 (传递到下一次的成功中,不是错误不是promise就是普通值) ，出错的情况(一定会走到下一次的失败),可能还要promise的情况(会采用promise的状态，决定走下一次的成功还是失败 )
  // 3.错误处理 如果离自己最近的then 没有错误处理(没有写错误函数) 会向下找
  // 4. 每次执行完promise.then方法后返回的都是一个“新的promise" (promisey一旦成功或者失败就不能修改状态)
  then(onFulfilled, onRejected) {
    // 处理非函数类型的回调函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise2 = new Promise((resolve, reject) => {
      // 为了实现链式调用, 需要新构建一个 promise

      // 针对不同状态的promise进行不同处理
      /* 
          比如 
          1. resolve调用，status为 RESOLVED
          let p = new Promise((resolve, reject) => {
              resolve(100);
          })
          2. reject调用，status为 REJECTED
          let p = new Promise((resolve, reject) => {
              reject(100);
          })
          3. 都不调用，status为 PENDING
          let p = new Promise((resolve, reject) => {
              reject(100);
          })
      */
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            // setTimeout 的作用，是为了能获取到 promise2 实例，与 onFulfilled 结果的值进行比对
            // 如果不使用异步，无法获取promise2 实例
            // 执行onFulfilled回调，并获取返回值，根据类型处理返回值
            let x = onFulfilled(this.value);
            // x可能是一个proimise，普通值
            // 此处 如果是同步执行，promise2 还并未初始化，获取不到值，需要异步包裹一下
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // 处理 REJECTED
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // setTimeout 的作用，是为了能获取到 promise2 实例，与 onFulfilled 结果的值进行比对
            // 如果不使用异步，无法获取promise2 实例
            // 执行onFulfilled回调，并获取返回值，根据类型处理返回值
            let x = onRejected(this.reason);
            // x可能是一个proimise，普通值
            // 此处 如果是同步执行，promise2 还并未初始化，获取不到值，需要异步包裹一下
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // 处理 PENDING
      if (this.status === PENDING) {
        // 由于异步执行，此时promise2还未初始化，无法获取到值，需要将回调函数存储起来
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    /* 
      let p2 = p1.then((data) => {
          console.log(data)
          return 1000
      })
      .then 返回值会对比 onFulfilled 返回值，放置在 resolvePromise进行对比
      */
    return promise2;
  }

  catch(errCallback) {
    // 返回reject的promise
    return this.then(null, errCallback);
  }
  static resolve(data){
    return new Promise((resolve,reject)=>{
        resolve(data);
    })
  }
  static reject(reason){
      return new Promise((resolve,reject)=>{
          reject(reason);
      })
  }
}

/**
 * @description:
 * @param {*} promise2 第二个promise
 * @param {*} x 上一个promise.then 回调的返回值
 * @param {*} resolve 外部promise resolve 函数
 * @param {*} reject 外部promise reject 函数
 * @return {*}
 */
// resolvePromise 所有的promise都要支持 bluebird q  es6-promise
function resolvePromise(promise2, x, resolve, reject) {
  // 1.循环引用 自己等待自己完成 错误的实现
  if (promise2 === x) {
    // 用一个类型错误 结束掉promise
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    );
  }

  let called;
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then; // 根据x的then方法，判断x是不是promise
      if (typeof then === 'function') {
        // 只能认为是一个promise了
        then.call(
          x,
          (r) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;

            // TODO: 不明白这里为什么要递归解析
            resolvePromise(promise2, y, resolve, reject); // 递归解析的过程
          },
          (e) => {
            if (called) return;
            called = true;
            reject(e); // 只要失败就失败
          }
        );
      } else {
        // { then:'100' }
        resolve(x);
      }
    } catch (e) {
      // 防止失败了再次进入成功
      if (called) return;
      called = true;
      reject(e); // 取值出错
    }
  } else {
    // x 不是promise，
    resolve(x);
  }
}

module.exports = Promise;
