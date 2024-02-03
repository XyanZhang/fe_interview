Promise.race = function (args) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      // 第一个promise resolve之后 即成功
      args[i].then(resolve, reject)
    }
  })
}