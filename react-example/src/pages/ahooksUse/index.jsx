import { useRequest } from 'ahooks';
import React, { useEffect } from 'react';

let datas = [
  "小时",
  "小明",
  "大亮",
  "小红",
  "他红",
  "大黄",
]
function getUsername() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(datas[Math.floor(Math.random()*datas.length)]);
    }, 1000);
  });
}

export default () => {
  const { data, error, loading, run } = useRequest(getUsername);


  if (error) {
    return <div>failed to load</div>;
  }
  let content = '';
  if (loading) {
    content = <div>loading...</div>;
  }else {
    content = <div>
      Username: {data}
    </div>;
  }

  return (
    <>
      { content }
      <button onClick={run}>刷新</button>
    </>
  )
};