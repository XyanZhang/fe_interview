import React, { useCallback, useMemo, useState } from 'react';

export default function Counter(props) {
  const [count, setCount] = useState(0);

  // 每次count变化都会重新渲染，每次都会重新创建memoCount
  const memoCount = useMemo(() => {
    return count * 2
  }, [count]);

  // 每次点击都会重新渲染，每次都会重新创建handleCount
  const handleCount = () => {
    setCount(count + 1)
  }
  // 只有count变化时才会重新渲染，每次都会重新创建callbackCount
  const callbackCount = useCallback(() => {
    setCount(count - 1)
  }, [count]);

  // 使用useMemo 模拟 useCallback
  const memoCallbackCount = useMemo(() => {
    return () => {
      setCount(count - 1)
    }
  }, [count]);

  return (
    <div>
      <h1>{props.title || "Counter"}</h1>
      <p>state: {count}</p>
      <p>memo: {memoCount}</p>
      <button onClick={handleCount}>+</button>
      <button onClick={callbackCount}>-</button>
      <button onClick={memoCallbackCount}>-</button>
    </div>
  )

}