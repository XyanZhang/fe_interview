let fs = require('fs');
let path = require('path')

function read(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, filename), 'utf8', (err, data) => {
            if (err)  reject(err);
            resolve(data);
        })
    })
}

read('./name.txt').then((data) => {
   return read(data);
}).then((data)=>{
    console.log('-----success-----',data);
},err=>{
    console.log('-----error-----',err+'错误');
})



// error first 错误第一 异步方法无法通过try、catch捕获异常
// fs.readFile('./name.txt','utf8',(err,data)=>{
//     fs.readFile(data,'utf8',(err,data)=>{
//         console.log(data);
//     })
// });