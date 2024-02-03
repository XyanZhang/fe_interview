async function asyncPool(poolLimit, array) {
  const ret = [];
  const excuting = [];
  for(const item of array) {
    const p = Promise.resolve(item);
    ret.push(p);
    if(poolLimit < array.length) {
      // then回调中，当这个promise状态变为fulfilled后，将其从正在执行的promise列表executing中删除
      const e = p.then(() => executing.splice(executing.indexOf(e), 1)); // 微任务队列
      executing.push(e);
      if(excuting.length >= poolLimit) {
        // 一旦正在执行的promise列表数量等于限制数，就使用Promise.race等待某一个promise状态发生变更，
        // 状态变更后，就会执行上面then的回调，将该promise从executing中删除，
        // 然后再进入到下一次for循环，生成新的promise进行补充
        await Promise.race(excuting)
      }
    }
  }
  return Promise.all(ret)
}
