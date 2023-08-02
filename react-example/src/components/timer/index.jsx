import React, { useCallback, useRef, useState } from 'react';
import RefComp from './RefComp';
export default function Timer(props) {
  const [time, setTime] = useState(0);

  const timer = useRef(null); // ref 值变化不会引起组件重新渲染
  const inputRef = useRef(); // 获取dom元素
  const forwardRef = useRef(); // 获取组件实例

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
  const handleFocus = useCallback(() => {
    inputRef.current.focus();
  }, []);

  const seeRef = useCallback(() => {
    console.log(forwardRef.current);
  }, []);

  return (
    <div>
      <h1>timer</h1>
      <p>time: { time / 10 } seconds</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <p>
        {/* ref: 获取对真实dom的引用，不能作用与components */}
        <input ref={inputRef} type="text" />
        <button onClick={handleFocus}>Focus</button>
      </p>
      <hr></hr>
      <RefComp ref={forwardRef}></RefComp>
      <p>
        通过 forwardRef 获取的ref值：{forwardRef.current && forwardRef.current.value}
        <button onClick={seeRef}>查看ref实例</button>
      </p>
      <hr></hr>
    </div>
  )
}