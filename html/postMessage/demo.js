// 写一个postMessage的demo
// 1. 一个页面中有两个iframe
// 2. 两个iframe中都有一个按钮，点击按钮，向另一个iframe发送消息
// 3. 两个iframe中都有一个div，用来显示接收到的消息

// jsdemo 
// 参数说明
// 1. data: 要发送的数据
// 2. targetOrigin: 目标域名
// 3. transfer: 传输的数据

// 监听
window.addEventListener('message', function (e) {
  console.log(e);
  if (e.origin === 'http://localhost:8080') {
    console.log(e.data);
  }
}, false);

// 发送
document.getElementById('btn').addEventListener('click', function () {
  window.postMessage('hello', 'http://localhost:8080');
}, false);