# useMemo

```jsx

import React, { useMemo } from 'react';

const ParentComponent = ({ list }) => {

  // 使用 useMemo 缓存子组件的渲染结果
  const memoizedChildComponents = useMemo(() => {
    return list.map(item => <ChildComponent key={item.id} item={item} />);
  }, [list]);

  return (
    <div>
      {memoizedChildComponents}
    </div>
  );
};

const ChildComponent = ({ item }) => {
  // 子组件的渲染逻辑
  return (
    <div>{item.name}</div>
  );
};

```
