console.log(1);

setTimeout(() =>{
    console.log(5)
}, 0)
new Promise((resolve, reject) => {
    console.log(2)
    for (let i = 0; i < 9999; i++) {
        i===9998 && console.log(3)
    }
    resolve()
    console.log(4)
})
console.log(6)

// 输出 123465

// 解释以上输出原因
// 1. 首先执行同步代码，输出 1
// 2. 执行 setTimeout，将回调函数放入宏任务队列中，等待执行
// 3. 执行 Promise，将 then 放入微任务队列中，等待执行
// 4. 执行同步代码，输出 6
// 5. 执行微任务队列中的 then，输出 2 3 4
// 6. 执行宏任务队列中的 setTimeout，输出 5
