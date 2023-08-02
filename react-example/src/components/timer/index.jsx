import React, { useCallback, useRef, useState } from 'react';

export default function Timer(props) {
  const [time, setTime] = useState(0);

  const timer = useRef(null); // ref 值变化不会引起组件重新渲染

  // 开启计时器
  const handleStart = useCallback(() => {
    if(timer.current) return;
    timer.current = window.setInterval(() => {
      setTime(time => time + 1);
    }, 100);
  }, []);
  // 暂停计时器
  const handlePause = useCallback(() => {
    window.clearInterval(timer.current);
    timer.current = null;
  }, []);

  return (
    <div>
      <h1>timer</h1>
      <p>time: { time / 10 } seconds</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  )
}