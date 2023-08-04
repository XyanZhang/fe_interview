import React, { useCallback, useState } from "react";

function CounterRenderProps({children}) {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount(count + 1)
  }, [count])
  const decrement = useCallback(() => {
    setCount(count - 1)
  }, [count])
  return children(count, increment, decrement)
}

// UI 和 逻辑分离
function CounterRenderPropsExample() {
  return (
    <CounterRenderProps>
      {(count, increment, decrement) => (
        <div>
          <p>count: {count}</p>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
        </div>
      )}
    </CounterRenderProps>
  )
}

export default CounterRenderPropsExample;