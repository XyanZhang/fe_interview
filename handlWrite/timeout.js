// fn在seconds秒内执行则成功
function myTimeout(fn, delay) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      reject()
    }, delay)

    fn().then(() => {
      // 如果fn返回了成功，则立即将当前的promise状态变为成功
      resolve()
    })
  })
} 

function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve()
    }, 1000);
  })
}

myTimeout(fn1, 2000).then(() => {
  console.log("成功")
}).catch(() => {
  console.log("失败")
})