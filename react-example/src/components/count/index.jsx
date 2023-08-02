import React, { useCallback, useState } from 'react';

export default function Counter(props) {
  const [count, setCount] = useState(0);

  // 每次点击都会重新渲染，每次都会重新创建handleCount
  const handleCount = () => {
    setCount(count + 1)
  }
  // 只有count变化时才会重新渲染，每次都会重新创建callbackCount
  const callbackCount = useCallback(() => {
    setCount(count - 1)
  }, [count]);
  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={handleCount}>+</button>
      <button onClick={callbackCount}>-</button>
    </div>
  )

}