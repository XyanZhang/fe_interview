// 简单版本


// promise就是一个类 
// 1.promise 有三个状态： 成功态（resolve） 失败态（reject） 等待态（pending） (又不成功又不失败)
// 2.用户自己决定失败的原因和成功的原因  成功和失败也是用户定义的
// 3.promise 默认执行器时立即执行
// 4.promise的实例都拥有一个then方法 , 一个参数是成功的回调，另一个失败的回调
// 5.如果执行函数时发生了异常也会执行失败逻辑
// 6.如果promise一旦成功就不能失败 ， 反过来也是一样的 (只有等待态的时候才能去更改状态)
const RESOLVED = 'RESOLVED'; // 成功
const REJECTED = 'REJECTED'; // 失败
const PENDING = 'PENDING'; // 等待态
class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        let resolve = (value) => {
            if(this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
            }
        }
        let reject = (reason) => {
            if(this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)            
        }
    }
    then(onFulFilled, onRejected){
        if(this.status === RESOLVED) {
            onFulFilled(this.value)
        }
        if(this.status === REJECTED) {
            onRejected(this.reason)
        }
    }
}
module.exports = Promise
